// Local Storage mein data save aur retrieve karne ke helpers.

export function getStorageItem(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);

    return item === null ? fallback : JSON.parse(item);
  } catch (error) {
    console.error(`Unable to read storage key "${key}"`, error);
    return fallback;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Unable to save storage key "${key}"`, error);
    return false;
  }
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Unable to remove storage key "${key}"`, error);
  }
}