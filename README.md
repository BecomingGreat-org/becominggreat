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

We welcome contributions! Here's how:

### Add a new person
1. Add entry to `data/people.json`
2. Create `data/events/<id>.json` with `[]`
3. Start adding events (see schema below)

### Add events to an existing person
Edit `data/events/<person>.json`. Each event:

```json
{
  "id": "jobs-2007-01-09-iphone",
  "person_id": "jobs",
  "date": "2007-01-09",
  "date_precision": "day",
  "type": "product",
  "title": "在 Macworld 发布初代 iPhone",
  "title_en": "Introduces iPhone at Macworld",
  "summary": "Chinese summary (required)",
  "summary_en": "English summary (required)",
  "location": "San Francisco, CA",
  "tags": ["iPhone", "Keynote"],
  "sources": [{ "id": "...", "url": "...", "kind": "video", ... }]
}
```

### Data pipeline

After changes, run:

```bash
node scripts/audit-urls.mjs --write    # Verify URLs + Wayback snapshots
node scripts/parse-youtube.mjs --write # Auto-extract video embeds
node scripts/verify-embeds.mjs         # Verify all embeds play
npm run build                          # zod validates everything
```

### Submit a PR
1. Fork the repo
2. Create a branch (`git checkout -b add-einstein-events`)
3. Make your changes
4. Run the pipeline above
5. Submit a PR

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
