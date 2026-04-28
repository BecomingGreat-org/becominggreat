# Becoming Great / 成为伟大

**Live site:** [becominggreat.org](https://becominggreat.org)

A curated, open-source archive of first-hand materials from history's most impactful builders — what they said, what they did, and exactly when. Every entry cites its source. Video and audio are embedded inline. Available in Chinese and English.

## Project at a glance

| Metric | Count |
|--------|-------|
| People | 12 (Jobs, Musk, Munger, Rockefeller, Yang Chen-Ning, Huang, Gates, Buffett, Bezos, Franklin, Disney, Carnegie) |
| Events | ~409 |
| Sources | ~626 |
| Inline embeds (YouTube / archive.org / audio / PDF) | ~157 |
| Quotes with verbatim text + translation | ~46 |
| Languages | Chinese (zh) + English (en) |

Counts grow over time — treat the numbers as a snapshot, not a hard fact. The shape of the data is the contract.

The project is a **non-profit**. Content review will eventually be crowdsourced — think Wikipedia for builder timelines.

## Tech stack

- **Framework:** Next.js 15 (App Router, full SSG, TypeScript)
- **Styling:** Tailwind CSS 3
- **Data:** JSON files in `data/` — no database. Git is the version control AND content database.
- **Validation:** zod v4 (`lib/schema.ts`) — validates every data file at build time
- **i18n:** URL-based locales (`/zh/...`, `/en/...`) via `[locale]` route segment
- **Deployment:** Static export, any CDN (Vercel recommended for zero-config)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build + zod validation
```

## Project structure

```
app/
  layout.tsx                              # Root HTML shell
  page.tsx                                # / → redirect to /zh
  [locale]/
    layout.tsx                            # Header + LocaleProvider (zh/en)
    page.tsx                              # Home page (hero, featured quotes, people grid)
    quotes/page.tsx                       # All quotes aggregated
    people/[id]/
      page.tsx                            # Person timeline with tag filter + search
      sources/[sid]/page.tsx              # Source detail (embed + editorial + wayback + citation)
  components/
    Timeline.tsx                          # Client component: filterable event list
    QuotesView.tsx                        # Client component: searchable quotes
    FeaturedQuotes.tsx                    # Home page quote preview
    LocaleProvider.tsx                   # React context for locale (URL-based)
    LanguageToggle.tsx                   # zh/EN switcher
    T.tsx                                # <T k="ui.key" /> for i18n UI strings

data/
  people.json                            # Person metadata (12 entries)
  events/
    jobs.json                            # Steve Jobs
    musk.json                            # Elon Musk
    munger.json                          # Charlie Munger
    rockefeller.json                     # John D. Rockefeller
    yang.json                            # Chen-Ning Yang
    huang.json                           # Jensen Huang
    gates.json                           # Bill Gates
    buffett.json                         # Warren Buffett
    bezos.json                           # Jeff Bezos
    franklin.json                        # Benjamin Franklin
    disney.json                          # Walt Disney
    carnegie.json                        # Andrew Carnegie
  schema.md                             # Human-readable schema documentation
  translations-batch2.json              # Translation data (used by scripts)

lib/
  schema.ts                             # Zod schemas (single source of truth for types)
  data.ts                               # Data loading + validation + helpers
  i18n.ts                               # Locale types, UI string dictionary, pick() helper

scripts/                                # Data pipeline (run after content changes)
  audit-urls.mjs                        # HEAD-check all URLs + fill Wayback timestamps
  parse-youtube.mjs                     # Extract YouTube/archive.org embeds from source pages
  remove-bad-embeds.mjs                 # Clean up known wrong auto-matches
  verify-embeds.mjs                     # Verify all embeds actually play (oEmbed API)
  verify-yt-batch.mjs                   # Pre-flight: verify a batch of candidate yt:/archive: IDs
                                        #   from a text file before adding them to data
  add-translations.mjs                  # Apply English translations to events
  add-*.mjs / expand-*.mjs             # Content addition scripts (idempotent)

docs/
  ARCHITECTURE.md                       # Design decisions, scaling plan, i18n strategy
```

## How to contribute content

### Adding a new person

1. Add an entry to `data/people.json`
2. Create `data/events/<person-id>.json` with `[]`
3. Write an `add-<person>-events.mjs` script (see existing ones as templates)
4. Run the data pipeline (below)

### Adding events to an existing person

Edit `data/events/<person-id>.json` directly, or write a script in `scripts/`. Each event must match the zod schema in `lib/schema.ts`. Key fields:

```json
{
  "id": "jobs-2007-01-09-iphone",
  "person_id": "jobs",
  "date": "2007-01-09",
  "date_precision": "day",
  "type": "product",
  "title": "在 Macworld 发布初代 iPhone",
  "title_en": "Introduces iPhone at Macworld",
  "summary": "中文摘要 (required)",
  "summary_en": "English summary (required for bilingual)",
  "location": "Moscone West, San Francisco, CA",
  "key": true,
  "tags": ["iPhone", "Keynote"],
  "sources": [...]
}
```

**Event types:** `life` | `education` | `career` | `founding` | `product` | `deal` | `speech` | `interview` | `writing` | `award` | `other`

### Adding sources

Each source must have a verified, working URL. Preferred source hierarchy:

1. **Official press releases** — apple.com/newsroom, blogs.microsoft.com, ir.tesla.com, news.microsoft.com/source
2. **Internet Archive** — `archive.org/details/X` for keynote videos and archived pages
3. **YouTube** — only with verified, currently-playable IDs (we run oEmbed to confirm)
4. **Wikipedia** (cc-by-sa license, mark `"license": "cc-by-sa"`) — fine as a corroborating source, not the only one for an event
5. **Authoritative journalism** — NYT, WSJ, FT, Bloomberg, Fortune, Rolling Stone
6. **Books** — only as a *supplement* to a primary source. Never the only citation for a quoted line; a book product page (HarperCollins, Penguin, Amazon) doesn't show the quoted text and can't be verified by readers.
7. **Curated fan archives** — e.g. allaboutstevejobs.com for Jobs keynote videos

**DO NOT fabricate URLs.** This is the #1 reason PRs get bounced. Construct nothing from memory — every URL must come from a search result you actually fetched, an oEmbed call you actually ran, or a page you actually opened. If unsure, leave `sources: []` and use `source_hints` to describe where to look.

**Verify before adding.** YouTube IDs and archive.org item slugs both have lookup APIs:

```bash
# Fast batch check before editing data files:
echo "yt:abc123XYZ" > /tmp/ids.txt
echo "archive:wwdc-2011" >> /tmp/ids.txt
node scripts/verify-yt-batch.mjs /tmp/ids.txt
# OK rows are real; BROKEN rows must not be added to JSON.
```

### Adding translations

Every event needs both `summary` (Chinese) and `summary_en` (English). Every quote needs `text` (the original — usually English) and `text_zh` (Chinese translation). Add translations via `scripts/add-translations.mjs` or edit JSON directly.

The `text_en` field exists in the schema for cases where the original is non-English (and `text` holds the original); when the original is already English, omit `text_en` rather than duplicating `text`. (`buffett.json` has redundant `text_en` for legacy reasons; new contributions should not copy that pattern.)

### Quote requirements

Every quote needs:
- `text` — verbatim original
- `text_zh` — Chinese translation (required for bilingual rendering)
- `speaker` — who said it (full name)
- `context` — one sentence on where/why/when it was said. Without context, a quote is decoration, not evidence.

### Data pipeline

After any content change, run:

```bash
node scripts/audit-urls.mjs --write      # Verify URLs + fill Wayback snapshots
node scripts/parse-youtube.mjs --write   # Auto-extract YouTube/archive.org embeds
node scripts/remove-bad-embeds.mjs       # Clean known false positives
node scripts/verify-embeds.mjs           # Verify all embeds play (YouTube oEmbed)
npm run build                            # Zod validates ALL data files at build time
```

If `npm run build` fails with a schema error, it will tell you exactly which field in which file is wrong. If `verify-embeds.mjs` reports any `BROKEN` row, the URL doesn't load — fix or remove it before submitting.

## Don't ship until these all pass

Treat this as a hard gate, not a suggestion. Before claiming a content change is done (or opening a PR):

1. `npm run build` exits 0
2. `node scripts/verify-embeds.mjs` reports `broken: 0`
3. Every new URL was verified by something more than vibes — `audit-urls.mjs` HEAD probe, an oEmbed call, or `verify-yt-batch.mjs` against a candidate list
4. Every new event has both `summary` and `summary_en`
5. Every new quote has `speaker` and `context`
6. No new event uses year-level precision (`YYYY-01-01` + `"date_precision": "year"`) just to dodge looking up the actual date
7. No new event has only a book product page as its sole source

## Common failure modes (especially when AI agents help write content)

These are the things that have actually gone wrong on this repo. Avoid all of them.

- **Hallucinated YouTube IDs.** AI agents will confidently produce 11-character YouTube IDs that look right and don't exist, or that exist but point to a different video (we've shipped a Wendover Productions clip mislabeled as a 2014 Musk MIT talk). Treatment: every YouTube ID gets oEmbed-verified before it touches `data/`.
- **First-iframe Wikipedia trap.** `parse-youtube.mjs` skips Wikipedia for this reason — Wikipedia article pages often have a current-news iframe as the first match that has nothing to do with the article. Don't bypass the Wikipedia skip.
- **Single-source events with only a book URL.** A HarperCollins / Penguin product page doesn't display the quoted text. Readers can't verify. Always pair a book citation with a primary source (press release, video, archived interview).
- **Vague catchall events.** Year-precision events titled "AI transformation" or "the platform era" with `YYYY-01-01` dates. These get rejected — pick the concrete dated milestone instead. (Example fix: `2024-01-01`/year "Microsoft becomes most valuable" → `2024-01-12`/day with the CNBC story as source.)
- **Date drift.** Specific incidents have specific dates. The Nadella karma incident is October 9, 2014 (Grace Hopper Celebration), not 2016. The Lost Interview is 1995, not 1990. When in doubt, look it up.
- **Wrong event types.** The schema enum is `life | education | career | founding | product | deal | speech | interview | writing | award | other`. Common subagent mistakes: `achievement` (use `award`), `milestone` (use `other`), `podcast` (use `interview`), `keynote` (use `speech`). Build will fail with a clear zod error if you get this wrong — don't try to bypass it.
- **Skipping the pipeline.** Agents tend to declare success after editing JSON without running `npm run build` or `verify-embeds.mjs`. Don't. Both must pass before claiming done.
- **Pushing to the wrong git account.** This repo is owned by the `BecomingGreat-org` GitHub user account, not by the person checking out the code. If `git push` fails with a 403, run `gh auth switch -u BecomingGreat-org` (assuming you have access) before retrying.

### Source embed pipeline

Sources with video/audio content get embedded inline automatically:

| URL pattern | Embed method |
|---|---|
| `youtube.com/watch?v=ID` | YouTube iframe (privacy-enhanced) |
| `archive.org/details/X` | archive.org/embed/X iframe |
| `*.pdf` | Browser native PDF viewer |
| `media_url` field (`.m4a`, `.mp3`, `.mp4`) | HTML5 `<audio>` / `<video>` |
| Other article URLs | Wayback Machine `if_/` snapshot iframe (when available) |

`parse-youtube.mjs` auto-discovers YouTube embeds by scraping source pages. Wikipedia URLs are skipped (unreliable extraction). Known wrong matches are blacklisted in `remove-bad-embeds.mjs`.

## Legal model

| License | What we can do | What we can't |
|---|---|---|
| `all-rights-reserved` (default) | Our summary, short fair-use quotes, Wayback embed, citation link | Host full text |
| `cc-by-sa` (Wikipedia) | Everything including full mirror | Must use same license |
| `public-domain` (SEC filings, LoC) | Everything | Nothing restricted |

We never host copyrighted full text. The `hosted_text` field is only valid when `license` is `cc-by-sa` or `public-domain`. This is enforced at the code level.

## Architecture decisions

See `docs/ARCHITECTURE.md` for details on:
- Why JSON files, not a database
- File structure scaling plan (single file → per-event directories)
- i18n design (LocalizedString type, `[locale]` routes, translation workflow)
- When to migrate to SQLite/Postgres (not yet)

## Brand

- **Chinese:** 成为伟大 / 向缔造者学习
- **English:** Becoming Great / Learn from Builders
- **Domain:** becominggreat.org

## License

Content data (`data/`) is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
Source code (`app/`, `lib/`, `scripts/`) is licensed under [MIT](https://opensource.org/licenses/MIT).

Third-party content linked from `sources[].url` retains its original copyright. We link, attribute, and embed (via iframe or Wayback Machine) — we do not republish.
