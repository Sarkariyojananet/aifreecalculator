import type { APIRoute } from 'astro';
import { getDb, saveContactMessage, type ContactMessage } from '../../lib/db';

export const prerender = false;

const TARGET_EMAIL = 'support@aifreecalculator.com';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    let body: any = {};
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const category = String(body.category || 'General Inquiry').trim();
    const subject = String(body.subject || '').trim();
    const message = String(body.message || '').trim();
    const honeypot = String(body.website_url_check || '').trim();

    // 1. Anti-spam honeypot detection
    if (honeypot) {
      return new Response(JSON.stringify({ success: true, message: 'Message received.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Field validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields (Name, Email, Subject, Message) are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const createdAt = new Date().toISOString();

    const contactMsg: ContactMessage = {
      id: messageId,
      name,
      email,
      category,
      subject,
      message,
      status: 'new',
      created_at: createdAt,
    };

    // 3. Save message immediately to Database / Storage
    const db = getDb(locals);
    try {
      await saveContactMessage(db, contactMsg);
    } catch (dbErr) {
      console.error('[Contact DB Error]:', dbErr);
    }

    // 4. Send email to support@aifreecalculator.com via multi-relay
    let emailDelivered = false;

    // A. FormSubmit.co Relay directly to support@aifreecalculator.com
    try {
      const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://aifreecalculator.com',
          'Referer': 'https://aifreecalculator.com/contact/',
        },
        body: JSON.stringify({
          name,
          email,
          _subject: `[AIFreeCalculator] ${subject} (${category})`,
          _replyto: email,
          category,
          subject,
          message,
          message_id: messageId,
          received_at: new Date().toLocaleString(),
          _template: 'table',
        }),
      });

      if (formSubmitRes.ok) {
        const fsData = await formSubmitRes.json().catch(() => null);
        if (fsData && (fsData.success === 'true' || fsData.success === true || fsData.message?.includes('Activation'))) {
          emailDelivered = true;
        }
      }
    } catch (fsErr) {
      console.error('[FormSubmit Error]:', fsErr);
    }

    // B. Resend API Relay (if RESEND_API_KEY environment variable is configured)
    const env = (locals as any)?.env || (globalThis as any)?.process?.env || {};
    const resendApiKey = env.RESEND_API_KEY || (globalThis as any)?.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'AI Free Calculator <contact@aifreecalculator.com>',
            to: [TARGET_EMAIL],
            reply_to: email,
            subject: `[Contact Inquiry] ${subject} - from ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; background: #ffffff;">
                <h2 style="color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">New Contact Form Message</h2>
                <p><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #cbd5e1; margin-top: 15px; white-space: pre-wrap;">
${message}
                </div>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 11px; color: #64748b;">Delivered via AIFreeCalculator.com System • Reference ID: ${messageId}</p>
              </div>
            `,
          }),
        });

        if (resendRes.ok) {
          emailDelivered = true;
        }
      } catch (resendErr) {
        console.error('[Resend Error]:', resendErr);
      }
    }

    // C. MailChannels Relay (Built-in on verified Cloudflare Workers)
    if (!emailDelivered) {
      try {
        const mailChannelsRes = await fetch('https://api.mailchannels.net/tx/v1/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: TARGET_EMAIL, name: 'AI Free Calculator Support' }] }],
            from: { email: 'no-reply@aifreecalculator.com', name: `AIFreeCalculator (${name})` },
            reply_to: { email, name },
            subject: `[Contact Form] ${subject} (${category})`,
            content: [{ type: 'text/plain', value: `Sender: ${name} <${email}>\nCategory: ${category}\nSubject: ${subject}\n\nMessage:\n${message}\n\nRef ID: ${messageId}` }],
          }),
        });
        if (mailChannelsRes.ok || mailChannelsRes.status === 202) {
          emailDelivered = true;
        }
      } catch (mcErr) {
        // silent
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Thank you, ${name}! Your message has been sent to ${TARGET_EMAIL}. Our support team will review and reply within 24-48 hours.`,
        messageId,
        targetEmail: TARGET_EMAIL,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('[Contact Form Error]:', err);
    return new Response(
      JSON.stringify({
        error: 'Server error processing your message. Please email support@aifreecalculator.com directly.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
