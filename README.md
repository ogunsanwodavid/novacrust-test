This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions and Trade-offs

- Assumptions

Backend APIs for exchange rates, recipient validation, and payment processing exist and are reliable.

Currency conversion rates are returned in a normalized format.

Recipient bank details are validated server-side.

Phone numbers and emails follow standard international formats.

Authentication and authorization are handled outside this payment step.

Redux store persists only for the current session.

- Trade-offs

Redux over local state: Chosen for clarity and predictable state flow, even though local state could suffice.

Basic client-side validation: Lightweight checks improve UX; strict validation is deferred to backend.

Single-step form flow: Simplifies logic and UX, at the cost of scalability.

No form persistence on refresh: Avoided storage complexity for simplicity.
