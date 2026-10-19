import { Minus, Plus } from 'lucide-react';

// Yahan [-] 1 [+] wala quantity stepper hai.
// Min (1) aur max par button disable ho jata hai.
export default function QuantityControl({ quantity, max, onDecrease, onIncrease, label = 'item' }) {
  return (
    <div className="qty" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" onClick={onDecrease} disabled={quantity <= 1} aria-label={`Decrease quantity of ${label}`}>
        <Minus size={16} aria-hidden="true" />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button type="button" onClick={onIncrease} disabled={quantity >= max} aria-label={`Increase quantity of ${label}`}>
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
