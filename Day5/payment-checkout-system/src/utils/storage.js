// Yahan localStorage ke liye chhote helper functions hain.
// try/catch is liye hai ke private mode ya kharab data par app crash na ho.

export const KEYS = {
  cart: 'kartly:cart',
  orders: 'kartly:orders',
  theme: 'kartly:theme',
};

// Yahan storage se JSON padh kar wapis object bana rahe hain
export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback; // kuch masla ho to default value de do
  }
}

// Yahan object ko JSON bana kar storage mein save kar rahe hain
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // save na ho paye to chup-chap ignore karo
  }
}
