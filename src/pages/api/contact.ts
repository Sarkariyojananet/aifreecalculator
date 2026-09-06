import type { APIRoute } from 'astro';
import { getDb, saveContactMessage, type ContactMessage } from '../../lib/db';
import { getRuntimeEnv } from '../../lib/cloudflare-env';

export const prerender = false;

// Fixed verified destination address for contact form notifications
const FIXED_DESTINATION_EMAIL = 'indiarojgaarcom@gmail.com';
const SENDER_EMAIL = 'support@aifreecalculator.com';
const SENDER_NAME = 'AI Free Calculator Contact';

// HTML Entity escaper for safe rendering in email templates
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// RFC 5322 compliant email validator
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ error: 'Method Not Allowed. This endpoint accepts POST requests only.' }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST',
      },
    }
  );
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    let body: any = {};
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await request.json().catch(() => ({}));
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData().catch(() => new FormData());
      body = Object.fromEntries(formData.entries());
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const category = String(body.category || 'General Inquiry').trim();
    const subject = String(body.subject || '').trim();
    const message = String(body.message || '').trim();
    const honeypot = String(body.website_url_check || '').trim();
    const calculatorSlug = String(body.calculatorSlug || body.calculator_slug || '').trim();
    const calculatorName = String(body.calculatorName || body.calculator_name || '').trim();

    // 1. Anti-spam honeypot detection: silently drop bot submissions
    if (honeypot) {
      return new Response(
        JSON.stringify({ success: true, message: 'Your message was sent successfully.' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 2. Strict Input & Length Validation
    if (!name || name.length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Name is required and must be between 2 and 100 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address (up to 254 characters).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!subject || subject.length < 3 || subject.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Subject is required and must be between 3 and 200 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message || message.length < 10 || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be between 10 and 5000 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const safeCategory = category.slice(0, 50);
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const createdAt = new Date().toISOString();

    const contactMsg: ContactMessage = {
      id: messageId,
      name,
      email,
      category: safeCategory,
      subject,
      message,
      status: 'new',
      created_at: createdAt,
      calculator_slug: calculatorSlug || undefined,
      calculator_name: calculatorName || undefined,
    };

    // 3. Save message to D1 Database for persistent audit trail & admin review
    const db = getDb(locals);
    try {
      await saveContactMessage(db, contactMsg);
    } catch (dbErr) {
      console.error('[Contact DB Error]:', dbErr);
    }

    // 4. Sanitize and escape user content for HTML email
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCategoryHtml = escapeHtml(safeCategory);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const emailSubject = `[Contact Inquiry] ${subject} - from ${name}`;
    const textBody = [
      `New Contact Form Message - AI Free Calculator`,
      `==============================================`,
      `From: ${name} <${email}>`,
      `Category: ${safeCategory}`,
      `Subject: ${subject}`,
      `Date: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`,
      `Message ID: ${messageId}`,
      ``,
      `Message:`,
      `----------------------------------------------`,
      message,
      `----------------------------------------------`,
      `Reply directly to this email to respond to ${name} at ${email}.`,
    ].join('\n');

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff; color: #0f172a;">
        <div style="background: #2563eb; padding: 24px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 800;">New Contact Form Message</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">AI Free Calculator Engineering & Support Desk</p>
        </div>
        <div style="padding: 24px; font-size: 14px; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 700; width: 100px; color: #64748b; font-size: 12px; text-transform: uppercase;">From:</td>
              <td style="padding: 8px 0;"><strong>${safeName}</strong> &lt;<a href="mailto:${safeEmail}" style="color: #2563eb;">${safeEmail}</a>&gt;</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700; color: #64748b; font-size: 12px; text-transform: uppercase;">Category:</td>
              <td style="padding: 8px 0;"><span style="display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 2px 10px; border-radius: 9999px; font-weight: 600; font-size: 12px;">${safeCategoryHtml}</span></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700; color: #64748b; font-size: 12px; text-transform: uppercase;">Subject:</td>
              <td style="padding: 8px 0; font-weight: 600;">${safeSubject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700; color: #64748b; font-size: 12px; text-transform: uppercase;">Ref ID:</td>
              <td style="padding: 8px 0; font-family: monospace; font-size: 12px; color: #64748b;">${messageId}</td>
            </tr>
          </table>

          <div style="font-weight: 700; color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Message:</div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-size: 13px; line-height: 1.7; color: #1e293b;">
            ${safeMessage}
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            💡 <em>You can reply directly to this email to respond to <strong>${safeName}</strong> (${safeEmail}).</em>
          </div>
        </div>
      </div>
    `;

    // 5. Safely resolve Cloudflare Workers runtime environment and bindings
    const env = await getRuntimeEnv(locals);
    const destinationEmail = String(env.CONTACT_NOTIFICATION_EMAIL || FIXED_DESTINATION_EMAIL || 'indiarojgaarcom@gmail.com').trim();
    const siteName = String(env.PUBLIC_SITE_NAME || 'AI Free Calculator').trim();
    const senderEmail = String(env.CONTACT_SENDER_EMAIL || SENDER_EMAIL).trim();
    const senderName = `${siteName} Contact`;

    const emailBinding = env.CONTACT_EMAIL || env.EMAIL;

    let emailDelivered = false;
    let deliveryError: string | null = null;

    if (emailBinding && typeof emailBinding.send === 'function') {
      try {
        // Attempt 1: Standard structured send() API
        await emailBinding.send({
          to: destinationEmail,
          from: { email: senderEmail, name: senderName },
          replyTo: { email, name },
          subject: emailSubject,
          text: textBody,
          html: htmlBody,
        });
        emailDelivered = true;
      } catch (structuredErr: any) {
        console.warn('[Cloudflare send_email structured failed, trying fallback]:', structuredErr);
        // Attempt 2: MIME fallback via Cloudflare EmailMessage
        try {
          const boundary = '----=_Part_' + Date.now() + '_' + Math.random().toString(36).substring(2);
          const rawMime = [
            `From: "${senderName}" <${senderEmail}>`,
            `To: <${destinationEmail}>`,
            `Reply-To: "${name.replace(/["\r\n]/g, '')}" <${email}>`,
            `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(emailSubject)))}?=`,
            `MIME-Version: 1.0`,
            `Content-Type: multipart/alternative; boundary="${boundary}"`,
            ``,
            `--${boundary}`,
            `Content-Type: text/plain; charset=UTF-8`,
            `Content-Transfer-Encoding: 8bit`,
            ``,
            textBody,
            ``,
            `--${boundary}`,
            `Content-Type: text/html; charset=UTF-8`,
            `Content-Transfer-Encoding: 8bit`,
            ``,
            htmlBody,
            ``,
            `--${boundary}--`,
          ].join('\r\n');

          // @ts-ignore - cloudflare:email is provided by Cloudflare Workers runtime
          const { EmailMessage } = await (import('cloudflare:email' as string) as Promise<any>).catch(() => ({ EmailMessage: null as any }));
          if (EmailMessage) {
            const msg = new EmailMessage(senderEmail, destinationEmail, rawMime);
            await emailBinding.send(msg);
            emailDelivered = true;
          } else {
            throw structuredErr;
          }
        } catch (mimeErr: any) {
          deliveryError = mimeErr.message || String(mimeErr);
          console.error('[Cloudflare send_email MIME failed]:', mimeErr);
        }
      }
    } else {
      // Check for Resend API Key if configured in environment
      const resendApiKey = env.RESEND_API_KEY || (globalThis as any)?.process?.env?.RESEND_API_KEY;
      if (resendApiKey) {
        try {
          const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: `${senderName} <${senderEmail}>`,
              to: [destinationEmail],
              reply_to: email,
              subject: emailSubject,
              text: textBody,
              html: htmlBody,
            }),
          });
          if (resendRes.ok) {
            emailDelivered = true;
          } else {
            deliveryError = `Resend API returned ${resendRes.status}`;
            console.error('[Contact Resend API Error]:', deliveryError);
          }
        } catch (resendErr: any) {
          deliveryError = resendErr.message || String(resendErr);
          console.error('[Contact Resend Network Error]:', resendErr);
        }
      } else {
        deliveryError = 'Neither Cloudflare "CONTACT_EMAIL" binding nor "RESEND_API_KEY" secret is active/configured.';
        console.warn(`[Contact API Configuration]: ${deliveryError}`);
      }
    }

    // 6. Return response based on delivery and persistence state
    if (emailDelivered) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Your message was sent successfully.',
          messageId,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Message has already been saved to D1 database and site_settings audit trail!
      // Return safe, informative response without exposing internal secrets or crashing with 500
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email delivery service is currently unavailable. Your inquiry has been safely saved in our system. You can also email support@aifreecalculator.com directly.',
          messageId,
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (err: any) {
    console.error('[Contact Form Error]:', err?.stack || err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Server error processing your message. Please email support@aifreecalculator.com directly.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
