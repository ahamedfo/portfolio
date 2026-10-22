# How this site is put together

A static Next.js site. All the words live in `content/`, all the layout lives in
`components/` and `app/`. Adding work means editing `content/`. It should never mean
touching a component.

## The one thing you edit

`content/log.ts`. Append an entry, push, and the route gains a mark, the NOW edge moves,
and the list below the diagram grows a row.

```ts
{
  id: 'short-stable-slug',
  date: '2026-11',
  line: 'industry',          // or 'research'
  station: 'new-york-2',     // a station id from content/route.ts
  status: 'demo',            // shipped | demo | research | held
  title: 'One line, sentence case',
  readout: 'Two sentences at most. This is what shows when someone points at it.',
  href: '/work/slug',        // optional, if it has a page
  lenses: ['verification'],  // optional, puts it under a route filter
}
```

Nothing else needs changing. The diagram derives its layout, its filters, its readout,
and its ordering from that array.

## Where things are

```
content/
  log.ts          the append-only entries. THIS IS THE FILE YOU EDIT
  route.ts        stations, lines, and the geometry the diagram is drawn on
  profile.ts      name, links, headline, skills, education
  cases.ts        the four featured case studies
  secondary.ts    shorter client work
  research.ts     the quantization study, other research, earlier experiments
  roles.ts        employment and research positions
  lenses.ts       capabilities, which become the route filters

  recognition.ts  testimonials behind an approval gate, plus the award

components/
  route/
    RouteDiagram  the diagram. the only client component on the site
    RouteList     the same journey as text. mobile, no-JS, screen readers, print
    Readout       the strip that hover and focus both drive
    marks.ts      what a mark looks like, in one place
  CaseCard, StatusTag, Disclosure, Testimonial, Nav, Footer
  diagrams/       Figure wrapper plus three inline SVG illustrations

app/
  page.tsx                home. the route owns the first viewport
  work/[id]/page.tsx      one page per case study, generated from content/cases.ts
  research/page.tsx
  about/page.tsx
```

## Rules this content follows

These are not style preferences. They are why the copy can be trusted.

1. **No client names.** Clients are a sector. No colleague or client-contact names anywhere.
2. **Contribution and outcome are separate fields.** `contribution` is what Ahamed did.
   `outcome` says who the result belongs to. A team result is attributed to the team, in
   the copy, not in a footnote.
3. **Every case publishes its `limits`.** What the work does *not* establish is a visible
   section. A bounded claim is a usable one.
4. **`held` is used honestly.** It is the status for stopped work and for claims there is
   not evidence for. Two entries carry it right now, and they are the reason the rest of
   the route is believable.
5. **Status is a shape, not a colour.** Solid, ring, dotted ring, broken ring. The diagram
   stays readable in grayscale and under colour-vision deficiency.
6. **Diagrams say they are diagrams.** Every figure carries an "Illustration" label and a
   caption stating what it is not. Invented values are called synthetic.
7. **No private material, ever.** No evidence ids, source hashes, local paths, meeting
   titles, recordings, screenshots, or credentials. Not in the repo, not in the build.
8. **No em dashes.**

## Design decisions worth not undoing

**The palette is validated, not chosen by eye.** The two line hues were snapped into the
dark-mode OKLCH lightness band and run through a palette validator for lightness, chroma
floor, protan/deutan separation, normal-vision floor, and contrast against the field. The
ratios are recorded beside each token in `tailwind.config.ts`. If you need a third line,
re-run the validator rather than picking a hue that looks nice.

**The route has no linear time axis.** Ten of seventeen entries land in the last two
months. On a linear scale four empty years would eat the width and the recent work would
crush into a few pixels. So stations get slots sized by density and left-to-right carries
the ordering, the way every transit map works. Each station shows its own dates, so
nothing is hidden by the distortion.

**Each line stops where it stops.** Drawing both lines edge to edge would claim Ahamed had
an industry job in Buffalo. `lineExtent()` exists for that reason.

