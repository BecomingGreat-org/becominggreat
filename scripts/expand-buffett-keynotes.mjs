#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "events", "buffett.json");
const events = JSON.parse(fs.readFileSync(FILE, "utf8"));

const a = (id, archiveId, title, summary, summary_en, opts = {}) => ({
  id, url: `https://archive.org/details/${archiveId}`, kind: "video",
  title, publisher: "Internet Archive", lang: "en",
  duration_sec: opts.duration_sec ?? null, primary: opts.primary ?? true,
  summary, summary_en, license: "all-rights-reserved", authored_by: "human", mentions: [],
  ...(opts.quotes ? { quotes: opts.quotes } : {}),
});
const y = (id, ytId, title, pub, summary, summary_en, opts = {}) => ({
  id, url: `https://www.youtube.com/watch?v=${ytId}`, kind: "video",
  title, publisher: pub, lang: "en",
  duration_sec: opts.duration_sec ?? null, primary: opts.primary ?? false,
  summary, summary_en, license: "all-rights-reserved", authored_by: "human", mentions: [],
  ...(opts.quotes ? { quotes: opts.quotes } : {}),
});

const ADD = [
  // 2003 annual meeting (2 parts)
  { eventId: "buffett-2003-annual-meeting-classic", src: y("youtube-berk-2003-pt1", "-_VaKBEPLlY", "Warren Buffett: 2003 Berkshire Hathaway Annual Meeting Part 1", "Hioim", "2003 年伯克希尔股东大会经典 Q&A 完整录像第一部分。", "Full first half of the 2003 Berkshire annual meeting Q&A.", { primary: true }) },
  { eventId: "buffett-2003-annual-meeting-classic", src: y("youtube-berk-2003-pt2", "jcW_WzYBtHs", "Warren Buffett: 2003 Berkshire Hathaway Annual Meeting Part 2", "Hioim", "2003 年伯克希尔股东大会第二部分。", "Second half of the 2003 Berkshire annual meeting.") },
  // 2008 financial crisis
  { eventId: "buffett-2008-financial-crisis", src: y("youtube-2008-crisis", "pWv8am4kSQQ", "Warren Buffett Talks Effects Of 2008 Financial Crisis | CNBC", "CNBC", "2008 金融危机期间巴菲特对市场和\"Buy American. I Am.\"那篇社论的电视访谈。", "CNBC interview with Buffett during the 2008 crisis on the market and his \"Buy American. I Am.\" op-ed.", { primary: true }) },
  // 2010 Giving Pledge
  { eventId: "buffett-2010-giving-pledge", src: y("youtube-giving-pledge-joint", "SwdpmnPLgp4", "Warren Buffett, Bill Gates - Giving Pledge", "Value Investors Portal", "巴菲特和盖茨共同宣布 Giving Pledge 时的发布会片段。两人承诺把绝大部分财富捐给慈善。", "Joint Buffett-Gates Giving Pledge announcement clip — both pledging the vast majority of their wealth to philanthropy.", { primary: true }) },
  { eventId: "buffett-2010-giving-pledge", src: y("youtube-giving-pledge-buffett-solo", "xMJKGGENMUA", "The Giving Pledge: Warren Buffett", "ABC News", "ABC News 关于 Giving Pledge 的巴菲特独立访谈。", "ABC News standalone Buffett interview about the Giving Pledge.") },
  // 2018 annual meeting
  { eventId: "buffett-2018-berkshire-annual-meeting", src: y("youtube-berk-2018", "Ih399RCTV2k", "Warren Buffett: 2018 Berkshire Hathaway Annual Meeting", "Hioim", "2018 年伯克希尔股东大会完整录像（约 6 小时 Q&A）。", "Full 2018 Berkshire annual meeting (about 6-hour Q&A).", { primary: true }) },
  // 2019 CNBC Becky Quick (Feb 25 — exact day match)
  { eventId: "buffett-2019-cnbc-becky-quick", src: y("youtube-cnbc-becky-2019", "Pqc56crs56s", "CNBC's Becky Quick interviews Warren Buffett (2/25/19)", "CNBC Television", "2019 年 2 月 25 日 Becky Quick 在 Squawk Box 节目上对巴菲特的年度专访。讨论 Kraft Heinz 减记的教训、长期价值投资、伯克希尔 50 年回顾。", "Becky Quick's annual Squawk Box interview with Buffett, Feb 25, 2019. Topics: lessons from the Kraft Heinz writedown, long-term value investing, Berkshire's 50-year retrospective.", { primary: true }) },
  // HBO Becoming
  { eventId: "buffett-2017-hbo-becoming", src: a("archive-hbo-becoming-clip", "youtube-pKWN0YFf_14", "Investing Style and Strategy: From HBO's \"Becoming Warren Buffett\"", "巴菲特 HBO 纪录片中关于投资风格的精选片段。", "Investing-style segment from the HBO Buffett doc.") },
];

