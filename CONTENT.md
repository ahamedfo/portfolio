# How this site is put together

A static Next.js site. All the words live in `content/`, all the layout lives in `components/` and `app/`.
Adding work means editing `content/`. It should never mean touching a component.

## Where things are

```
content/
  profile.ts      name, links, headline, skills, education
  cases.ts        the four featured case studies
  secondary.ts    shorter client work, listed compactly
  research.ts     the quantization study, other research, earlier experiments
  roles.ts        employment and research positions
  lenses.ts       "How the work connects": capabilities and the links between work
  recognition.ts  testimonials behind an approval gate, plus the award

components/
  CaseCard, StatusTag, Disclosure, Testimonial, Nav, Footer
  ConnectionExplorer      the only client component on the site
  diagrams/               Figure wrapper plus three inline SVG illustrations

app/
  page.tsx                home
  work/[id]/page.tsx      one page per case study, generated from content/cases.ts
  research/page.tsx
  about/page.tsx
  not-found.tsx
```

## Rules this content follows

These are not style preferences. They are why the copy can be trusted.

1. **No client names.** Clients are a sector: "energy and utilities", "commercial real estate". No colleague or client-contact names anywhere.
2. **Contribution and outcome are separate fields.** `contribution` is what Ahamed personally did. `outcome` says who the result belongs to. A team result is attributed to the team, in the copy, not in a footnote.
3. **Every case publishes its `limits`.** What the work does *not* establish is a visible section on the page. A bounded claim is a usable one.
4. **Status is a word, not a colour.** "Working demo", "Client pilot", "Research in progress", "Team deployment". A reader can tell a demonstration from a deployment without decoding anything.
5. **Diagrams say they are diagrams.** Every figure carries an "Illustration" label and a caption stating what it is not. Any invented value is called synthetic in the caption.
6. **No private material, ever.** No evidence ids, source hashes, uncertainty scores, local paths, meeting titles, recordings, screenshots, transcripts, or credentials. Not in the repo, not in the build, not in browser-delivered JSON.
7. **No em dashes.**

## Adding a case study

Append one object to `cases` in `content/cases.ts`. That is the whole job.

```ts
{
  id: 'short-stable-slug',        // becomes /work/short-stable-slug
  title: '...',
  shortTitle: '...',              // used where the full title will not fit
  blurb: '...',                   // one sentence, reads on the card
  status: 'Working demo',         // see the CaseStatus union
  client: 'Energy and utilities', // sector, never a name
  org: 'IBM',
  period: '2026',
  problem: ['...'],               // what they could not do before
  contribution: ['...'],          // what YOU did
  system: [{ step: '...', detail: '...' }],
  check: { title: '...', body: ['...'] },   // the thing that verifies the model
  outcome: ['...'],               // attributed honestly
  limits: ['...'],                // published on the page
  stack: ['...'],
  lenses: ['verification', 'delivery'],     // ids from content/lenses.ts
  diagram: null,                  // or a key from the diagrams map
  featured: true,
}
```

You get: a card on the home page, a static page at `/work/<id>`, a working deep link, and an entry in every lens you listed.

To connect it in "How the work connects", add a node to `nodes` in `content/lenses.ts` with the same id, then list it under each relevant lens with a one-line reason. **The reason is the content.** A connection without a stated reason is decoration.

To give it a diagram, add a component under `components/diagrams/`, wrap it in `Figure`, register it in the `diagrams` map in `app/work/[id]/page.tsx`, and set `diagram` on the case.

## Adding a testimonial

In `content/recognition.ts`:

1. Get permission for **the exact wording and the exact attribution**. Both.
2. Add the entry with `caseId` pointing at the case it corroborates. Praise sits next to the contribution it supports, never in a wall of quotes.
3. Set `kind` honestly:
   - `individual` the writer is describing one person's work
   - `team` the writer is thanking or crediting a team
   - `relayed` a colleague is passing on what a client said
   - `fixture` a layout placeholder
4. Set `approved: true`.

The component renders the kind as a visible label, so relayed feedback can never read as a direct message from someone who did not write it. Nothing with `approved: false` renders at all.

`SHOW_FIXTURES` controls the one development placeholder. **Set it to `false` before publishing.**

## Build and deploy

```bash
npm install
npm run dev     # http://localhost:3000/portfolio
npm run build   # static export into ./out
```

Deployment facts that must stay in agreement:

- **Output directory:** `out`. The workflow in `.github/workflows/deploy.yml` uploads it.
- **Base path:** `/portfolio`, set in `next.config.js` as both `basePath` and `assetPrefix`, and mirrored in `lib/paths.ts` as `BASE_PATH`. Change all three together or none.
- **Asset paths:** `next/link` prefixes internal hrefs automatically. A plain `<img src>`, `<link>`, or fetch of a file in `public/` does **not**. Route every raw asset through `asset()` from `lib/paths.ts`. There are no raw assets today, which is why the helper is there for the first one.
- **Direct links:** `output: 'export'` writes one HTML file per route, including one per case id, so `/portfolio/work/<id>` resolves without client-side routing.
- **Moving to a root domain:** set `basePath` and `assetPrefix` to `''` and `BASE_PATH` to `''` at the same time.
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

## Accessibility and resilience, and why the code looks the way it does

- **The connection explorer renders every lens and every connection in the markup at all times.** The buttons filter; they do not reveal. With JavaScript off, the whole section reads as a list. This is why it is not a force graph: a graph needs a mouse, needs dragging, and hides its content behind hover.
- **Expandable detail uses `<details>`,** so it opens with a click, Enter, and Space without any JavaScript, and its content is in the DOM whether open or closed.
- **Diagrams are inline SVG** with `role="img"` and a `<desc>`, and every figure repeats its sequence as a numbered list. There are no `<img>` tags on the site, so there is no missing-image state.
- **Wide diagrams scroll inside their own container.** The page body never scrolls sideways.
- **Colours clear WCAG AA** against both the paper and the raised background. The ratios are recorded next to each token in `tailwind.config.ts`.
- **There are no animations.** Transitions are colour only and disappear under `prefers-reduced-motion`.
- **A skip link is the first thing in the DOM.**