**The marks are HTML buttons over an SVG ground, not SVG children.** That buys native
focus, hover, keyboard, touch, and semantics for free. There is no key-handling code in
the diagram and there should not be.

**Hover and focus drive the same readout.** A tooltip is content that only exists while a
pointer is held still, which means it does not exist for a keyboard or a touchscreen. The
readout is always present and never empties.

**Reduced motion zeroes delays, not just durations.** The route staggers marks with delays
up to two seconds and uses `animation-fill-mode: both`, which holds the start state for
the whole delay. Zeroing only the duration leaves someone who opted out of motion staring
at an empty chart that then pops. `animation-delay: 0ms` in the reduced-motion block is
load-bearing. This was a real bug, caught by testing it rather than assuming it.

## Adding a case study

Append one object to `cases` in `content/cases.ts`: `id`, `title`, `shortTitle`, `blurb`,
`status`, `client` (sector, never a name), `problem`, `contribution`, `system`, `check`,
`outcome`, `limits`, `stack`, `lenses`, `diagram`, `featured`.

You get a card on the home page, a static page at `/work/<id>`, and a working deep link.
Add a matching entry in `content/log.ts` with the same `id` to put it on the route.

For a diagram: add a component under `components/diagrams/`, wrap it in `Figure`, register
it in the `diagrams` map in `app/work/[id]/page.tsx`, and set `diagram` on the case.

## Adding a testimonial

In `content/recognition.ts`:

1. Get permission for **the exact wording and the exact attribution**. Both.
2. Add it with `caseId` pointing at the case it corroborates.
3. Set `kind` honestly: `individual`, `team`, `relayed`, or `fixture`.
4. Set `approved: true`.

The component renders the kind as a visible label, so relayed feedback can never read as a
direct message from someone who did not write it. Nothing with `approved: false` renders.

`SHOW_FIXTURES` controls the one development placeholder. **Set it to `false` before
publishing.**

## Build and deploy

```bash
npm install
npm run dev     # http://localhost:3000/portfolio
npm run build   # static export into ./out
```

Do not run `npm run build` while `npm run dev` is running. The build clears `.next` out
from under the dev server and every route starts throwing `Cannot find module './NNN.js'`
until you restart it.

To preview the real production output:

```bash
mkdir -p /tmp/site && ln -sfn "$PWD/out" /tmp/site/portfolio
cd /tmp/site && python3 -m http.server 4100
# http://localhost:4100/portfolio/
```

Deployment facts that must stay in agreement:

- **Output directory:** `out`. The workflow in `.github/workflows/deploy.yml` uploads it.
- **Base path:** `/portfolio`, set in `next.config.js` as both `basePath` and
  `assetPrefix`, and mirrored in `lib/paths.ts` as `BASE_PATH`. Change all three together.
- **Asset paths:** `next/link` prefixes internal hrefs automatically. A plain `<img src>`,
  `<link>`, or fetch from `public/` does **not**. Route raw assets through `asset()`.
- **Direct links:** `output: 'export'` writes one HTML file per route, including one per
  case id, so `/portfolio/work/<id>` resolves without client-side routing.
- **Publishing:** a push to `main` deploys. There is no staging step.

## Checks to run before publishing

```bash
npm run build

# No client or colleague names in the built HTML
find out -name "*.html" -exec grep -oiE "\b(CBRE|DoorDash|APS|Caesars|PERA)\b" {} \;

# No evidence ids, hashes, or local paths
grep -rl "sha256\|/Users/\|Notes/Recordings" out --include="*.html"

# No credentials or insecure script tags
grep -rn "azurewebsites\|functions-key\|src=\"http://" out --include="*.html"

# No em dashes (U+2014)
grep -rlP "\x{2014}" content components app lib
```

All four should print nothing.

Then check by hand: set `SHOW_FIXTURES = false`, tab to a mark and confirm the readout
updates, turn JavaScript off and confirm every station and entry is still readable, and
load it at 390px.
