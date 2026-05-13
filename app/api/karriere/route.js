import { NextResponse } from 'next/server';
import { sendMail, escapeHtml } from '@/lib/mailer';
import { karriereLimiter, clientIp } from '@/lib/ratelimit';

export const runtime = 'nodejs';

const LIMITS = {
  name: 200,
  email: 320,
  role: 200,
  portfolio: 500,
  message: 5000,
};

const REQUIRED = ['name', 'email', 'role', 'message'];

const MAX_CV_BYTES = 8 * 1024 * 1024;
const ALLOWED_CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function validate(fields) {
  const errors = [];
  for (const f of REQUIRED) {
    if (!fields[f] || fields[f].trim() === '') {
      errors.push({ field: f, reason: 'required' });
    }
  }
  for (const [f, max] of Object.entries(LIMITS)) {
    if (fields[f] && fields[f].length > max) {
      errors.push({ field: f, reason: 'too_long' });
    }
  }
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.push({ field: 'email', reason: 'invalid' });
  }
  if (fields.portfolio && !/^https?:\/\//.test(fields.portfolio)) {
    errors.push({ field: 'portfolio', reason: 'invalid' });
  }
  return errors;
}

function formatText(f, hasAttachment) {
  return [
    `Name:      ${f.name}`,
    `E-Mail:    ${f.email}`,
    `Rolle:     ${f.role}`,
    `Portfolio: ${f.portfolio || '-'}`,
    `Lebenslauf: ${hasAttachment ? 'als Anhang' : '-'}`,
    '',
    'Nachricht:',
    f.message,
  ].join('\n');
}

function formatHtml(f, hasAttachment) {
  const esc = escapeHtml;
  return `
    <div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.55;color:#111">
      <h2 style="margin:0 0 16px">Neue Bewerbung</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0"><b>Name:</b></td><td>${esc(f.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0"><b>E-Mail:</b></td><td><a href="mailto:${esc(f.email)}">${esc(f.email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0"><b>Rolle:</b></td><td>${esc(f.role)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0"><b>Portfolio:</b></td><td>${f.portfolio ? `<a href="${esc(f.portfolio)}">${esc(f.portfolio)}</a>` : '-'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0"><b>Lebenslauf:</b></td><td>${hasAttachment ? 'als Anhang' : '-'}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px">Nachricht</h3>
      <p style="white-space:pre-wrap;margin:0">${esc(f.message)}</p>
    </div>
  `.trim();
}

export async function POST(request) {
  const ip = clientIp(request);
  const rl = karriereLimiter(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'rate_limit' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } },
    );
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_form' }, { status: 400 });
  }

  if (typeof form.get('_hp') === 'string' && String(form.get('_hp')).trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const fields = {
    name: String(form.get('name') || '').trim(),
    email: String(form.get('email') || '').trim(),
    role: String(form.get('role') || '').trim(),
    portfolio: String(form.get('portfolio') || '').trim(),
    message: String(form.get('message') || '').trim(),
  };

  const errors = validate(fields);

  let attachment = null;
  const cv = form.get('cv');
  if (cv && typeof cv === 'object' && 'size' in cv && cv.size > 0) {
    if (cv.size > MAX_CV_BYTES) {
      errors.push({ field: 'cv', reason: 'too_large' });
    } else if (!ALLOWED_CV_TYPES.has(cv.type)) {
      errors.push({ field: 'cv', reason: 'invalid_type' });
    } else {
      const buffer = Buffer.from(await cv.arrayBuffer());
      attachment = { filename: cv.name || 'cv', content: buffer, contentType: cv.type };
    }
  }

  if (errors.length) {
    return NextResponse.json({ ok: false, error: 'validation', fields: errors }, { status: 400 });
  }

  const to = process.env.MAIL_TO_KARRIERE;
  if (!to) {
    console.error('[karriere] MAIL_TO_KARRIERE is not configured');
    return NextResponse.json({ ok: false, error: 'server_misconfigured' }, { status: 500 });
  }

  try {
    await sendMail({
      to,
      replyTo: `${fields.name} <${fields.email}>`,
      subject: `[Datenflow] Bewerbung: ${fields.role}`,
      text: formatText(fields, !!attachment),
      html: formatHtml(fields, !!attachment),
      attachments: attachment ? [attachment] : undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[karriere] mail send failed', err);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 });
  }
}
