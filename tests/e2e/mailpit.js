// Small helpers for talking to Mailpit's HTTP API during tests.
const MAILPIT = process.env.PW_MAILPIT_URL || 'http://localhost:8025';

export async function clearMailpit() {
  const res = await fetch(`${MAILPIT}/api/v1/messages`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Mailpit clear failed: ${res.status}`);
}

export async function listMessages() {
  const res = await fetch(`${MAILPIT}/api/v1/messages`);
  if (!res.ok) throw new Error(`Mailpit list failed: ${res.status}`);
  return res.json();
}

export async function waitForMessage({ to, timeoutMs = 10_000, intervalMs = 200 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const data = await listMessages();
    const found = (data.messages || []).find(
      (m) => !to || (m.To || []).some((t) => t.Address === to),
    );
    if (found) {
      const full = await fetch(`${MAILPIT}/api/v1/message/${found.ID}`).then((r) => r.json());
      return full;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Timed out waiting for message to ${to}`);
}

export async function getAttachment(messageId, partId) {
  const res = await fetch(`${MAILPIT}/api/v1/message/${messageId}/part/${partId}`);
  if (!res.ok) throw new Error(`Mailpit attachment fetch failed: ${res.status}`);
  return res.arrayBuffer();
}
