# SecureSpace — Security Settings Dashboard (Demo)

A Vite + React dashboard demonstrating role-based navigation, demo login, a mock OTP step, mock access/refresh tokens, Redux Toolkit, browser storage, React Hook Form + Zod, Axios interceptors, device/activity pages, and a dark/light theme.

## Run locally

```bash
npm install
npm run dev
```

If npm reports a peer-dependency conflict around `@hookform/resolvers`, install the compatible major explicitly:

```bash
npm install @hookform/resolvers@5 zod
```

## Demo credentials

- User: `user@securityapp.com` / `User@123`
- Admin: `admin@securityapp.com` / `Admin@123`
- Demo OTP when 2FA is enabled: `123456`

## Important demo limitations

- No backend or database is connected.
- Login credentials and OTP are checked in frontend code only. This is not real authentication.
- Token strings are mock values, not cryptographically signed JWTs.
- The refresh interceptor demonstrates the pattern but requires a real server refresh endpoint to be secure and meaningful.
- Role checks in React Router are UI protections only. A production backend must enforce authorization for every protected operation.
- `localStorage` stores theme/profile/preferences/device demo data. `sessionStorage` stores the current demo session and clears when the tab session ends.
