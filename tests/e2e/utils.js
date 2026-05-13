// Generates a random 10.x.x.x IP so each test gets fresh rate-limit buckets,
// even when re-running against the same long-lived dev container.
export function uniqueIp() {
  const a = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const c = Math.floor(Math.random() * 256);
  return `10.${a}.${b}.${c}`;
}
