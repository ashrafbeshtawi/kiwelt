import { test, expect } from '@playwright/test';
import { clearMailpit, waitForMessage } from './mailpit';
import { uniqueIp } from './utils';

test.beforeEach(async ({ page }) => {
  await clearMailpit();
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': uniqueIp() });
});

test('contact form submits and sends mail', async ({ page }) => {
  await page.goto('/contact');

  await page.getByLabel('Name', { exact: true }).fill('Anna Beispiel');
  await page.getByLabel('Unternehmen').fill('Acme GmbH');
  await page.getByLabel('E‑Mail', { exact: true }).fill('anna@example.com');
  await page.getByLabel('Worum geht es?').fill('Wir suchen jemanden für ein OCR-Projekt.');

  await page.getByRole('button', { name: /Termin anfragen|Sending/ }).click();

  await expect(page.getByRole('status')).toContainText('Danke', { timeout: 5000 });

  const message = await waitForMessage({ to: 'kontakt@datenflow.local' });
  expect(message.Subject).toContain('Kontakt');
  expect(message.Text).toContain('Anna Beispiel');
  expect(message.Text).toContain('Acme GmbH');
  expect(message.Text).toContain('anna@example.com');
});

test('honeypot submission silently succeeds without sending mail', async ({ request }) => {
  const res = await request.post('/api/contact', {
    headers: { 'x-forwarded-for': uniqueIp() },
    data: {
      name: 'Bot',
      company: 'Spam Inc',
      email: 'bot@spam.test',
      topic: 'Custom Software',
      message: 'Buy now',
      _hp: 'i-am-a-bot',
    },
  });
  expect(res.status()).toBe(200);
  const list = await fetch(`${process.env.PW_MAILPIT_URL || 'http://localhost:8025'}/api/v1/messages`).then((r) => r.json());
  const toContact = (list.messages || []).filter((m) =>
    (m.To || []).some((t) => t.Address === 'kontakt@datenflow.local'),
  );
  expect(toContact).toHaveLength(0);
});
