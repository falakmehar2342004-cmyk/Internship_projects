// Yahan paisay aur date ko sahi shakal mein dikhane ke helpers hain.

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// 12.5 -> "$12.50"
export const formatCurrency = (value) => usd.format(Number(value) || 0);

// ISO date string -> "Oct 16, 2026, 4:30 PM"
export function formatDateTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

// Yahan 2 decimal tak round karte hain, taake 0.1 + 0.2 jaisi float ki ghalti na ho
export const round2 = (n) => Math.round(n * 100) / 100;
