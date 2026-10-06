# ClassConnect

A quick-start social platform inspired by Instagram, with a protected admin dashboard and authentication flows.

## Setup

1. Install dependencies:
   npm install
2. Generate Prisma client:
   npx prisma generate
3. Push schema to SQLite:
   npx prisma db push
4. Seed the admin account and default settings:
   npm run prisma:seed
5. Start the app:
   npm run dev

## Admin login

- URL: /admin
- Username: Admin
- Password: Admin@54321

The password is not stored in frontend source. It is hashed in the backend when seeded.

## Environment variables

Copy `.env.example` to `.env` and configure the values before running the app.

## Notes

A real uploaded DavidNet Technologies logo is required for production use. The scaffold includes a placeholder brand icon at `/public/logo.svg`, which should be replaced with the exact asset supplied by your designer or upload source.
