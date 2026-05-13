import { test, expect } from '@playwright/test';
import { uniqueIp } from './utils';

test('contact API rejects missing required fields', async ({ request }) => {
  const res = await request.post('/api/contact', {
    headers: { 'x-forwarded-for': uniqueIp() },
    data: {},
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.error).toBe('validation');
  const fields = body.fields.map((f) => f.field);
  expect(fields).toEqual(expect.arrayContaining(['name', 'company', 'email', 'topic', 'message']));
});

test('contact API rejects invalid email', async ({ request }) => {
  const res = await request.post('/api/contact', {
    headers: { 'x-forwarded-for': uniqueIp() },
    data: { name: 'A', company: 'A', email: 'not-an-email', topic: 'X', message: 'hello' },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.fields.some((f) => f.field === 'email' && f.reason === 'invalid')).toBe(true);
});

test('karriere API rejects missing required fields', async ({ request }) => {
  const res = await request.post('/api/karriere', {
    headers: { 'x-forwarded-for': uniqueIp() },
    multipart: {},
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  const fields = body.fields.map((f) => f.field);
  expect(fields).toEqual(expect.arrayContaining(['name', 'email', 'role', 'message']));
});
