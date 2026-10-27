// Shared formatting helpers for prices and durations.
export function formatPrice(value, currency = "PKR") {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "Price unavailable";

  return `${currency} ${amount.toLocaleString("en-PK")}`;
}

export function formatDuration(minutes) {
  const total = Number(minutes);

  if (!Number.isFinite(total) || total < 0) {
    return "Duration unavailable";
  }

  const hours = Math.floor(total / 60);
  const remainingMinutes = total % 60;

  if (hours === 0) return `${remainingMinutes} min`;
  if (remainingMinutes === 0) return `${hours}h`;

  return `${hours}h ${remainingMinutes}m`;
}