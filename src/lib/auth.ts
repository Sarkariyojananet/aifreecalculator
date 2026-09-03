/**
 * Admin Authentication & Session Management Utility
 * Built with standard Web Crypto API for zero-dependency Cloudflare Workers & Node.js compatibility.
 */

const SECRET_KEY = import.meta.env.ADMIN_JWT_SECRET || 'aifreecalculator-super-secret-jwt-key-2026';
const ADMIN_USER = import.meta.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = import.meta.env.ADMIN_PASSWORD_HASH || 'admin123';

export interface AdminUser {
  username: string;
  role: string;
  exp: number;
}

// Convert string to Uint8Array
function strToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Base64Url encoding/decoding helpers
function base64UrlEncode(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

async function getCryptoKey(): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    'raw',
    strToUint8Array(SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Creates a signed JWT token for the admin session
 */
export async function createAdminToken(username: string, expiresInHours = 24): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: AdminUser = {
    username,
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + expiresInHours * 3600,
  };

  const encodedHeader = base64UrlEncode(strToUint8Array(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(strToUint8Array(JSON.stringify(payload)));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign('HMAC', key, strToUint8Array(dataToSign));
  const encodedSignature = base64UrlEncode(signature);

  return `${dataToSign}.${encodedSignature}`;
}

/**
 * Verifies a JWT token and returns payload if valid
 */
export async function verifyAdminToken(token: string | null | undefined): Promise<AdminUser | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  try {
    const key = await getCryptoKey();
    const signatureBytes = Uint8Array.from(base64UrlDecode(encodedSignature), (c) => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, strToUint8Array(dataToSign));

    if (!isValid) return null;

    const payload: AdminUser = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Validate admin credentials
 */
export function validateCredentials(user: string, pass: string): boolean {
  return user.trim() === ADMIN_USER && pass === ADMIN_PASS;
}
