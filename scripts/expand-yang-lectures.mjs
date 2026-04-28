#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "events", "yang.json");
const events = JSON.parse(fs.readFileSync(FILE, "utf8"));

const y = (id, ytId, title, pub, summary, summary_en, opts = {}) => ({
  id, url: `https://www.youtube.com/watch?v=${ytId}`, kind: "video",
  title, publisher: pub, lang: opts.lang || "en",
  duration_sec: opts.duration_sec ?? null, primary: opts.primary ?? false,
  summary, summary_en, license: "all-rights-reserved", authored_by: "human", mentions: [],
  ...(opts.quotes ? { quotes: opts.quotes } : {}),
});

const ADD = [
  { eventId: "yang-1957-nobel-prize", src: y("youtube-nobel-lecture", "7KzGOcOMUC4", "Chen Ning Yang's Nobel Lecture", "Spin Electron", "杨振宁 1957 年诺贝尔物理学奖获奖演讲文字版的录音再现，主题为对称性定律与宇称不守恒。", "Audio reading of Yang's 1957 Nobel Prize lecture text — on symmetry laws and parity non-conservation.", { primary: true }) },
  { eventId: "yang-1954-yang-mills-theory", src: y("youtube-yang-mills-clip", "JZqwP7b2kJY", "Chen-Ning Yang: Paper with Mills on Gauge theories", "Simons Foundation", "Simons Foundation Science Lives 系列对杨振宁的访谈片段——杨亲自讲述 1954 年与 Robert Mills 合作发表 Yang-Mills 论文的过程，以及 Pauli 当时的反应。", "Simons Foundation Science Lives interview clip — Yang personally recounts the 1954 Yang-Mills paper with Robert Mills, including Pauli's reaction.", { primary: true }) },
  { eventId: "yang-2003-tsinghua-return", src: y("youtube-tsinghua-classroom", "GG1r6SzL34Q", "杨振宁清华课堂讲《普通物理》", "大汪观世界", "回到清华后亲自为本科生讲授普通物理课的珍贵课堂录像。学生没想到老师是杨振宁本人。", "Rare classroom footage of Yang teaching general physics to undergraduates after his return to Tsinghua. The students had no idea their professor would be Yang himself.", { primary: true, lang: "zh" }) },
  { eventId: "yang-2025-10-18-death", src: y("youtube-cgtn-obit", "JZGN-HGU4fw", "Nobel laureate physicist Chen Ning Yang dies at 103", "CGTN", "CGTN 关于杨振宁 2025 年 10 月 18 日辞世的英文讣告报道。", "CGTN's English obituary report on Yang's death, October 18, 2025.", { primary: true }) },
  { eventId: "yang-2025-10-18-death", src: y("youtube-tsinghua-tribute", "3_NUtCs4aSY", "Tsinghua Community Pays Tribute to Professor Chen Ning Yang", "Tsinghua University", "清华大学社区追悼杨振宁先生的纪念视频。", "Tsinghua University's official memorial video for Professor Yang.") },
];

