# Becoming Great 成为伟大

**Learn from Builders · 向缔造者学习**

A curated, open-source archive of first-hand materials from history's most impactful builders — what they said, what they did, and exactly when.

🌐 **[becominggreat.org](https://becominggreat.org)**

---

## What is this?

In an age of noise, signal is scarce. This project collects the raw materials — interviews, speeches, keynotes, letters, press releases — that let you hear builders in their own words, in context, with dates.

Every entry cites its source. Videos and audio play inline. Available in Chinese and English.

**No ads. Non-profit. Open source.**

## People

| Builder | Events | Sources | Inline Media |
|---------|--------|---------|-------------|
| 🍎 **Steve Jobs** | 61 | 102 | 38 videos/audio |
| 🚀 **Elon Musk** | 50 | 66 | 27 videos |
| 📈 **Charlie Munger** | 35 | 58 | 17 videos |
| 🛢️ **John D. Rockefeller** | 40 | 76 | — |
| + 8 more people coming soon ||||

**186 events · 317 sources · 84 inline embeds · 35 verbatim quotes · Full bilingual (zh/en)**

## Quick Start

```bash
git clone https://github.com/BecomingGreat-org/becominggreat.git
cd becominggreat
npm install
npm run dev        # → http://localhost:3000
```

## Tech Stack

- **Next.js 15** — App Router, full static export (SSG)
- **Tailwind CSS 3** — dark theme
- **zod** — schema validation at build time
- **i18n** — URL-based locales (`/zh/...`, `/en/...`)
- **No database** — JSON files + Git = content versioning
- **GitHub Pages** — zero-cost static hosting

## Contributing

We welcome contributions. The bar is **first-hand sources, verified URLs, and bilingual coverage**. Read this whole section before opening a PR.

### What we accept

- **Events with primary sources.** Press releases, official keynote videos, archived interviews, letters, SEC filings, court records. A book retelling is OK as a *supplement*, not as the only citation for an event.
- **Verified URLs.** Every URL must currently resolve (200 OK or known-archived on Wayback). Fabricated, hallucinated, or wishfully-constructed URLs are the #1 reason PRs get bounced.
- **Bilingual content.** `title` + `title_en`, `summary` + `summary_en`. Both are required for new events. Same for `text` (English original) + `text_zh` (Chinese translation) on every quote.
- **Specific dates.** Use `day` precision when documented. Only fall back to `month` or `year` when the public record genuinely doesn't pin the date down. Vague catchall events (`2024-01-01`/year covering "the AI transformation") get rejected — pick the concrete milestone.

### What we reject

- Single-source events where the only citation is a generic product page or book URL with no way to verify the quoted text.
- Quotes without `speaker` and `context`. We need to know who said it and where.
- Events with no `sources` array at all.
- Mass AI-generated content without human curation. We can tell.
- New people with no death date for someone known to be deceased, or with the wrong birth year — please double-check.

### Add a new person
1. Add an entry to `data/people.json` with `id`, `name_zh`, `name_en`, `born`, `died` (or `null`), `tagline`, `tagline_en`.
2. Create `data/events/<id>.json` containing `[]`.
3. Add events (see schema below).

### Add events to an existing person
Edit `data/events/<person>.json`. Minimum schema for one event:

```json
{
  "id": "jobs-2007-01-09-iphone",
  "person_id": "jobs",
  "date": "2007-01-09",
  "date_precision": "day",
  "type": "product",
  "title": "在 Macworld 发布初代 iPhone",
  "title_en": "Introduces iPhone at Macworld",
  "summary": "中文摘要（必填）",
  "summary_en": "English summary (required)",
  "location": "Moscone West, San Francisco, CA",
  "key": true,
  "tags": ["iPhone", "Keynote"],
  "sources": [
    {
      "id": "apple-newsroom-iphone",
      "url": "https://www.apple.com/newsroom/2007/01/09Apple-Reinvents-the-Phone-with-iPhone/",
      "kind": "article",
      "title": "Apple Reinvents the Phone with iPhone",
      "publisher": "Apple Newsroom",
      "lang": "en",
      "license": "all-rights-reserved",
      "quotes": [
        {
          "text": "iPhone is a revolutionary and magical product...",
          "text_zh": "iPhone 是一款革命性的、神奇的产品...",
          "speaker": "Steve Jobs",
          "context": "发布会及新闻稿中的核心定调"
        }
      ]
    }
  ]
}
```

Source `kind` must be one of: `video` | `audio` | `article` | `transcript` | `book` | `image` | `document`.
Event `type` must be one of: `life` | `education` | `career` | `founding` | `product` | `deal` | `speech` | `interview` | `writing` | `award` | `other`.
Full schema is in `lib/schema.ts`.

### Source preferences (in order)

1. **Official press releases** — apple.com/newsroom, blogs.microsoft.com, ir.tesla.com
2. **Internet Archive** — `archive.org/details/...` for keynote videos and archived pages
3. **YouTube** with verified, currently-playable IDs (we run oEmbed to confirm)
4. **Wikipedia** (mark `"license": "cc-by-sa"`) — fine as a corroborating source, not the only one
5. **Authoritative journalism** — NYT, WSJ, FT, Bloomberg, Fortune, Rolling Stone
6. **Books** — only as a supplement to a primary source; never the only citation for a quoted line

If you genuinely can't find a source, leave `sources: []` and put what you tried in `source_hints`. A maintainer will help.

### Data pipeline (run before submitting)

```bash
node scripts/audit-urls.mjs --write     # HEAD-check every URL + fill Wayback snapshots
node scripts/parse-youtube.mjs --write  # Auto-extract YouTube/archive.org embeds
node scripts/verify-embeds.mjs          # Confirm every embed actually plays (oEmbed)
npm run build                           # zod validates ALL data files at build time
```

If `npm run build` fails, the error tells you exactly which field in which file is wrong. `verify-embeds.mjs` flagging a `BROKEN` line means a video/audio source in your PR doesn't load — fix the URL or remove the source before submitting.

### PR checklist

Before opening the PR, confirm each of these:

- [ ] `npm run build` passes (zod validates everything)
- [ ] `node scripts/verify-embeds.mjs` reports `broken: 0`
- [ ] Every URL in your changes was verified (manually opened or via `audit-urls.mjs`)
- [ ] Every event has both `summary` (zh) and `summary_en`
- [ ] Every quote has `speaker` and `context`
- [ ] Dates use `day` precision when documented; no vague year-level catchall events
- [ ] At least one source per event is primary material (not a book product page)
- [ ] PR description explains what you added and where the source material came from

### Submit a PR
1. Fork the repo and clone your fork
2. Create a branch (`git checkout -b add-einstein-events`)
3. Make changes, run the pipeline above
4. Push, open a PR against `main`
5. Confirm the PR checklist in the description

A maintainer will review. Expect 1-3 rounds of review for substantive contributions — the source-quality bar is the part that usually needs iteration.

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for design decisions:
- Why JSON files instead of a database
- i18n strategy
- File structure scaling plan
- Legal model for source embedding

## License

- **Content** (`data/`): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Code** (`app/`, `lib/`, `scripts/`): [MIT](https://opensource.org/licenses/MIT)
- Third-party content linked from sources retains its original copyright

## Links

- 🌐 Website: [becominggreat.org](https://becominggreat.org)
- 📖 Chinese: [becominggreat.org/zh](https://becominggreat.org/zh)
- 📖 English: [becominggreat.org/en](https://becominggreat.org/en)
- 💬 Quotes: [becominggreat.org/zh/quotes](https://becominggreat.org/zh/quotes)

---

*Built with the help of Claude. Contributions welcome.*
