#!/usr/bin/env node
/**
 * Final follow-ups:
 *  - Munger 2003 UCSB "Academic Economics" — add Wayback PDF + fs.blog article (text-only event)
 *  - Yang 2021-09-22 centennial speech "但愿人长久,千里共同途" — new event with Bilibili embed
 *  - Franklin Ken Burns 2022 PBS doc — new event with YouTube trailer + PBS direct page
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

// === Munger 2003 UCSB ===
{
  const events = loadEvents("munger");
  const e = events.find((x) => x.id === "munger-2003-10-03-academic-economics");
  if (!e) console.error("MISS munger-2003-10-03-academic-economics");
  else {
    const adds = [
      // Wayback PDF — primary source for hosted text
      {
        id: "wayback-munger-ucsb-2003-pdf",
        url: "https://web.archive.org/web/2024/https://www.tilsonfunds.com/MungerUCSBspeech.pdf",
        kind: "document",
        title: "\"Academic Economics: Strengths and Faults After Considering Interdisciplinary Needs\" — Munger UCSB Oct 3, 2003 (PDF, Wayback)",
        publisher: "Tilson Funds (via Wayback Machine)",
        lang: "en",
        primary: true,
        license: "all-rights-reserved",
        authored_by: "human",
        mentions: [],
        summary: "Munger 2003 年 10 月 3 日加州大学圣芭芭拉分校经济学讲座完整 PDF 文字稿——批判主流经济学的 9 大缺陷，包括对心理学的忽视、过度数学化、对\"有效市场假说\"的盲信。Tilson Funds 服务器目前 301 循环，但 Wayback 上 200 可读。",
        summary_en: "Full PDF text of Munger's October 3, 2003 lecture at UC Santa Barbara — a critique of mainstream economics's nine biggest faults, including the neglect of psychology, over-mathematization, and blind faith in the efficient-markets hypothesis. The Tilson Funds server currently 301-loops; the Wayback copy returns 200.",
      },
      // fs.blog article version with editorial summary
      {
        id: "fsblog-munger-academic-economics",
        url: "https://fs.blog/great-talks/academic-economics/",
        kind: "transcript",
        title: "Academic Economics: Strengths and Faults | Charlie Munger | Farnam Street",
        publisher: "Farnam Street (fs.blog)",
        lang: "en",
        primary: false,
        license: "all-rights-reserved",
        authored_by: "human",
        mentions: [],
        summary: "Farnam Street 整理的 Munger UCSB 演讲文字稿——分章节标题，便于阅读。",
        summary_en: "Farnam Street's reformatted transcript of the Munger UCSB lecture, with section headings for easier reading.",
        wayback: {
          snapshot_url: "https://web.archive.org/web/2024if_/https://fs.blog/great-talks/academic-economics/",
          timestamp: "2024",
        },
        quotes: [
          {
            text: "I have heard Warren say a half a dozen times, 'It's not greed that drives the world, but envy.'",
            text_zh: "我听 Warren 说过六七次：\"驱动这个世界的不是贪婪，是嫉妒。\"",
            speaker: "Charlie Munger",
            context: "UCSB 2003 演讲中关于经济学忽视嫉妒这一基本人性的著名论断",
          },
          {
            text: "What good is economic theory that won't predict, like medicine that won't cure, like rockets that won't fly?",
            text_zh: "一个不能做出预测的经济学理论，有什么用？就像不能治病的医学、飞不起来的火箭。",
            speaker: "Charlie Munger",
            context: "对经济学过度数学化但无法预测的批判",
          },
        ],
      },
    ];
    e.sources = e.sources || [];
    let added = 0;
    for (const s of adds) {
      if (!e.sources.find((x) => x.id === s.id)) {
        e.sources.push(s);
        added++;
        console.log(`+ munger src ${s.id} → ${e.id}`);
      }
    }
    saveEvents("munger", events);
  }
}

// === Yang 2021 centennial speech ===
{
  const events = loadEvents("yang");
  const newE = {
    id: "yang-2021-09-22-tsinghua-centennial",
    person_id: "yang",
    date: "2021-09-22",
    date_precision: "day",
    type: "speech",
    title: "清华大学百岁庆生：\"但愿人长久，千里共同途\"",
    title_en: "Tsinghua 100th Birthday Speech: \"May we share the same road for a thousand miles\"",
    summary: "2021 年 9 月 22 日，清华大学为杨振宁举办百岁生日庆典。杨振宁在演讲中回顾与同窗、与好友邓稼先、与已故妻子杜致礼的相处，并引用 1971 年回国时邓稼先信中的一句话\"但愿人长久，千里共同途\"作为对中国与世界的祝福。这是他生前最重要的一次公开演讲。",
    summary_en: "On September 22, 2021, Tsinghua University held a 100th-birthday celebration for Yang Chen-Ning. In his speech, Yang reflected on his peers, his late friend Deng Jiaxian, and his late wife Du Zhili, and quoted Deng's 1971 farewell letter — \"May we share the same road for a thousand miles\" — as a blessing for China and the world. This was his most important public address before his death.",
    location: "Tsinghua University, Beijing, China",
    key: true,
    tags: ["清华", "百岁演讲", "邓稼先", "经典"],
    sources: [
      {
        id: "bilibili-yang-centennial",
        url: "https://www.bilibili.com/video/BV1LR4y1p757",
        kind: "video",
        title: "杨振宁百岁演讲：但愿人长久，千里共同途",
        publisher: "Bilibili",
        lang: "zh",
        duration_sec: 347,
        primary: true,
        license: "all-rights-reserved",
        authored_by: "human",
        mentions: [],
        summary: "杨振宁百岁演讲完整录像（约 6 分钟），Bilibili 上传。",
        summary_en: "Full ~6-minute video of Yang's 100th-birthday speech, uploaded on Bilibili.",
        quotes: [
          {
            text: "稼先，1971 年那封信里你写：'但愿人长久，千里共同途'。50 年了——50 年后我可以跟你说，我懂你的意思了，'共同途'。",
            text_zh: "稼先，1971 年那封信里你写：\"但愿人长久，千里共同途\"。50 年了——50 年后我可以跟你说，我懂你的意思了，\"共同途\"。",
            speaker: "Chen-Ning Yang",
            context: "百岁演讲核心一句：对邓稼先 1971 年告别信的迟到 50 年的回应",
          },
        ],
      },
    ],
  };
  if (!events.find((x) => x.id === newE.id)) {
    events.push(newE);
    console.log(`+ yang event ${newE.id}`);
  }
  saveEvents("yang", events);
}

// === Franklin Ken Burns 2022 ===
{
  const events = loadEvents("franklin");
  const newE = {
    id: "franklin-2022-04-04-ken-burns-pbs",
    person_id: "franklin",
    date: "2022-04-04",
    date_precision: "day",
    type: "other",
    title: "Ken Burns 4 集 PBS 纪录片《本杰明·富兰克林》首播",
    title_en: "Ken Burns 4-Part PBS Documentary \"Benjamin Franklin\" Premieres",
    summary: "2022 年 4 月 4 日，Ken Burns 制作的 4 小时 PBS 纪录片《Benjamin Franklin》首播。Ken Burns 用经典的纪录片手法（信件原文朗读、专家访谈、历史绘画扫描）系统重述富兰克林一生。这是过去 50 年最权威的富兰克林视觉传记。",
    summary_en: "On April 4, 2022, Ken Burns's 4-hour PBS documentary *Benjamin Franklin* premiered. Burns uses his classic documentary form — letter readings, expert interviews, historical-painting scans — to systematically re-tell Franklin's life. The most authoritative Franklin visual biography of the past 50 years.",
    location: "PBS",
    key: true,
    tags: ["Ken Burns", "PBS", "纪录片", "传记"],
    sources: [
      {
        id: "youtube-ken-burns-trailer",
        url: "https://www.youtube.com/watch?v=v7wowg6Fy4I",
        kind: "video",
        title: "Benjamin Franklin | Official Trailer | PBS | A Film by Ken Burns",
        publisher: "PBS",
        lang: "en",
        duration_sec: 150,
        primary: true,
        license: "all-rights-reserved",
        authored_by: "human",
        mentions: [],
        summary: "PBS 官方频道发布的 Ken Burns 富兰克林纪录片预告片。",
        summary_en: "PBS's official trailer for the Ken Burns Benjamin Franklin documentary.",
      },
      {
        id: "pbs-franklin-episode-1",
        url: "https://www.pbs.org/video/episode-1-join-or-die-1706-1774-8ssna3/",
        kind: "video",
        title: "Benjamin Franklin | \"Join or Die\" (1706-1774) | Episode 1 | PBS",
        publisher: "PBS",
        lang: "en",
        primary: false,
        license: "all-rights-reserved",
        authored_by: "human",
        mentions: [],
        summary: "纪录片第一集 \"Join or Die\"（1706-1774）官方完整版。在 PBS 站内可看（不嵌入第三方）。",
        summary_en: "Official full Episode 1 \"Join or Die\" (1706-1774). Available to watch on the PBS site (not third-party embedded).",
        wayback: {
          snapshot_url: "https://web.archive.org/web/2024if_/https://www.pbs.org/video/episode-1-join-or-die-1706-1774-8ssna3/",
          timestamp: "2024",
        },
      },
      {
        id: "pbs-franklin-series-page",
        url: "https://www.pbs.org/kenburns/benjamin-franklin/",
        kind: "article",
        title: "Benjamin Franklin — A Film by Ken Burns | PBS",
        publisher: "PBS",
        lang: "en",
        primary: false,
        license: "all-rights-reserved",
        authored_by: "human",
        mentions: [],
        summary: "Ken Burns 富兰克林纪录片官方主页（含演员表、采访名单、历史顾问等元数据）。",
        summary_en: "Official Ken Burns Benjamin Franklin documentary main page (cast, interview list, historical advisors metadata).",
        wayback: {
          snapshot_url: "https://web.archive.org/web/2024if_/https://www.pbs.org/kenburns/benjamin-franklin/",
          timestamp: "2024",
        },
      },
    ],
  };
  if (!events.find((x) => x.id === newE.id)) {
    events.push(newE);
    console.log(`+ franklin event ${newE.id}`);
  }
  saveEvents("franklin", events);
}

console.log("\nAll done.");
