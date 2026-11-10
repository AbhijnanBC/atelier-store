# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

The storefront UI exists (home page, `/products/[slug]`). The catalogue (products, categories, stock) is read from Postgres. There are no carts, orders, payments, reviews, wishlists, variants or working auth flows yet; `collections`, `editorial` and `heroImage` in `src/data/catalog.ts` remain static content.

## Commands

```bash
npm run dev          # next dev
npm run build        # next build (needs DATABASE_URL set, see below)
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run db:generate  # drizzle-kit generate (SQL migrations -> ./drizzle)
npm run db:migrate   # drizzle-kit migrate
npm run db:push      # drizzle-kit push (sync schema directly, dev only)
npm run db:studio    # drizzle-kit studio
npm run db:seed      # idempotent catalogue seed (tsx src/db/seed.ts, loads .env then .env.local if present)
```

No test runner is configured. Put `DATABASE_URL` in `.env` or `.env.local` (copy from `.env.example`) before running anything that touches the DB; `drizzle.config.ts` loads `.env.local`, then `.env`, and `db:seed` loads `.env` then `.env.local`.

## Next.js version warning

`AGENTS.md` states this Next.js (16.x) has breaking changes versus common knowledge. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next code. `next.config.ts` enables `cacheComponents` and `partialPrefetching`, so pages are dynamic by default and caching is opt-in.

## Architecture

Request flow: `authClient` (`src/lib/auth-client.ts`) -> `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler`) -> `auth` (`src/lib/auth.ts`, Better Auth) -> `drizzleAdapter(db, { provider: "pg" })` -> `db` (`src/db/index.ts`) -> Neon Postgres.

- `src/db/index.ts` uses the Neon **HTTP** driver (`drizzle-orm/neon-http`): stateless, no interactive transactions. Switch to `neon-serverless` (WebSocket Pool) if transactions are needed. It throws at import if `DATABASE_URL` is unset, so importing `@/lib/auth` (and thus `next build`) requires the env var.
- `src/db/schema.ts` holds the catalogue tables plus Better Auth's four (user, session, account, verification), appended from `npx @better-auth/cli generate --output <scratch file>` (never generate straight into `schema.ts`, it overwrites). Regenerate and merge by hand if auth plugins change. `BETTER_AUTH_SECRET` is still unset. The schema is passed to `drizzle()`, and `drizzle.config.ts` reads it from this same file.
- `src/lib/auth.ts` has no sign-in methods enabled yet. Keep the `nextCookies()` plugin **last** in the plugins array.
- Catalogue data flow: pages `await` the cached queries in `src/lib/catalog-queries.ts` and pass plain data down. `src/app/page.tsx` fetches new arrivals and bestsellers with `Promise.all` and hands them to `NewArrivals` / `Bestsellers` as props; `src/app/products/[slug]/page.tsx` awaits the product and related items itself. Types are in `src/lib/catalog-types.ts`.
- Static (not in the DB): `collections`, `editorial` and `heroImage` in `src/data/catalog.ts`. The collections strip is not backed by `categories` ("Shoes" spans two parents).
- Tailwind v4 is configured in CSS (`src/app/globals.css`) and wired via `@tailwindcss/turbopack` rules in `next.config.ts`; there is no `tailwind.config` or PostCSS config.
- Path alias: `@/*` -> `src/*`.

## Database conventions

- Schema: camelCase TS keys with explicit snake_case column names; uuid primary keys (`defaultRandom()`); `slug` is the unique public identifier used in routes and links, the uuid is only the join key.
- Money is integer cents (`priceCents`; `compareAtCents` is the pre-sale price and must be greater than `priceCents`). The mappers `toProduct` / `toDetail` in `src/lib/catalog-queries.ts` are the only seam between DB rows and the UI: they convert cents to whole units and omit nullable fields (`compareAtPrice`, `badge`, `sizes`, `colour`, `care`, `stockDetail`) instead of passing `null`, so UI code and `formatPrice` work in whole units and test with plain truthiness. They assume every product has at least one `product_images` row (`images[0]`).
- Stock is stored as `stockQuantity` + `madeToOrder` on `products`. The state (`in_stock | low_stock | made_to_order | sold_out`), its copy and its colours are derived only in `src/lib/stock.ts`; never store or duplicate derived state. `stockDetail` is editorial copy that overrides the derived label. `LOW_STOCK_THRESHOLD` is 5 (a quantity at or below it is `low_stock`).
- Categories are two levels via nullable `parentId`; products reference a leaf category. Slugs are globally unique, so same-named children are prefixed (`women-shoes`, `men-shoes`).
- Image alt text lives on `product_images` (per usage), not on the product.
- Reads go through `src/lib/catalog-queries.ts` as async `'use cache'` functions with `cacheLife("hours")` and `cacheTag("products")`. Components and pages do not import `db` directly. Cached results can be up to an hour stale (including stock), so after writing catalogue rows call `revalidateTag("products")` / `updateTag`; no write path exists yet.
- Schema changes: edit `schema.ts`, `npm run db:generate`, commit the SQL in `./drizzle`, then `npm run db:migrate`. Use `db:push` only for throwaway experiments.
- Seed data lives in `src/db/seed-data.ts`; `seed.ts` upserts by slug and must stay idempotent; it overwrites every seeded field, so re-running it reverts manual edits (e.g. stock or prices changed in Studio). Because the Neon HTTP driver has no transactions, order writes parents-first.
- A `DATABASE_URL` already set in the shell/process env beats `.env`/`.env.local` (Next and Node never override existing vars). If scripts reach the DB but the dev server gets `ECONNREFUSED` or "fetch failed", check for a stale shell variable (`$env:DATABASE_URL` in PowerShell) and restart the dev server from a clean shell.
- `next build` queries the DB (`generateStaticParams`), so the database must be migrated and seeded before building.
