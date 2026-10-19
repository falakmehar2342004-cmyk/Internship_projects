// Yahan payment methods sirf naam/label hain.
// Card number ya CVV kabhi collect ya save nahi kiya jata.
export const PAYMENT_METHODS = [
  { value: 'card', label: 'Card', description: 'Pay with a credit or debit card.' },
  { value: 'paypal', label: 'PayPal', description: 'Pay with your wallet balance.' },
  { value: 'cod', label: 'Cash on Delivery', description: 'Pay when the order arrives.' },
];

// 'cod' -> 'Cash on Delivery'
export const getPaymentLabel = (value) =>
  PAYMENT_METHODS.find((m) => m.value === value)?.label ?? 'Unknown';
