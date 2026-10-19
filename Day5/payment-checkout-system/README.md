# Kartly - Online Store (React practice project)

A small e-commerce app: browse products, fill a cart, apply a coupon, check out with a validated form,
and see your orders on a dashboard.

> Payments are simulated. No real money moves and no card numbers, CVVs or bank details are ever asked for or stored.

## Tech stack
React 18, Vite, Redux Toolkit, React Router, **React Hook Form**, Axios, Tailwind CSS, React Hot Toast, Lucide icons.

## Pages
| Route | What it does |
|---|---|
| `/` | Product list with search, category filter and "Load more" |
| `/products/:id` | Product details, quantity, Add to cart / Buy now |
| `/cart` | Cart items, coupon, totals |
| `/checkout` | Shipping form + payment method (React Hook Form) |
| `/payment-success`, `/payment-failed` | Result pages (retry is supported) |
| `/orders` | Order history |
| `/dashboard` | Revenue and order stats, filter form, orders table |

## Forms (all use React Hook Form)
- **Checkout** (`pages/Checkout.jsx`): validation rules, `isSubmitting`, pre-filled on retry
- **Coupon** (`components/CouponBox.jsx`): custom `validate` rule
- **Search + category** (`pages/Home.jsx`): `watch()` + debounce
- **Dashboard filters** (`pages/Dashboard.jsx`): `watch()`, `reset()`, date-range validation

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```
Needs Node 18+ and internet (products come from https://dummyjson.com).

## Coupons
`SAVE10` (10% off) and `SAVE20` (20% off).

## Folder structure
```
src/
  app/store.js            Redux store + saving cart/orders to localStorage
  features/               Redux slices: cart, coupon, orders, products
  hooks/                  usePageTitle, useOrderSummary, useRetryPayment, useCouponCleanup
  components/             Header, Footer, ProductCard, FormField, CouponBox, StatCard ...
  pages/                  Home, ProductDetails, Cart, Checkout, PaymentSuccess,
                          PaymentFailed, Orders, Dashboard, NotFound
  styles/                 theme.css (colours), global.css, components.css
  utils/                  format, ids, storage, paymentMethods, getApiError
```

## Theme
Colours live in `src/styles/theme.css` as CSS variables (teal primary, coral accent).
Light and dark themes are switched with `data-theme` on `<html>`.

## localStorage keys
`kartly:cart`, `kartly:orders`, `kartly:theme`. localStorage is not secure storage, so do not enter real personal data.
