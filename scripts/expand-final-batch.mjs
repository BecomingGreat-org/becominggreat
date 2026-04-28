#!/usr/bin/env node
/**
 * Final batch: top up Munger, Musk, Carnegie, Franklin, Rockefeller.
 *
 * - Munger: add 1995 Harvard "Psychology of Human Misjudgment" YouTube to existing 2007 event
 * - Musk: add Jay Leno's Garage 2008 Roadster retrospective to existing event
 * - Carnegie: 5 documentaries spread across birth, steel, Homestead, Gospel of Wealth events
 * - Franklin: kite story video + LibriVox autobiography
 * - Rockefeller: add a new event for Ida Tarbell's 1902-1904 expose (with LibriVox audiobook)
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
  id, url: `https://archive.org/details/${archiveId}`, kind: opts.kind || "audio",
  title, publisher: opts.publisher || "Internet Archive", lang: "en",
  duration_sec: opts.duration_sec ?? null, primary: opts.primary ?? true,
  summary, summary_en,
  license: opts.license || "public-domain",
  authored_by: "human", mentions: [],
});
const y = (id, ytId, title, pub, summary, summary_en, opts = {}) => ({
  id, url: `https://www.youtube.com/watch?v=${ytId}`, kind: "video",
  title, publisher: pub, lang: "en",
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
    console.log(`+ ${person}: src ${it.src.id} → ${it.eventId}`);
  }
  saveEvents(person, events);
  return { u, sk };
}

function applyNewEvents(person, newEvents) {
  const events = loadEvents(person);
  let ad = 0, sk = 0;
  for (const ne of newEvents) {
    if (events.find((x) => x.id === ne.id)) { sk++; continue; }
    events.push(ne);
    ad++;
    console.log(`+ ${person}: event ${ne.id}`);
  }
  saveEvents(person, events);
  return { ad, sk };
}

// === Munger ===
applyAdds("munger", [
  {
    eventId: "munger-2007-psychology-misjudgment-harvard",
    src: y("youtube-munger-1995-harvard", "FlWL1Qz23co",
      "Charlie Munger's Full 1995 Speech at Harvard on the Psychology of Human Misjudgment",
      "State of MedTech",
      "1995 年原版完整演讲——这个版本被广泛认为是\"心理误判 25 个原因\"思维框架的起点。后来 Munger 在 2003、2005 年扩展并写进 Poor Charlie's Almanack。",
      "The full original 1995 speech — widely considered the starting point of his \"25 causes of human misjudgment\" framework. Later expanded in 2003 and 2005 versions, and included in Poor Charlie's Almanack.",
      { primary: true }),
  },
]);

// === Musk ===
applyAdds("musk", [
  {
    eventId: "musk-2008-02-tesla-roadster",
    src: y("youtube-roadster-jay-leno", "jjZf9sgdDKc",
      "Throwback: Elon Musk With First 2008 Tesla Roadster - Jay Leno's Garage",
      "Jay Leno's Garage",
      "Jay Leno 与 Musk 一起回顾 2008 年第一台量产 Tesla Roadster——锂电池电动车量产历史的开端。",
      "Jay Leno and Musk revisit the first production 2008 Tesla Roadster — the start of the lithium-ion EV production era.",
      { primary: true }),
  },
]);

// === Carnegie ===
applyAdds("carnegie", [
  // Overall biography → attach to birth (same pattern as Rockefeller)
  {
    eventId: "carnegie-1835-11-25-birth",
    src: y("youtube-carnegie-prince-steel", "kZRND9IqPkA",
      "Andrew Carnegie: Prince Of Steel | Full Documentary | Biography",
      "Biography",
      "完整的安德鲁·卡内基传记纪录片——从苏格兰移民到\"钢铁王子\"再到现代慈善先驱的全景叙述。",
      "Full Andrew Carnegie biographical documentary — Scottish immigrant to \"Prince of Steel\" to pioneer of modern philanthropy.",
      { primary: true }),
  },
  // Steel works → Men Who Built America S1E3
  {
    eventId: "carnegie-1875-edgar-thomson-steel",
    src: y("youtube-mwba-carnegie-s1e3", "g180A6k7814",
      "How Carnegie Built an Empire of Steel | The Men Who Built America (S1, E3) | Full Episode | History",
      "HISTORY",
      "History Channel《The Men Who Built America》第 1 季第 3 集完整版——卡内基如何用 Bessemer 法、铁路客户、垂直整合一步步构建钢铁帝国。",
      "Full Men Who Built America S1E3 — how Carnegie built his steel empire through the Bessemer process, railroad customers, and vertical integration.",
      { primary: true }),
  },
  // Homestead Strike → 2 sources
  {
    eventId: "carnegie-1892-07-homestead-strike",
    src: y("youtube-carnegie-frick-mwba", "Q33oreSmwa0",
      "Carnegie & Frick: The Ruthless Deal That Led to Disaster (S1) | The Men Who Built America",
      "HISTORY",
      "Men Who Built America 关于 Homestead Strike 的完整剧集——卡内基把工厂留给 Frick 处理罢工，自己去苏格兰度假。结果是历史上最血腥的劳资冲突之一。",
      "The Men Who Built America full episode on the Homestead Strike — Carnegie left the plant in Frick's hands and vacationed in Scotland. The result was one of the bloodiest labor conflicts in history.",
      { primary: true }),
  },
  {
    eventId: "carnegie-1892-07-homestead-strike",
    src: y("youtube-river-ran-red", "y6KVqIFTKh8",
      "The River Ran Red: The 1892 Homestead Steel Strike",
      "Steelworkers",
      "工人视角的纪录片，记录 1892 Homestead 罢工——这是从 PA 钢铁工人传承下来的版本。",
      "A workers'-perspective documentary on the 1892 Homestead Strike — the version preserved by PA steelworkers' descendants."),
  },
  // Gospel of Wealth → audiobook
  {
    eventId: "carnegie-1889-gospel-of-wealth",
    src: y("youtube-gospel-of-wealth-audiobook", "cNEcBFCQAEQ",
      "The Gospel of Wealth by Andrew Carnegie — Full Audio Book",
      "LibriVox Audiobooks",
      "Carnegie 1889 年发表的《财富的福音》全文有声书——其中\"死时富有等于死时蒙羞\"是现代慈善理念的奠基语。",
      "Full audiobook of Carnegie's 1889 *The Gospel of Wealth* — including the foundational line of modern philanthropy: \"The man who dies rich, dies disgraced.\"",
      { primary: true }),
  },
]);

// === Franklin ===
applyAdds("franklin", [
  // Kite experiment
  {
    eventId: "franklin-1752-06-kite-experiment",
    src: y("youtube-franklin-kite", "f0oc4gUCOQI",
      "The TRUE Story of Ben Franklin & His Kite",
      "Be Smart",
      "PBS \"Be Smart\" 频道关于风筝实验真实情况的解读——纠正常见的错误叙述（\"被电劈\"等），还原 Franklin 1752 年实际做了什么。",
      "PBS \"Be Smart\" explainer on the actual kite experiment — correcting common myths (the \"struck by lightning\" version) and recovering what Franklin really did in 1752.",
      { primary: true }),
  },
]);

// Add new Franklin event for autobiography (he wrote it 1771-1790 in pieces)
applyNewEvents("franklin", [
  {
    id: "franklin-1771-autobiography-begun",
    person_id: "franklin",
    date: "1771-01-01",
    date_precision: "year",
    type: "writing",
    title: "开始撰写《本杰明·富兰克林自传》",
    title_en: "Begins writing *The Autobiography of Benjamin Franklin*",
    summary: "1771 年 Franklin 在英国 Twyford 开始为儿子 William 撰写自传——之后 19 年间断断续续写作，最终未完成（写到 1757 年的事情）。1791 年他去世后第一卷在巴黎以法文出版，完整英文版直到 1868 年才出版。这本书后来被认为是美式自我塑造叙事的奠基之作。",
    summary_en: "Franklin began writing his autobiography in 1771 at Twyford, England, originally as letters to his son William. Worked on it intermittently for 19 years, never finishing (events run only to 1757). After his death in 1791, the first volume appeared in Paris in French; the complete English edition only appeared in 1868. The book is considered the foundational text of the American self-made narrative.",
    location: "Twyford, England (initially)",
    key: true,
    tags: ["自传", "写作", "美国精神"],
    sources: [
      a("archive-franklin-autobio-librivox", "franklin_autobio_gg_librivox",
        "The Autobiography of Benjamin Franklin (LibriVox audiobook)",
        "LibriVox 公共领域有声书完整版（Frank Woodworth Pine 编辑版本，由 Gary Gilberd 朗读）。",
        "Complete LibriVox public-domain audiobook (Frank Woodworth Pine edition, read by Gary Gilberd).",
        { primary: true, license: "public-domain" }),
    ],
  },
]);

// === Rockefeller ===
// Add Tarbell's "History of Standard Oil" 1902-1904 as a new event (the muckraking
// that led to the 1911 Supreme Court breakup)
applyNewEvents("rockefeller", [
  {
    id: "rockefeller-1902-tarbell-mcclures",
    person_id: "rockefeller",
    date: "1902-11-01",
    date_precision: "month",
    type: "other",
    title: "Ida Tarbell 在 McClure's 杂志连载《Standard Oil 史》",
    title_en: "Ida Tarbell publishes \"History of the Standard Oil Company\" in McClure's",
    summary: "1902-1904 年间，调查记者 Ida Tarbell 在 McClure's 杂志连载 19 篇《Standard Oil 公司史》（后于 1904 年结集出版）。她系统揭露 Standard Oil 通过铁路退款、价格倾轧、间谍网络等手段消灭对手的全过程——是美国新闻史上最具影响力的调查报道之一，直接促成了 1911 年最高法院反垄断判决。",
    summary_en: "From 1902-1904, investigative journalist Ida Tarbell published a 19-part series \"History of the Standard Oil Company\" in McClure's magazine (collected as a book in 1904). She systematically exposed how Standard Oil eliminated competitors through railroad rebates, predatory pricing, and a spy network — one of the most influential investigative reports in American journalism, directly leading to the 1911 Supreme Court antitrust ruling.",
    location: "McClure's Magazine, New York, NY",
    key: true,
    tags: ["调查新闻", "Ida Tarbell", "McClure's", "反垄断"],
    sources: [
      a("archive-tarbell-standard-oil-vol1", "standardoil_volume1_tw_librivox",
        "The History of the Standard Oil Company: Volume 1 (LibriVox)",
        "LibriVox 朗读 Tarbell 《Standard Oil 史》第一卷完整版。",
        "Full LibriVox audiobook of Tarbell's *History of the Standard Oil Company*, Volume 1.",
        { primary: true, license: "public-domain" }),
    ],
  },
]);

console.log("\nAll done.");
