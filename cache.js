// cache.js
export const cache = new Map();

export function getCache(key) {
  return cache.get(key);
}

export function setCache(key, value) {
  cache.set(key, value);
}
