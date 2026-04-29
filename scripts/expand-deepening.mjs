#!/usr/bin/env node
/**
 * Apply (b) deepening sources from research subagent.
 * Adds verified videos to thin people (Ford 0→7, Walton 3→5, Morita 5→6, Yang 7→10).
 */
import fs from "node:fs";
import path from "node:path";

function loadEvents(p) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "events", p + ".json"), "utf8"));
}
function saveEvents(p, events) {
  events.sort((a, b) => a.date.localeCompare(b.date));
  fs.writeFileSync(path.join(process.cwd(), "data", "events", p + ".json"), JSON.stringify(events, null, 2) + "\n");
}

const a = (id, archiveId, title, summary, summary_en, opts = {}) => ({
  id, url: `https://archive.org/details/${archiveId}`, kind: opts.kind || "video",
  title, publisher: opts.publisher || "Internet Archive", lang: "en",
  duration_sec: opts.duration_sec ?? null, primary: opts.primary ?? true,
  summary, summary_en, license: opts.license || "all-rights-reserved",
  authored_by: "human", mentions: [],
  ...(opts.quotes ? { quotes: opts.quotes } : {}),
});
const y = (id, ytId, title, pub, summary, summary_en, opts = {}) => ({
  id, url: `https://www.youtube.com/watch?v=${ytId}`, kind: "video",
  title, publisher: pub, lang: opts.lang || "en",
  duration_sec: opts.duration_sec ?? null, primary: opts.primary ?? false,
  summary, summary_en, license: "all-rights-reserved", authored_by: "human", mentions: [],
});

function applyAdds(person, adds) {
  const events = loadEvents(person);
  let u = 0, sk = 0;
  for (const it of adds) {
    const e = events.find((x) => x.id === it.eventId);
    if (!e) { console.error(`MISS ${person}/${it.eventId}`); continue; }
    if ((e.sources || []).find((s) => s.id === it.src.id)) { sk++; continue; }
    e.sources = e.sources || [];
    e.sources.push(it.src);
    u++;
    console.log(`+ ${person}: ${it.src.id} → ${it.eventId}`);
  }
  saveEvents(person, events);
}

// === Ford: 0 → 7 videos ===
applyAdds("ford", [
  // Birth event hosts the overall PBS biography (mirrors Rockefeller pattern)
  {
    eventId: "ford-1863-07-30-birth",
    src: y("youtube-pbs-american-experience", "AWK0tG_JWIU",
      "Henry Ford (2013) | Full Documentary | American Experience",
      "PBS America",
      "PBS《American Experience》2013 年制作的完整福特传记纪录片，2 小时全本——讲述他从密歇根农场少年到\"美国 20 世纪最有争议的工业家\"的全过程。",
      "PBS *American Experience* 2013 full Henry Ford biography (2 hours) — from Michigan farm boy to \"the most controversial American industrialist of the 20th century.\"",
      { primary: true }),
  },
  // Ford Motor founding event — PBS Chapter 1 clip
  {
    eventId: "ford-1903-06-16-ford-motor-founded",
    src: y("youtube-pbs-ch1", "Vcr3YQK0eEY",
      "HENRY FORD | Chapter 1 | AMERICAN EXPERIENCE | PBS",
      "American Experience | PBS",
      "PBS American Experience 第一章正片，覆盖福特 1903 年创立公司前后的历程。",
      "Official PBS *American Experience* Chapter 1 covering the period around the 1903 founding of Ford Motor Company."),
  },
  // Light's Golden Jubilee 1929 — three video pieces all attach to Greenfield Village dedication event
  {
    eventId: "ford-1929-10-21-greenfield-village",
    src: y("youtube-lights-golden-pt1", "nHEGLHP0muo",
      "Light's Golden Anniversary, Part 1 (1929) | Archive Footage",
      "The Henry Ford",
      "亨利·福特博物馆官方频道发布的 1929 年 \"光之金禧\" 庆典原始档案影像第一部分。福特、爱迪生、胡佛总统、奥维尔·莱特等人现场。",
      "Henry Ford Museum's official archival footage of the October 21, 1929 \"Light's Golden Jubilee\" Part 1 — Ford, Edison, President Hoover, Orville Wright on stage.",
      { primary: true }),
  },
  {
    eventId: "ford-1929-10-21-greenfield-village",
    src: y("youtube-lights-golden-pt3", "eTMoaeax--Y",
      "Light's Golden Anniversary, Part 3 (1929) | Archive Footage",
      "The Henry Ford",
      "光之金禧庆典原始档案影像第三部分，亨利·福特博物馆官方频道。",
      "Light's Golden Jubilee archival footage Part 3, from the Henry Ford Museum's official channel."),
  },
  {
    eventId: "ford-1929-10-21-greenfield-village",
    src: a("archive-lights-golden-radio", "lights-golden-jubilee",
      "Light's Golden Jubilee (NBC Radio Broadcast, October 21, 1929)",
      "1929 年 10 月 21 日 NBC 广播电台对光之金禧的实况转播音频，包含胡佛总统、爱因斯坦、爱迪生、亨利·福特和埃德塞尔·福特的真实声音。",
      "October 21, 1929 NBC live radio broadcast of Light's Golden Jubilee — actual voices of Hoover, Einstein, Edison, Henry & Edsel Ford.",
      { kind: "audio", license: "public-domain" }),
  },
  // Menlo Park 1932 reminiscences — fits Greenfield Village (Ford restored Edison's Menlo Park there)
  {
    eventId: "ford-1929-10-21-greenfield-village",
    src: a("archive-menlo-park-1932", "fc-fc-909",
      "Reminiscences of Menlo Park (1932)",
      "1932 年纪录片，介绍福特修复爱迪生 Menlo Park 实验室并迁入 Greenfield Village 的过程。美国国家档案馆 FedFlix 收藏。",
      "1932 documentary about Ford's restoration of Edison's Menlo Park lab and its relocation to Greenfield Village. National Archives FedFlix collection.",
      { license: "public-domain" }),
  },
  // Fair Lane / Memorial newsreel — covers his death & funeral
  {
    eventId: "ford-1947-04-07-death",
    src: y("youtube-fair-lane-newsreel", "MyOglKpj8kA",
      "Henry Ford at Fair Lane / Model T / Ford Memorial Newsreel",
      "PeriscopeFilm",
      "新闻片合集，包含 1939 年世博会、1941 年费尔莱因庄园和 1947 年福特葬礼的纪念片段。",
      "Newsreel compilation including 1939 World's Fair, 1941 Fair Lane footage, and the 1947 Henry Ford memorial."),
  },
]);

