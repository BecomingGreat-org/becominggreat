#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "events", "disney.json");
const events = JSON.parse(fs.readFileSync(FILE, "utf8"));

const a = (id, archiveId, title, summary, summary_en, opts = {}) => ({
  id, url: `https://archive.org/details/${archiveId}`, kind: "video",
  title, publisher: "Internet Archive", lang: "en",
  duration_sec: opts.duration_sec ?? null, primary: opts.primary ?? true,
  summary, summary_en,
  license: opts.license || "public-domain",
  authored_by: "human", mentions: [],
  ...(opts.quotes ? { quotes: opts.quotes } : {}),
});
const y = (id, ytId, title, pub, summary, summary_en, opts = {}) => ({
  id, url: `https://www.youtube.com/watch?v=${ytId}`, kind: "video",
  title, publisher: pub, lang: "en",
  duration_sec: opts.duration_sec ?? null, primary: opts.primary ?? false,
  summary, summary_en, license: "all-rights-reserved", authored_by: "human", mentions: [],
});

const ADD = [
  // Steamboat Willie 1928 (public domain since 2024)
  { eventId: "disney-1928-11-18-steamboat-willie", src: a("archive-steamboat-willie-4k", "steamboat-willie-1928-4k-remastered", "Steamboat Willie (1928) 4K Remastered", "1928 年 11 月 18 日首映的《Steamboat Willie》——米奇老鼠首次正式登场，也是首部声画同步的卡通片。2024 年 1 月 1 日进入公共领域。", "*Steamboat Willie* — premiered November 18, 1928, the first official appearance of Mickey Mouse and the first synchronized-sound cartoon. Entered the public domain on January 1, 2024.", { primary: true }) },
  // Plane Crazy 1928 — Mickey's actual first appearance (preceded Steamboat Willie)
  { eventId: "disney-1928-11-18-steamboat-willie", src: a("archive-plane-crazy", "plane-crazy_1928", "Plane Crazy (1928)", "1928 年早期的《Plane Crazy》——米奇老鼠首次出现的卡通片，但因没有同步声音直到 1929 年才公开发行。这是 Disney/Iwerks 在 Steamboat Willie 之前完成的作品。", "*Plane Crazy* (1928) — the cartoon in which Mickey Mouse first appeared, but it lacked synchronized sound and wasn't publicly released until 1929. The Disney/Iwerks work completed *before* Steamboat Willie.") },
  // Flowers and Trees 1932 (first color animation, won first Oscar for Animated Short)
  { eventId: "disney-1932-flowers-trees-first-color", src: a("archive-flowers-trees", "flowers-and-trees-1932-restored", "Flowers and Trees (1932, Restored)", "1932 年的《Flowers and Trees》——首部全彩三色 Technicolor 动画短片，以及首部获得奥斯卡最佳动画短片奖的影片。", "*Flowers and Trees* (1932) — the first full-color three-strip Technicolor animated short and the first to win the Academy Award for Animated Short Film.", { primary: true }) },
  { eventId: "disney-1932-flowers-trees-first-color", src: a("archive-silly-symphonies", "walt-disneys-silly-symphonies-the-complete-collection-1929-39", "Walt Disney's Silly Symphonies — Complete Collection 1929-39", "包含 75 部 Silly Symphonies 短片完整合集（1929-1939），其中包括 Flowers and Trees。", "Complete collection of all 75 Silly Symphonies shorts (1929-1939), including Flowers and Trees.") },
  // Disneyland 1955 opening day live ABC broadcast
  { eventId: "disney-1955-07-17-disneyland-opens", src: a("archive-disneyland-opening-1955", "1955DisneylandOpeningDaycompleteAbcBroadcast", "1955 Disneyland Opening Day — Complete ABC Broadcast", "1955 年 7 月 17 日 Disneyland 开幕日 ABC 完整直播录像。Bob Cummings、Art Linkletter、Ronald Reagan 三人主持现场直播——将来的总统当时还是好莱坞演员。Walt 当天亲自向全美国观众介绍他的乐园愿景。", "Full ABC broadcast of Disneyland's opening day, July 17, 1955. Hosted live on TV by Bob Cummings, Art Linkletter, and Ronald Reagan — the future president was still a Hollywood actor at the time. Walt personally introduced his park vision to all of America.", { primary: true }) },
  { eventId: "disney-1955-07-17-disneyland-opens", src: a("archive-dateline-disneyland", "dateline-disneyland", "Dateline Disneyland — Opening Day Broadcast (1080p)", "1955 年 Disneyland 开幕日直播的 1080p 高清版本。", "1080p version of the 1955 Disneyland opening day broadcast.") },
  // 1964 Disney World announcement / The Florida Project (recorded 1966, released after his death)
  { eventId: "disney-1965-11-15-disney-world-announcement", src: a("archive-disneyland-worlds-fair", "disneyland-goes-to-the-worlds-fair", "Disneyland Goes to the World's Fair", "1965 年播出的 Wonderful World of Color 节目——Walt 介绍他在 1964 年纽约世博会上的四大 Disney 展项（小小世界、Mr. Lincoln、Carousel of Progress、Magic Skyway），同时为 Disney World 的奥兰多扩张埋下伏笔。", "1965 Wonderful World of Color episode — Walt introduces his four Disney attractions at the 1964 New York World's Fair (it's a small world, Mr. Lincoln, Carousel of Progress, Magic Skyway), foreshadowing the Disney World Orlando expansion.", { primary: true }) },
  { eventId: "disney-1965-11-15-disney-world-announcement", src: y("youtube-epcot-florida-project", "UEm-09B0px8", "1966 EPCOT Film - The Florida Project - Restored", "RetroWDW", "Walt Disney 1966 年录制的\"佛罗里达项目\"宣传片——他完整阐述 EPCOT 未来城市愿景。录制完成两个月后他就因癌症去世。这是他生前最后一次完整公开演讲。", "Walt's 1966 \"Florida Project\" promotional film — his complete vision for the EPCOT future city. He died of cancer two months after recording. His final full public address.", { quotes: [{ text: "Welcome to the Florida Project, our newest project, of which I am very excited.", text_zh: "欢迎来到佛罗里达项目，我们最新的项目，我对它非常激动。", speaker: "Walt Disney", context: "1966 年 EPCOT 宣传片开场——华特生前最后一次完整公开演讲" }] }) },
];

