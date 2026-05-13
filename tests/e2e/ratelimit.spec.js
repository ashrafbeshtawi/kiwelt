import { test, expect } from '@playwright/test';
import { uniqueIp } from './utils';

const validPayload = () => ({
  name: 'Rate Tester',
  company: 'RL Co',
  email: 'rl@example.com',
  topic: 'Custom Software',
  message: 'Filling the bucket.',
});

test('contact API rate-limits after 5 requests from the same IP', async ({ request }) => {
  const ip = uniqueIp();
  const headers = { 'x-forwarded-for': ip };

  for (let i = 0; i < 5; i += 1) {
    const ok = await request.post('/api/contact', { headers, data: validPayload() });
    expect(ok.status(), `attempt ${i + 1} should succeed`).toBeLessThan(400);
  }

  const sixth = await request.post('/api/contact', { headers, data: validPayload() });
  expect(sixth.status()).toBe(429);
  expect(sixth.headers()['retry-after']).toBeTruthy();
  const body = await sixth.json();
  expect(body.error).toBe('rate_limit');
});

test('different IPs have independent rate-limit buckets', async ({ request }) => {
  const a = uniqueIp();
  let b = uniqueIp();
  while (b === a) b = uniqueIp();

  for (let i = 0; i < 5; i += 1) {
    await request.post('/api/contact', {
      headers: { 'x-forwarded-for': a },
      data: validPayload(),
    });
  }
  const aBlocked = await request.post('/api/contact', {
    headers: { 'x-forwarded-for': a },
    data: validPayload(),
  });
  expect(aBlocked.status()).toBe(429);

  const bOk = await request.post('/api/contact', {
    headers: { 'x-forwarded-for': b },
    data: validPayload(),
  });
  expect(bOk.status()).toBeLessThan(400);
});
