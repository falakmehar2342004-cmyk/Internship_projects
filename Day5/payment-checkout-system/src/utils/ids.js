// Yahan order aur transaction ke unique ID banate hain.
// Example: makeId('ORD') -> "ORD-LK3J9A-7H2QXP"
export function makeId(prefix) {
  const time = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${time}-${random}`;
}