const NEW = [
  // 1998 University of Florida MBA talk (subagent confirmed actual date 1998-10-15)
  { id: "buffett-1998-10-15-uf-mba", person_id: "buffett", date: "1998-10-15", date_precision: "day", type: "speech", title: "佛罗里达大学 MBA 演讲", title_en: "University of Florida MBA Talk", summary: "巴菲特在佛罗里达大学商学院对 MBA 学生的著名讲座（约 90 分钟），是研究他价值投资思维方式的经典材料。讨论 Long-Term Capital Management 倒下、为什么不投科技股、以及他对\"能力圈\"的定义。", summary_en: "Buffett's famous ~90-minute lecture to MBA students at the University of Florida Business School — a classic resource for studying his value-investing mindset. Topics: the LTCM collapse, why he avoids tech stocks, and his definition of the \"circle of competence.\"", location: "Gainesville, FL", key: true, tags: ["University of Florida", "MBA", "讲座", "价值投资"], sources: [y("youtube-uf-1998", "7Z6x-Ov1smU", "Warren Buffett | Lecture | University Of Florida | 1998", "Investor Archive", "佛罗里达大学 MBA 讲座完整录像。", "Full UF MBA lecture recording.", { primary: true })] },
  // 1998 University of Washington with Gates
  { id: "buffett-1998-uw-with-gates", person_id: "buffett", date: "1998-07-01", date_precision: "month", type: "speech", title: "华盛顿大学讲座（与盖茨同台）", title_en: "University of Washington Lecture (with Bill Gates)", summary: "1998 年华盛顿大学，巴菲特和当时仍是微软 CEO 的盖茨同台与学生对话。两人都还相对年轻——这是他们最早一批公开同框的视频之一。", summary_en: "1998 University of Washington joint conversation with students. Buffett and a then-still-CEO Bill Gates on stage together — one of the earliest public joint appearances of the two on video.", location: "Seattle, WA", tags: ["University of Washington", "Bill Gates", "讲座"], sources: [y("youtube-uw-1998", "R8VBTd2R9nE", "Warren Buffett | Bill Gates | Lecture | University Of Washington | 1998", "Investor Archive", "1998 年华盛顿大学巴菲特与盖茨同台讲座完整录像。", "Full 1998 UW joint lecture recording.", { primary: true })] },
  // 1999 Nebraska Educational Forum
  { id: "buffett-1999-nebraska-edu-forum", person_id: "buffett", date: "1999-01-01", date_precision: "year", type: "speech", title: "内布拉斯加教育论坛", title_en: "Nebraska Educational Forum", summary: "1999 年内布拉斯加教育论坛对巴菲特的访谈。互联网泡沫高峰期间，巴菲特依然坚持自己\"不懂的不投\"的纪律——这场对话之后两年，他被验证是对的。", summary_en: "1999 Nebraska Educational Forum interview with Buffett. At the height of the dot-com bubble, Buffett held firm on his \"don't invest in what you don't understand\" discipline — vindicated two years later.", location: "Nebraska, USA", tags: ["Nebraska", "讲座", "互联网泡沫"], sources: [y("youtube-nebraska-1999", "HM9h9t1vpIE", "Warren Buffett | Lecture | Nebraska Educational Forum | 1999", "Investor Archive", "1999 内布拉斯加教育论坛巴菲特讲座完整录像。", "Full 1999 Nebraska Educational Forum Buffett lecture.", { primary: true })] },
  // 2001 University of Georgia
  { id: "buffett-2001-uga-terry", person_id: "buffett", date: "2001-07-18", date_precision: "day", type: "speech", title: "乔治亚大学 Terry 商学院讲座", title_en: "University of Georgia Terry College Lecture", summary: "2001 年 7 月乔治亚大学 Terry 商学院讲座，互联网泡沫已破灭。巴菲特和学生讨论判断管理层的方法、保险业的根本逻辑、以及为什么\"投资就是延迟消费\"。", summary_en: "July 2001 lecture at the Terry College of Business, after the dot-com crash. Buffett discusses how to judge management, the fundamentals of the insurance business, and why \"investing is just deferred consumption.\"", location: "Athens, GA", tags: ["University of Georgia", "Terry College", "讲座"], sources: [y("youtube-uga-2001", "yM_XK72lnaM", "Buffett 2001 Speech at University of Georgia", "Sharing Investing Wisdom", "乔治亚大学 2001 巴菲特讲座完整录像。", "Full 2001 UGA Buffett lecture recording.", { primary: true })] },
  // 2005 University of Nebraska with Gates
  { id: "buffett-2005-unl-with-gates", person_id: "buffett", date: "2005-09-30", date_precision: "day", type: "speech", title: "内布拉斯加大学 Lincoln 校区讲座（与盖茨同台）", title_en: "UNL Lecture (with Bill Gates)", summary: "2005 年 9 月 30 日，巴菲特和盖茨共同回到内布拉斯加大学 Lincoln 校区与学生对话。两个人都已经是慈善家身份的强信号——五年后他们一起发起 Giving Pledge。", summary_en: "September 30, 2005: Buffett and Gates jointly returned to UNL to converse with students. Both already showing strong signals of their philanthropist phase — five years before launching the Giving Pledge together.", location: "Lincoln, NE", tags: ["UNL", "Bill Gates", "讲座"], sources: [y("youtube-unl-2005", "1AlPTiJrJnE", "Warren Buffett | Bill Gates | Lecture | University Of Nebraska | 2005", "Investor Archive", "2005 UNL 巴菲特+盖茨讲座完整录像。", "Full 2005 UNL Buffett+Gates lecture.", { primary: true })] },
  // 2006 Charlie Rose
  { id: "buffett-2006-07-10-charlie-rose", person_id: "buffett", date: "2006-07-10", date_precision: "day", type: "interview", title: "Charlie Rose 专访（捐赠盖茨基金会两周后）", title_en: "Charlie Rose Interview (two weeks after pledging to Gates Foundation)", summary: "2006 年 7 月 10 日 Charlie Rose 节目专访。距离巴菲特宣布把绝大部分财富捐给盖茨基金会刚两周——他在节目里第一次完整解释这个决定的逻辑。", summary_en: "July 10, 2006 Charlie Rose interview, just two weeks after Buffett pledged the majority of his wealth to the Gates Foundation. The first full public explanation of the decision's logic.", location: "PBS Studio, New York, NY", tags: ["Charlie Rose", "慈善", "盖茨基金会"], sources: [y("youtube-charlie-rose-2006", "Gm1FqNO4taM", "Warren Buffett | Charlie Rose | Pt. 1 | July 10, 2006", "Investor Archive", "Charlie Rose 2006-07-10 节目第一部分。", "Charlie Rose July 10, 2006 Part 1.", { primary: true })] },
  // 2017 Columbia with Gates (also exists in Gates page as `gates-2017-01-27-columbia-buffett`)
  { id: "buffett-2017-01-27-columbia-with-gates", person_id: "buffett", date: "2017-01-27", date_precision: "day", type: "interview", title: "哥伦比亚大学：与盖茨、Charlie Rose 同台", title_en: "Columbia University: Joint Talk with Gates and Charlie Rose", summary: "在哥伦比亚商学院由 Charlie Rose 主持，巴菲特与盖茨同台。两人长期友谊、Giving Pledge 进展、与下一代的对话——是两位老朋友少见的公开同框访谈。", summary_en: "At Columbia Business School, Charlie Rose hosts a joint conversation between Buffett and Gates. Topics: their long friendship, Giving Pledge progress, and a dialogue with the next generation. A rare on-camera joint appearance.", location: "Columbia Business School, New York, NY", tags: ["Columbia", "Bill Gates", "Charlie Rose", "Giving Pledge"], sources: [y("youtube-columbia-2017", "uR5tFkncS0g", "Warren Buffett | Bill Gates | Lecture | Columbia University | January 27, 2017", "Investor Archive", "2017 年哥伦比亚商学院巴菲特+盖茨+Charlie Rose 同台访谈完整录像。", "Full Jan 27, 2017 Columbia Business School Buffett+Gates+Charlie Rose conversation.", { primary: true })] },
  // 2012 Daily Show with Jon Stewart
  { id: "buffett-2012-12-03-daily-show", person_id: "buffett", date: "2012-12-03", date_precision: "day", type: "interview", title: "The Daily Show with Jon Stewart：与 Carol Loomis 同场", title_en: "The Daily Show with Jon Stewart (with Carol Loomis)", summary: "Jon Stewart 主持的 Daily Show 上巴菲特与 Fortune 资深记者、《Tap Dancing to Work》编辑 Carol Loomis 同场访谈。讨论 Buffett 与 Loomis 几十年的友谊、Loomis 编辑的巴菲特致股东信精华本。", summary_en: "Jon Stewart's Daily Show with Buffett alongside Fortune senior writer and *Tap Dancing to Work* editor Carol Loomis. Discusses the decades-long Buffett-Loomis friendship and Loomis's edited collection of Buffett's shareholder letters.", location: "Comedy Central Studios, New York, NY", tags: ["Daily Show", "Jon Stewart", "Carol Loomis"], sources: [a("archive-daily-show-2012", "COM_20121204_033000_The_Daily_Show_With_Jon_Stewart", "The Daily Show With Jon Stewart — Dec 3, 2012", "巴菲特和 Carol Loomis 在 Jon Stewart 节目上的完整片段。", "Full Daily Show segment with Buffett and Carol Loomis.", { primary: true })] },
  // 2019 March Becky Quick supplemental
  { id: "buffett-2019-03-28-cnbc-quick", person_id: "buffett", date: "2019-03-28", date_precision: "day", type: "interview", title: "CNBC Becky Quick 春季访谈", title_en: "CNBC Becky Quick Spring Interview", summary: "2019 年 3 月 28 日 Becky Quick 在 Gatehouse 午餐会期间对巴菲特的访谈，是同年 5 月 Berkshire 三人组（巴菲特+芒格+盖茨）访谈的预演。", summary_en: "March 28, 2019 Becky Quick lunch interview with Buffett — preceded the May trio interview with Buffett, Munger, and Gates.", location: "Omaha, NE", tags: ["CNBC", "Becky Quick"], sources: [y("youtube-cnbc-2019-march", "Q5UAyHhlFCs", "Warren Buffett Speaks With CNBC's Becky Quick — Thursday, March 28", "CNBC Television", "Becky Quick 2019 年 3 月 28 日访谈完整录像。", "Full March 28, 2019 Becky Quick interview.", { primary: true })] },
  // 2019 May trio (Buffett+Munger+Gates)
  { id: "buffett-2019-05-trio", person_id: "buffett", date: "2019-05-01", date_precision: "month", type: "interview", title: "CNBC 三人组访谈（巴菲特、芒格、盖茨）", title_en: "CNBC Trio Interview (Buffett, Munger, Gates)", summary: "2019 年伯克希尔股东大会期间，CNBC 的 Becky Quick 罕见地把巴菲特、芒格、盖茨三个人放在同一张桌子上。三人讨论 Apple、能源、AI 早期、政治。", summary_en: "During the 2019 Berkshire weekend, CNBC's Becky Quick rarely put Buffett, Munger, and Gates around one table. The three discussed Apple, energy, early AI, and politics.", location: "Omaha, NE", key: true, tags: ["CNBC", "Munger", "Bill Gates"], sources: [y("youtube-cnbc-trio-2019", "y-zxUrZJ7-o", "2019 interview with Warren Buffett, Charlie Munger, & Bill Gates by Becky Quick from CNBC", "BelfortPitches", "2019 年 CNBC 巴菲特+芒格+盖茨三人组访谈完整录像。", "Full 2019 CNBC trio interview.", { primary: true })] },
  // Charlie Rose Global Conversation
  { id: "buffett-charlie-rose-global", person_id: "buffett", date: "2009-11-12", date_precision: "day", type: "interview", title: "Charlie Rose Global Conversation：关于美国、生活与金钱", title_en: "Charlie Rose Global Conversation: On America, Life and Money", summary: "Charlie Rose 制作的 Global Conversation 系列对巴菲特的深度访谈。比标准 Charlie Rose 节目更长、更哲学，关注的是巴菲特对国家、社会、生活的整体观点。", summary_en: "A Charlie Rose Global Conversation deep-dive Buffett interview — longer and more philosophical than the standard Charlie Rose show, focused on his comprehensive views on country, society, and life.", location: "PBS Studio, New York, NY", tags: ["Charlie Rose", "Global Conversation"], sources: [y("youtube-rose-global", "qlBAs-45cFg", "Warren Buffett on America, Life and Money. A Charlie Rose Global Conversation", "Charlie Rose", "Charlie Rose Global Conversation 系列巴菲特专辑完整录像。", "Full Charlie Rose Global Conversation Buffett episode.", { primary: true })] },
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
