# Zayit India Fine Dine

Production restaurant website built with Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion, GSAP, Lenis, Swiper, shadcn-style components and React Hook Form.

## Routes

- `/` — Home
- `/menu` — current public menu edit
- `/about` — verified public story and owner-content handoff
- `/gallery` — accessible Swiper gallery, lightbox, curated Instagram preview and honest 360° placeholder
- `/reservations` — verified phone route, disclosed WhatsApp test shortcut, live service clock and email-request helper
- `/events` — honest public-programme state and enquiry
- `/private-dining` — private dining enquiry without unverified guarantees
- `/contact` — exact contact details, directions and nearby landmarks
- `/blog` — source-backed city journal
- `/blog/[slug]` — statically generated journal articles
- `/guide` — source-backed Jaisalmer evening guide with live map routes

## Architecture

Pages, layouts, metadata, navigation, editorial content and structured data are React Server Components by default. Browser-only functionality is isolated:

- `components/motion/` — Framer Motion reveal island plus an idle-loaded Lenis/GSAP scroll enhancement
- `components/experience/` — procedural ambience, floating actions, loading screen and pointer aura
- `components/menu/menu-explorer.tsx` — searchable, filterable public-menu client island
- `components/gallery/gallery-swiper.tsx` — route-level Swiper client island
- `components/forms/inquiry-form.tsx` — React Hook Form and Zod client island
- `components/layout/mobile-navigation.tsx` — accessible native-dialog navigation island
- `components/ui/` — locally owned shadcn-style primitives
- `components/shared/` — reusable server-first editorial and information components
- `lib/content.ts` — typed, source-backed content model
- `lib/site.ts` — verified business and navigation constants

The site uses Next static export because the current product has no authorized
booking, inventory, social-feed, newsletter or content-management backend.
Server Components render during the production build, producing fast HTML and
route-level RSC payloads. If the owner later authorizes request-time services,
migrate the production adapter to OpenNext or the Sites-native server runtime.

## Commands

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm start
pnpm audit:lighthouse
```

`pnpm build` creates the Next export and adapts it to the existing Sites package contract. `pnpm start` serves the production output in the Cloudflare Workers runtime.

`pnpm-workspace.yaml` pins patched PostCSS and Sharp releases while Next.js and Wrangler still declare older transitive ranges. Recheck and remove those overrides after their upstream ranges include the patched versions.

## Content integrity

See `RESEARCH-SOURCES.md` for the dated evidence ledger and
`OWNER-CONTENT-CHECKLIST.md` for required owner approvals. The visible venue
gallery now uses owner-supplied restaurant files and no AI-generated or
traveller imagery. Photographer permissions and uncompressed masters still
belong in the launch record. Live availability, chef recommendations,
signatures, today’s special, Instagram API data and newsletter delivery are
never fabricated; the interface identifies each missing owner integration.
