#!/usr/bin/env node
/**
 * Batch-verify a list of YouTube IDs / archive.org IDs via oEmbed / HEAD.
 * Usage:
 *   node scripts/verify-yt-batch.mjs ids.txt
 * Each line: <yt|archive>:<id> [optional label]
 */
import fs from "node:fs";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

async function verifyYouTube(id) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ctrl.signal });
    if (res.ok) {
      const j = await res.json();
      return { ok: true, status: 200, title: j.title, author: j.author_name };
    }
    return { ok: false, status: res.status };
  } catch (e) {
    return { ok: false, status: 0, error: e.message };
  } finally {
    clearTimeout(t);
  }
}

async function verifyArchive(id) {
  const url = `https://archive.org/embed/${id}`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": UA },
      signal: ctrl.signal,
    });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, status: 0, error: e.message };
  } finally {
    clearTimeout(t);
  }
}

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node verify-yt-batch.mjs ids.txt");
  process.exit(1);
}

const lines = fs.readFileSync(arg, "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));

for (const line of lines) {
  const m = line.match(/^(yt|archive):([A-Za-z0-9_\-]+)\s*(?:\|(.*))?$/);
  if (!m) {
    console.log(`SKIP malformed: ${line}`);
    continue;
  }
  const [, kind, id, label] = m;
  process.stdout.write(`[${kind}] ${id}${label ? " (" + label.trim() + ")" : ""} ... `);
  let r;
  if (kind === "yt") r = await verifyYouTube(id);
  else r = await verifyArchive(id);
  if (r.ok) {
    console.log(`OK${r.title ? ` "${r.title}"${r.author ? " — " + r.author : ""}` : ""}`);
  } else {
    console.log(`BROKEN ${r.status} ${r.error || ""}`);
  }
}