// === Walton: 3 → 5 videos ===
applyAdds("walton", [
  {
    eventId: "walton-1962-07-02-first-walmart",
    src: y("youtube-walmart-cheer", "7g-2SeCDiD0",
      "Sam Walton Leads the Walmart Cheer | Walmart Museum Bentonville",
      "Northwest Arkansas Travel Guide",
      "Bentonville Walmart 博物馆全息回放——内含 Sam Walton 本人带领员工高呼 \"Walmart Cheer\" 的真实历史音频。",
      "Walmart Museum Bentonville hologram replay containing genuine archival audio of Sam Walton leading the Walmart Cheer with employees."),
  },
  // Sam & Bud Walton: Reflections — overall biography, attach to birth event
  {
    eventId: "walton-1918-03-29-born-kingfisher",
    src: y("youtube-sam-bud-reflections", "gc5oVVF7Vu0",
      "Sam & Bud Walton: Reflections",
      "Walmart",
      "Walmart 官方频道发布的 Sam Walton 与弟弟 Bud Walton 回顾片，包含珍贵历史影像。",
      "Walmart's official corporate retrospective on Sam and Bud Walton, with archival footage of both brothers.",
      { primary: true }),
  },
]);

// === Morita: 5 → 6 videos ===
applyAdds("morita", [
  // UW 1988 lecture — attach to "Made in Japan" book event (similar timeframe, same theme)
  {
    eventId: "morita-1986-made-in-japan-book",
    src: y("youtube-uw-1988", "b5t4ceerkhg",
      "Akio Morita: Comparing Japanese and American Business Practices",
      "UW Video",
      "1988 年华盛顿大学 \"Upon Reflection\" 节目对盛田昭夫的访谈——比较日美商业实践，是他英语长篇访谈中最权威的官方版本之一。",
      "1988 University of Washington \"Upon Reflection\" series interview — Morita comparing Japanese and American business practices. One of the most authoritative official English-language Morita interviews."),
  },
]);

// === Yang: 7 → 10 videos ===
applyAdds("yang", [
  {
    eventId: "yang-2017-renounces-us-citizenship",
    src: y("youtube-cgtn-2017", "h7e0WElDhHE",
      "Top scientists become Chinese citizens, join Chinese Academy of Sciences",
      "CGTN",
      "CGTN 英文报道杨振宁与姚期智等顶尖科学家放弃美国国籍、成为中国公民并加入中科院的事件。",
      "CGTN English report on Yang Chen-Ning and Andrew Yao renouncing US citizenship to become Chinese citizens and join the Chinese Academy of Sciences.",
      { primary: true }),
  },
  // Two CCTV documentary episodes around Yang's 100th birthday — attach to centennial event
  {
    eventId: "yang-2021-09-22-tsinghua-centennial",
    src: y("youtube-cctv-jiaguo", "BzXe_dIbA8w",
      "《国家记忆》20210923 大先生杨振宁 家国情怀",
      "CCTV中文",
      "CCTV《国家记忆》栏目 2021 年 9 月 23 日播出的杨振宁百岁纪录片第一集 \"家国情怀\"，是中央电视台对其生平最完整的官方梳理。",
      "CCTV's *Memory of the Nation* documentary on Yang's 100th birthday, Episode 1 \"Ties to homeland\" (Sep 23, 2021) — the most comprehensive official CCTV biographical retrospective.",
      { lang: "zh" }),
  },
  {
    eventId: "yang-2021-09-22-tsinghua-centennial",
    src: y("youtube-cctv-donglie", "KdWreJvYsgA",
      "《国家记忆》20210924 大先生杨振宁 东篱归根",
      "CCTV中文",
      "CCTV《国家记忆》栏目 2021 年 9 月 24 日播出的杨振宁百岁纪录片第二集 \"东篱归根\"，讲述他晚年回中国定居与教学。",
      "CCTV *Memory of the Nation* Yang Chen-Ning centennial documentary Episode 2 \"Returning to home soil\" (Sep 24, 2021) — covers his return to China for permanent residence and teaching.",
      { lang: "zh" }),
  },
]);

console.log("\nDeepening done.");
