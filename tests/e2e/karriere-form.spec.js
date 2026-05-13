import { test, expect } from '@playwright/test';
import { clearMailpit, waitForMessage } from './mailpit';
import { uniqueIp } from './utils';

const MINIMAL_PDF = Buffer.from(
  '%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF',
  'latin1',
);

test.beforeEach(async ({ page }) => {
  await clearMailpit();
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': uniqueIp() });
});

test('karriere form submits without CV and arrives at jobs inbox', async ({ page }) => {
  await page.goto('/karriere');

  await page.getByLabel('Name', { exact: true }).fill('Max Mustermann');
  await page.getByLabel('E‑Mail').fill('max@example.com');
  await page.getByLabel('Worum geht es?').fill('Drei Jahre Backend-Erfahrung in Symfony und Postgres.');

  await page.getByRole('button', { name: /Bewerbung senden|Sending/ }).click();

  await expect(page.getByRole('status')).toContainText('Danke', { timeout: 5000 });

  const message = await waitForMessage({ to: 'jobs@datenflow.local' });
  expect(message.Subject).toContain('Bewerbung');
  expect(message.Text).toContain('Max Mustermann');
  expect(message.Attachments || []).toHaveLength(0);
});

test('karriere form sends CV as attachment', async ({ page }) => {
  await page.goto('/karriere');

  await page.getByLabel('Name', { exact: true }).fill('Lina Test');
  await page.getByLabel('E‑Mail').fill('lina@example.com');
  await page.getByLabel('Worum geht es?').fill('Senior FE engineer, looking for remote.');

  await page.locator('input[type="file"]').setInputFiles({
    name: 'lina-cv.pdf',
    mimeType: 'application/pdf',
    buffer: MINIMAL_PDF,
  });

  await page.getByRole('button', { name: /Bewerbung senden|Sending/ }).click();

  await expect(page.getByRole('status')).toContainText('Danke', { timeout: 10_000 });

  const message = await waitForMessage({ to: 'jobs@datenflow.local' });
  expect(message.Attachments).toBeTruthy();
  expect(message.Attachments).toHaveLength(1);
  expect(message.Attachments[0].FileName).toBe('lina-cv.pdf');
  expect(message.Attachments[0].ContentType).toBe('application/pdf');
});

test('karriere form rejects oversized CV', async ({ request }) => {
  const big = Buffer.alloc(9 * 1024 * 1024, 0x25); // 9 MB

  const res = await request.post('/api/karriere', {
    headers: { 'x-forwarded-for': uniqueIp() },
    multipart: {
      name: 'Big File',
      email: 'big@example.com',
      role: 'Software engineering',
      message: 'Attached an enormous CV.',
      cv: { name: 'big.pdf', mimeType: 'application/pdf', buffer: big },
    },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.error).toBe('validation');
  expect(body.fields.some((f) => f.field === 'cv' && f.reason === 'too_large')).toBe(true);
});

test('karriere form rejects invalid CV mime type', async ({ request }) => {
  const res = await request.post('/api/karriere', {
    headers: { 'x-forwarded-for': uniqueIp() },
    multipart: {
      name: 'Wrong Type',
      email: 'wrong@example.com',
      role: 'Software engineering',
      message: 'I attached a binary instead of a CV.',
      cv: { name: 'thing.exe', mimeType: 'application/octet-stream', buffer: Buffer.from('MZ') },
    },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.fields.some((f) => f.field === 'cv' && f.reason === 'invalid_type')).toBe(true);
});
