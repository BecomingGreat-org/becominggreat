#!/usr/bin/env node
/**
 * Add verified YouTube video sources to existing Musk and Munger events.
 * Every video ID was verified via the YouTube oEmbed API (HTTP 200 + valid JSON).
 *
 * Idempotent: skips if a source with the same id already exists on the event.
 * Only adds to events that do NOT already have a youtube.com source.
 */
import fs from "node:fs";
import path from "node:path";

const HUMAN = {
  license: "all-rights-reserved",
  authored_by: "human",
  mentions: [],
};

// ─── Musk videos ────────────────────────────────────────────────────────────
const MUSK_VIDEOS = {
  "musk-2012-06-22-model-s-delivery": {
    id: "youtube-model-s-first-delivery-2012",
    url: "https://www.youtube.com/watch?v=SH1LPS4iKzU",
    kind: "video",
    title: "Delivery of the first Tesla Model S Sedan",
    publisher: "jurvetson (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "musk-2017-07-28-model-3-delivery": {
    id: "youtube-model-3-first-handovers-2017",
    url: "https://www.youtube.com/watch?v=vzT0uNT0ds8",
    kind: "video",
    title: "First Model 3 Handovers",
    publisher: "Tesla (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "musk-2018-02-06-falcon-heavy": {
    id: "youtube-falcon-heavy-test-flight",
    url: "https://www.youtube.com/watch?v=wbSwFU6tY1c",
    kind: "video",
    title: "Falcon Heavy Test Flight",
    publisher: "SpaceX (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "musk-2019-11-21-cybertruck": {
    id: "youtube-cybertruck-event-verge-2019",
    url: "https://www.youtube.com/watch?v=m7atGkba-Z8",
    kind: "video",
    title: "Tesla Cybertruck event in 5 minutes",
    publisher: "The Verge (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "musk-2020-09-22-battery-day": {
    id: "youtube-tesla-battery-day-2020",
    url: "https://www.youtube.com/watch?v=l6T9xIeZTds",
    kind: "video",
    title: "Tesla Battery Day",
    publisher: "Tesla (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "musk-2021-05-08-snl": {
    id: "youtube-musk-snl-monologue-2021",
    url: "https://www.youtube.com/watch?v=fCF8I_X1qKI",
    kind: "video",
    title: "Elon Musk Monologue - SNL",
    publisher: "Saturday Night Live (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "musk-2023-04-20-starship-ift1": {
    id: "youtube-starship-ift1-spacex",
    url: "https://www.youtube.com/watch?v=_krgcofiM6M",
    kind: "video",
    title: "Starship | First Integrated Flight Test",
    publisher: "SpaceX (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "musk-2024-06-06-starship-flight4": {
    id: "youtube-starship-flight4-everyday-astronaut",
    url: "https://www.youtube.com/watch?v=8VESowgMbjA",
    kind: "video",
    title: "[4K] Watch SpaceX Starship FLIGHT 4 launch and reenter LIVE!",
    publisher: "Everyday Astronaut (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "musk-2024-10-13-starship-flight5": {
    id: "youtube-starship-flight5-nasaspaceflight",
    url: "https://www.youtube.com/watch?v=YC87WmFN_As",
    kind: "video",
    title: "FULL REPLAY: SpaceX Launches Starship Flight 5 (and Catches A Booster)",
    publisher: "NASASpaceflight (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "musk-2016-07-neuralink-founding": {
    id: "youtube-neuralink-demo-2020-cnet",
    url: "https://www.youtube.com/watch?v=iOWFXqT5MZ4",
    kind: "video",
    title: "Watch Elon Musk's ENTIRE live Neuralink demonstration",
    publisher: "CNET (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
};

// ─── Munger videos ──────────────────────────────────────────────────────────
const MUNGER_VIDEOS = {
  "munger-2019-cnbc-interview": {
    id: "youtube-munger-cnbc-2019",
    url: "https://www.youtube.com/watch?v=peUrLZ24GfM",
    kind: "video",
    title: "Berkshire Hathaway VP Charlie Munger on investing",
    publisher: "CNBC Television (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
  "munger-2020-02-12-daily-journal-covid": {
    id: "youtube-munger-daily-journal-2020",
    url: "https://www.youtube.com/watch?v=HS8neXkNnhw",
    kind: "video",
    title: "Legendary investor Charlie Munger speaks at Daily Journal annual meeting \u2013 2/12/2020",
    publisher: "CNBC Television (YouTube)",
    lang: "en",
    primary: true,
    ...HUMAN,
  },
};

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Returns true if the event already has at least one source whose url
 * contains "youtube.com".
 */
function hasYoutubeSource(event) {
  return event.sources.some(
    (s) => s.url && s.url.includes("youtube.com"),
  );
}

/**
 * Process one JSON file: add VIDEO_SOURCES entries to matching events.
 * @param {string} relPath  e.g. "data/events/musk.json"
 * @param {Record<string, object>} videoMap  eventId → source object
 * @returns {number} count of sources added
 */
function addVideos(relPath, videoMap) {
  const filePath = path.join(process.cwd(), relPath);
  const events = JSON.parse(fs.readFileSync(filePath, "utf8"));

  let added = 0;
  let mutated = false;

  for (const event of events) {
    const newSource = videoMap[event.id];
    if (!newSource) continue;

    // Skip if the event already has ANY youtube.com source
    if (hasYoutubeSource(event)) {
      console.log(`skip ${event.id} (already has a youtube.com source)`);
      continue;
    }

    // Idempotent: skip if a source with this exact id already exists
    if (event.sources.some((s) => s.id === newSource.id)) {
      console.log(`skip ${event.id} (source ${newSource.id} already present)`);
      continue;
    }

    event.sources.push(newSource);
    console.log(`+ ${event.id} \u2192 ${newSource.id}`);
    added++;
    mutated = true;
  }

  if (mutated) {
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2) + "\n");
  }

  return added;
}

// ─── main ───────────────────────────────────────────────────────────────────
console.log("=== Musk events ===");
const muskAdded = addVideos("data/events/musk.json", MUSK_VIDEOS);
console.log(`\nadded ${muskAdded} video sources to musk events\n`);

console.log("=== Munger events ===");
const mungerAdded = addVideos("data/events/munger.json", MUNGER_VIDEOS);
console.log(`\nadded ${mungerAdded} video sources to munger events\n`);

const total = muskAdded + mungerAdded;
console.log(`\u2705 Total: ${total} verified video sources added`);