const NEW = [
  // 1991 McGill Beatty Lecture
  { id: "yang-1991-03-05-mcgill-beatty", person_id: "yang", date: "1991-03-05", date_precision: "day", type: "speech", title: "麦吉尔大学 Beatty 纪念讲座：《对称性与物理》", title_en: "McGill University Beatty Memorial Lecture: \"Symmetry and Physics\"", summary: "1991 年 3 月 5 日，杨振宁应邀在加拿大麦吉尔大学发表 Beatty 纪念讲座（McGill 最负盛名的演讲系列之一），题为\"Symmetry and Physics\"——这是他罕见的、面向通识听众系统讲述对称性如何贯穿现代物理学的英文演讲。", summary_en: "On March 5, 1991, Yang delivered the prestigious Beatty Memorial Lecture at McGill University in Canada, titled \"Symmetry and Physics\" — a rare English-language general-audience talk where he systematically explained how symmetry runs through modern physics.", location: "McGill University, Montreal, Canada", key: true, tags: ["Beatty Lecture", "McGill", "对称性", "物理学"], sources: [y("youtube-mcgill-1991", "PMKrvz5OlbI", "1991 Beatty Memorial Lecture - Yang Chen-Ning", "McGill University", "1991 年麦吉尔大学 Beatty 纪念讲座完整录像。", "Full 1991 McGill Beatty Memorial Lecture.", { primary: true })] },
  // 2006 Stony Brook Masters Series solo
  { id: "yang-2006-stony-brook-masters", person_id: "yang", date: "2006-01-01", date_precision: "year", type: "interview", title: "Stony Brook 大师系列：杨振宁专访", title_en: "Stony Brook Masters Series: Yang Interview", summary: "杨振宁在 Stony Brook 大学（他作为 Albert Einstein Professor 任教 33 年）由 Bill Zimmerman 主持的深度访谈。讲述对称、规范理论、纤维丛、与 Robert Mills 合作的细节，以及他与 Wolfgang Pauli 的著名争论。", summary_en: "An in-depth interview with Yang at Stony Brook University (where he held the Albert Einstein Professorship for 33 years), hosted by Bill Zimmerman. Covers symmetry, gauge theory, fiber bundles, working with Robert Mills, and his famous Pauli encounter.", location: "Stony Brook University, NY", tags: ["Stony Brook", "Bill Zimmerman", "采访", "Yang-Mills"], sources: [y("youtube-stony-brook", "6d3hZ8jnqXg", "C. N. Yang: Stony Brook Masters Series", "Stony Brook University", "Stony Brook 大师系列杨振宁专访完整录像。", "Full Stony Brook Masters Series Yang interview.", { primary: true })] },
  // 2006 Stony Brook with Simons
  { id: "yang-2006-simons-joint-stony-brook", person_id: "yang", date: "2006-06-01", date_precision: "month", type: "interview", title: "Stony Brook 大师系列：与 James Simons 同台", title_en: "Stony Brook Masters Series: With James Simons", summary: "杨振宁与数学家、量化对冲基金 Renaissance Technologies 创始人 James Simons 在 Stony Brook 同台对谈。Simons 当时是 Stony Brook 数学系主任与杨振宁是几十年同事。两人讨论数学与物理学的边界、Chern-Simons 理论的故事。", summary_en: "Yang in joint conversation with mathematician James Simons (Renaissance Technologies founder) at Stony Brook, where Simons chaired the math department for decades alongside Yang. The two discuss the boundary between math and physics, including the story of Chern-Simons theory.", location: "Stony Brook University, NY", tags: ["Stony Brook", "James Simons", "数学", "物理"], sources: [y("youtube-simons-yang", "zVWlapujbfo", "James Simons and C.N. Yang: Stony Brook Masters Series", "Stony Brook University", "Stony Brook 大师系列杨振宁+Simons 同台访谈完整录像。", "Full Stony Brook Masters Series Yang+Simons joint interview.", { primary: true })] },
  // Macau students interview
  { id: "yang-macau-students-interview", person_id: "yang", date: "2010-01-01", date_precision: "year", type: "interview", title: "澳门大学《名人講》系列：給澳門學生的話", title_en: "Conversations with Celebrities (UMacau)", summary: "澳门大学《名人講》系列对杨振宁的专访（中文）——他向年轻一代讲述如何选择物理研究方向、求学经历，以及对中国年轻学生的建议。", summary_en: "Yang's Chinese-language interview in University of Macau's *Conversations with Celebrities* series — he addresses younger generations on how to choose research directions in physics, his own studies, and advice for Chinese students.", location: "University of Macau", tags: ["澳门", "采访", "中文"], sources: [y("youtube-macau-students", "7kM9MiaHV9E", "名人講：給澳門學生的話──諾貝爾獎得主楊振寧專訪", "University of Macau", "澳门大学杨振宁专访完整录像。", "Full University of Macau Yang interview.", { primary: true, lang: "zh" })] },
  // Modern Chinese reflection
  { id: "yang-china-physics-reflection", person_id: "yang", date: "2023-01-01", date_precision: "year", type: "interview", title: "杨振宁讲透物理学精髓与人生", title_en: "Yang on the Essence of Physics and His Life", summary: "中文媒体整理的杨振宁晚年访谈精华——讲透物理学的本质、与李政道分道扬镳、对中国教育与中美科教合作的反思，以及人生哲学。", summary_en: "A Chinese-media compilation of late-career Yang interview highlights — on the essence of physics, his split with T.D. Lee, reflections on Chinese education and US-China scientific cooperation, and his life philosophy.", location: "Compilation", tags: ["物理学", "李政道", "中国教育", "人生"], sources: [y("youtube-china-reflection", "4DpBj18Mn7E", "杨振宁：几句话讲透物理学精髓，也讲透自己的一生", "大汪观世界", "杨振宁晚年中文访谈精华合集。", "Compilation of late-career Chinese-language Yang interviews.", { primary: true, lang: "zh" })] },
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