const NEW = [
  // 1954 first Disneyland TV episode
  { id: "disney-1954-10-27-disneyland-tv-show", person_id: "disney", date: "1954-10-27", date_precision: "day", type: "product", title: "ABC《Disneyland》电视节目首播", title_en: "Premiere of ABC's \"Disneyland\" TV series", summary: "1954 年 10 月 27 日 ABC 首播《Disneyland》电视节目（首集名为\"The Disneyland Story\"），由 Walt 亲自主持。这个节目改变了好莱坞与电视的关系，并为同时建造的 Disneyland 主题公园做大规模营销。本节目后改名为《Wonderful World of Disney》并连续播出 47 季。", summary_en: "On October 27, 1954, ABC premiered the *Disneyland* TV anthology series (first episode titled \"The Disneyland Story\"), hosted by Walt himself. The show transformed the relationship between Hollywood and television and provided massive marketing for the simultaneously-being-built Disneyland park. Later renamed *Wonderful World of Disney*, it ran 47 seasons.", location: "ABC TV", key: true, tags: ["电视节目", "Disneyland", "Wonderful World of Disney"], sources: [a("archive-disney-anthology", "disney-anthology-television-series", "Disney Anthology Television Series Collection", "Internet Archive 收藏的 Disney 电视节目大集（含 1954 年首集 \"The Disneyland Story\" 和后续多个 Walt 主持的著名集）。", "Internet Archive's Disney Anthology TV Series collection (includes the 1954 premiere \"The Disneyland Story\" and many other Walt-hosted episodes).", { primary: true })] },
  // 1962 Disneyland After Dark
  { id: "disney-1962-04-15-disneyland-after-dark", person_id: "disney", date: "1962-04-15", date_precision: "day", type: "product", title: "《Disneyland After Dark》（Wonderful World of Color）", title_en: "\"Disneyland After Dark\" (Wonderful World of Color)", summary: "1962 年 4 月 15 日的 Wonderful World of Color 第 8 季第 26 集。Walt 亲自带观众游览夜晚的 Disneyland 乐园——爵士音乐、烟花、Mark Twain 蒸汽船。是 Walt 1955-1966 间作为电视节目主持人的代表作之一。", summary_en: "Wonderful World of Color, Season 8 Episode 26, April 15, 1962. Walt personally takes viewers on a tour of Disneyland after dark — jazz music, fireworks, the Mark Twain riverboat. A signature episode from Walt's 1955-1966 TV-host era.", location: "Disneyland, Anaheim, CA", tags: ["Wonderful World of Color", "Disneyland"], sources: [a("archive-disneyland-after-dark", "walt-disneys-wonderful-world-of-color-s-08-e-26-disneyland-after-dark-april-15-1962", "Disneyland After Dark — Wonderful World of Color S08E26", "Wonderful World of Color 第 8 季第 26 集完整录像。", "Full Wonderful World of Color S08E26 recording.", { primary: true })] },
  // 1962 Holiday Time at Disneyland
  { id: "disney-1962-12-23-holiday-time", person_id: "disney", date: "1962-12-23", date_precision: "day", type: "product", title: "《Holiday Time at Disneyland》", title_en: "\"Holiday Time at Disneyland\"", summary: "1962 年 12 月 23 日播出的 Wonderful World of Color，由 Hamilton S. Luske 执导。Walt 介绍 Disneyland 圣诞主题装饰——展示这位主题乐园发明者如何把节日变成可重复体验的产品。", summary_en: "Wonderful World of Color episode aired December 23, 1962, directed by Hamilton S. Luske. Walt introduces Disneyland's Christmas theme decorations — showing how the inventor of theme parks turned holidays into reproducible experience products.", location: "Disneyland, Anaheim, CA", tags: ["Wonderful World of Color", "圣诞", "Disneyland"], sources: [a("archive-holiday-time", "holiday-time-at-disneyland", "Holiday Time at Disneyland (Wonderful World of Color)", "1962 年 12 月 23 日 Wonderful World of Color 圣诞节特辑完整录像。", "Full December 23, 1962 Wonderful World of Color Christmas special.", { primary: true })] },
];

let u = 0, ad = 0, sk = 0;
for (const it of ADD) {
  const e = events.find((x) => x.id === it.eventId);
  if (!e) { console.error(`MISS ${it.eventId}`); continue; }
  if ((e.sources || []).find((s) => s.id === it.src.id)) { sk++; continue; }
  e.sources = e.sources || [];
  e.sources.push(it.src);
  u++;
  console.log(`+ src ${it.src.id} → ${it.eventId}`);
}
for (const ne of NEW) {
  if (events.find((x) => x.id === ne.id)) { sk++; continue; }
  events.push(ne);
  ad++;
  console.log(`+ event ${ne.id}`);
}
events.sort((a, b) => a.date.localeCompare(b.date));
fs.writeFileSync(FILE, JSON.stringify(events, null, 2) + "\n");
console.log(`\nDone. +sources=${u} +events=${ad} skipped=${sk}`);
