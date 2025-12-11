# Assumptions & Design Decisions

## Environment Variables

The challenge requested adding `.env` to the repository. While I am aware this is a security anti-pattern (secrets should never be committed), I have included it to facilitate the review process as requested.

## Navigation

Since the core requirement is the `/posts` listing, I implemented a server-side redirect from the root `/` to `/posts` to improve UX and avoid dead ends.

## Database & Seeding

- I used `deleteMany()` in the seed script to ensure idempotency (the script can be run multiple times without errors).

## UI/UX

- I chose **CSS Modules** over Tailwind to demonstrate standard CSS architecture capabilities.
- The user filter implements a responsive pattern: "Pills" for desktop (better visibility) and standard "Dropdown" for mobile (better OS integration).
- I implemented URL-based state for filtering to ensure the application works with deep linking and page refreshes.
- I implemented a singleton pattern to prevent multiple instances during Next.js hot reloading
