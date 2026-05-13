import nodemailer from 'nodemailer';

let transporter = null;

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  if (!host) throw new Error('SMTP_HOST is not configured');

  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
}

function getTransporter() {
  if (!transporter) transporter = buildTransporter();
  return transporter;
}

export async function sendMail({ to, subject, text, html, attachments, replyTo }) {
  const from = process.env.MAIL_FROM;
  if (!from) throw new Error('MAIL_FROM is not configured');
  if (!to) throw new Error('mail "to" not provided');

  return getTransporter().sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments,
    replyTo,
  });
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}
