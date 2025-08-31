/**
 * @template T
 * @param {string} event
 * @param {() => Promise<T>} fn
 * @returns T
 */
export async function runWithElapsed(event, fn) {
  const begin = Date.now();
  const r = await fn();
  const elapsed = Date.now() - begin;
  console.log(event + `: ${elapsed}ms`);
  return r;
}
