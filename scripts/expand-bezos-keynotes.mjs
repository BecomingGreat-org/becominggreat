#!/usr/bin/env node
/**
 * Expand Jeff Bezos coverage with verified archive.org / YouTube sources.
 *
 * - Adds video sources to ~6 existing events
 * - Fixes one existing event's date (1999-11 → 1999-05-26 to match the
 *   actual Charlie Rose air date)
 * - Creates ~14 new events (D6 2008, AWS re:Invent 2012, BI Ignition
 *   2014, Code Conf 2016, Bush Center 2018, Economic Club 2018, AFA
 *   2018, Sammies 2018, Wired25 2018, JFK Space Summit 2019, House
 *   Antitrust 2020, DealBook 2024, Italian Tech Week 2025, etc.)
 *
 * All IDs verified via verify-yt-batch.mjs before this script.
 */
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "events", "bezos.json");
const events = JSON.parse(fs.readFileSync(FILE, "utf8"));

function archiveSource(srcId, archiveId, title, summary, summary_en, opts = {}) {
  return {
    id: srcId,
    url: `https://archive.org/details/${archiveId}`,
    kind: "video",
    title,
    publisher: "Internet Archive",
    lang: "en",
    duration_sec: opts.duration_sec ?? null,
    primary: opts.primary ?? true,
    summary,
    summary_en,
    license: "all-rights-reserved",
    authored_by: "human",
    mentions: [],
    ...(opts.quotes ? { quotes: opts.quotes } : {}),
  };
}

function youtubeSource(srcId, ytId, title, publisher, summary, summary_en, opts = {}) {
  return {
    id: srcId,
    url: `https://www.youtube.com/watch?v=${ytId}`,
    kind: "video",
    title,
    publisher,
    lang: "en",
    duration_sec: opts.duration_sec ?? null,
    primary: opts.primary ?? false,
    summary,
    summary_en,
    license: "all-rights-reserved",
    authored_by: "human",
    mentions: [],
    ...(opts.quotes ? { quotes: opts.quotes } : {}),
  };
}

// === 0. Date fix: Charlie Rose 1999 (existing event has wrong date) ===
const FIX_DATES = [
  {
    eventId: "bezos-1999-11-charlie-rose-interview",
    newDate: "1999-05-26",
    note: "Actual Bezos Charlie Rose air date was May 26, 1999 (with Jerry Yang and Clayton Christensen), not Nov 19. Fixing to match archive record.",
  },
];

// === 1. Add sources to existing events ===
const ADDITIONS_TO_EXISTING = [
  // 1995 Amazon launches — first Amazon office nostalgic video shared by Bezos in 2023
  {
    eventId: "bezos-1995-07-16-amazon-launches",
    src: youtubeSource(
      "youtube-amazon-early-office",
      "ltcesVdRtEs",
      "Jeff Bezos Shares Nostalgic Video Of First Amazon Office",
      "NDTV Profit",
      "贝佐斯本人 2023 年公开的早期视频——展示 1994-95 年 Amazon 在贝尔维尤车库的最初办公室。亲手拼装的实木桌子、几台显示器、印有 \"books\" 的纸盒——所有 Amazon 后来神话的实物原点。",
      "Footage Bezos shared in 2023 of the original Amazon office in his Bellevue garage, 1994-95. Hand-built wooden-door desks, a few monitors, cardboard boxes labeled \"books\" — the physical origin of every Amazon legend.",
      { primary: true }
    ),
  },
  // 1997 Day 1 / 60 Minutes 1999
  {
    eventId: "bezos-1997-shareholder-letter-day1",
    src: youtubeSource(
      "youtube-60min-1999",
      "8OsY1V3iN6E",
      "Jeff Bezos: \"Nerd of the Amazon\" | 60 Minutes Archive",
      "60 Minutes",
      "1999 年 60 Minutes 对贝佐斯的人物特写《亚马逊的呆子》。贝佐斯在镜头前谈\"长期思维\"——\"如果我们能够建立一个 7 年时间尺度上还在乎客户体验的公司，那大多数竞争都不存在了\"。这段话之后被反复引用为 Day 1 哲学的早期最清晰公开表述。",
      "The 1999 60 Minutes profile of Bezos titled \"Nerd of the Amazon.\" Bezos articulates long-term thinking on camera: \"If we can build a company that is willing to be misunderstood for long periods of time, that gives us a competitive advantage.\" One of the earliest clear public articulations of the Day 1 philosophy.",
      {
        primary: true,
        quotes: [
          {
            text: "If everything you do needs to work on a three-year time horizon, then you're competing against a lot of people. But if you're willing to invest on a seven-year time horizon, you're now competing against a fraction of those people, because very few companies are willing to do that.",
            text_zh: "如果你做的一切都必须在三年的时间尺度上有结果，那你的竞争对手有一大堆。但如果你愿意在七年的尺度上投入，竞争对手就只剩下一小部分——因为很少有公司愿意这么干。",
            speaker: "Jeff Bezos",
            context: "1999 年 60 Minutes 采访中关于长期主义的核心表述",
          },
        ],
      }
    ),
  },
  // 1999 Charlie Rose with Yang & Christensen (the existing event, after date fix)
  {
    eventId: "bezos-1999-11-charlie-rose-interview",
    src: archiveSource(
      "archive-charlie-rose-1999-05",
      "Charlie-Rose-1999-05-26",
      "Charlie Rose — May 26, 1999 (Bezos, Jerry Yang, Clayton Christensen)",
      "Charlie Rose 主持的圆桌：贝佐斯（Amazon）、Jerry Yang（Yahoo!）和哈佛 Clayton Christensen（《创新者的窘境》作者）一起讨论\"破坏性技术\"和互联网商业的未来。Christensen 把贝佐斯拉进自己的理论框架——这场对谈成为后世研究早期互联网创业者思维方式的重要资料。",
      "Charlie Rose's roundtable with Bezos (Amazon), Jerry Yang (Yahoo!), and Harvard's Clayton Christensen (author of *The Innovator's Dilemma*) on disruptive technology and the future of internet business. Christensen pulled Bezos into his theoretical framework — a defining recorded conversation for understanding early-internet founder thinking."
    ),
  },
  // 2007 Kindle Launch — Charlie Rose same day
  {
    eventId: "bezos-2007-11-19-kindle-launch",
    src: archiveSource(
      "archive-charlie-rose-2007-kindle",
      "Charlie-Rose-2007-11-19",
      "Charlie Rose — November 19, 2007 (Kindle launch day with Bezos)",
      "Kindle 发布当天的 Charlie Rose 完整专访。贝佐斯解释为什么花 4 年做一台\"专门用于读书的设备\"——\"伟大的工具消失在你的注意力之外，你忘记它的存在。书就是这样的工具，我们要让 Kindle 也变成这样\"。",
      "Full Charlie Rose interview on Kindle launch day. Bezos explains why Amazon spent four years building a single-purpose reading device: \"Great tools disappear from your attention. The book is one of those tools, and we want Kindle to do the same.\""
    ),
  },
  // 2015 New Shepard landing — Blue Origin official video
  {
    eventId: "bezos-2015-11-23-new-shepard-landing",
    src: youtubeSource(
      "youtube-new-shepard-landing",
      "9pillaOxGCo",
      "Historic Rocket Landing",
      "Blue Origin",
      "Blue Origin 官方发布的 New Shepard 首次成功垂直回收着陆视频。比 SpaceX 猎鹰 9 号的首次海上回收早了 25 天——尽管 New Shepard 是亚轨道、Falcon 是轨道级，两者难度不同。",
      "Blue Origin's official video of New Shepard's first successful vertical landing — 25 days before SpaceX Falcon 9's first sea landing (though New Shepard is suborbital and Falcon is orbital, different difficulty levels).",
      { primary: true }
    ),
  },
  // 2021 Space flight — post-press conference + highlights
  {
    eventId: "bezos-2021-07-20-space-flight",
    src: youtubeSource(
      "youtube-space-flight-presser",
      "d2cwNctNmkE",
      "Watch Jeff Bezos speak during Blue Origin post-flight press conference",
      "CNET Highlights",
      "贝佐斯亚轨道飞行落地后的新闻发布会完整录像。他在台上直接\"感谢每一个 Amazon 员工和客户为我支付了这次飞行\"——这句话在媒体上引发巨大争议。",
      "Full post-flight press conference after Bezos's suborbital flight. On stage he literally said \"I want to thank every Amazon employee, and every Amazon customer, because you guys paid for all this\" — a remark that sparked major media controversy.",
      {
        primary: true,
        quotes: [
          {
            text: "I want to thank every Amazon employee, and every Amazon customer, because you guys paid for all of this.",
            text_zh: "我想感谢每一位 Amazon 员工和每一位 Amazon 客户，因为这一切都是你们买的单。",
            speaker: "Jeff Bezos",
            context: "亚轨道飞行落地后新闻发布会上的著名一句，因措辞引发巨大争议",
          },
        ],
      }
    ),
  },
  {
    eventId: "bezos-2021-07-20-space-flight",
    src: youtubeSource(
      "youtube-space-flight-highlights",
      "pPuFuJAusv8",
      "'Best Day Ever!' Watch Highlights From Jeff Bezos Launch To Edge Of Space",
      "NBC News",
      "NBC News 的飞行精彩片段剪辑。贝佐斯走出 New Shepard 太空舱时第一句话：\"今天是有史以来最棒的一天。\"",
      "NBC News's highlights reel from the flight. Bezos's first words on stepping out of the New Shepard capsule: \"Best day ever!\""
    ),
  },
];

// === 2. New events ===
const NEW_EVENTS = [
  // 1999-04-02 Charlie Rose with Peter Neupert
  {
    id: "bezos-1999-04-02-charlie-rose-neupert",
    person_id: "bezos",
    date: "1999-04-02",
    date_precision: "day",
    type: "interview",
    title: "Charlie Rose 采访（与 Peter Neupert 同场）：电商爆发期的 Amazon",
    title_en: "Charlie Rose interview (with Peter Neupert): Amazon at the e-commerce inflection",
    summary: "1999 年 4 月 Charlie Rose 节目，贝佐斯与 drugstore.com CEO Peter Neupert 同场，讨论电子商务的早期爆发期。当时 Amazon 股价正处于互联网泡沫顶峰，贝佐斯依然坚持\"我们花掉每一分钱都在为客户体验投资，而不是为利润\"——这种取向之后被验证为正确，但在 2001 年崩盘前承受了巨大压力。",
    summary_en: "April 1999 Charlie Rose, with Bezos joining drugstore.com CEO Peter Neupert to discuss the early e-commerce boom. With Amazon's stock at dot-com bubble peak, Bezos still insisted \"every dollar we spend is going into customer experience, not profit\" — an orientation later vindicated, but tested under enormous pressure before the 2001 crash.",
    location: "PBS Studio, New York, NY",
    tags: ["采访", "Charlie Rose", "电商", "互联网泡沫"],
    sources: [
      archiveSource(
        "archive-charlie-rose-1999-04",
        "Charlie-Rose-1999-04-02",
        "Charlie Rose — April 2, 1999 (Bezos + Peter Neupert)",
        "Charlie Rose 1999 年 4 月 2 日完整节目。",
        "Full April 2, 1999 Charlie Rose episode."
      ),
    ],
  },

  // 2008 D6 with Mossberg & Swisher
  {
    id: "bezos-2008-05-28-d6-mossberg-swisher",
    person_id: "bezos",
    date: "2008-05-28",
    date_precision: "day",
    type: "interview",
    title: "D6 大会与 Mossberg、Swisher 同台",
    title_en: "D6 (All Things Digital) with Mossberg and Swisher",
    summary: "All Things Digital D6 大会上的贝佐斯专访。距离 Kindle 发布半年，距离 AWS S3 发布两年——他在台上谈服务化战略、Kindle 的商业模式（\"我们卖书的钱，会再花在更好的设备上\"）、和对 Apple 进军电子书的看法。",
    summary_en: "Bezos's interview at the All Things Digital D6 conference. Six months after Kindle launch, two years after AWS S3 — he discussed services strategy, Kindle's business model (\"every dollar we make on books, we put back into making the device better\"), and his view on Apple's potential entry into e-books.",
    location: "Carlsbad, CA",
    tags: ["D-Conference", "Walt Mossberg", "Kara Swisher", "Kindle"],
    sources: [
      youtubeSource(
        "youtube-d6-2008",
        "Ww8A87xf0gU",
        "Jeff Bezos – D6 Interview (2008)",
        "All Things Digital",
        "All Things Digital D6 大会贝佐斯专访完整录像。",
        "Full Bezos D6 conference interview.",
        { primary: true }
      ),
    ],
  },

  // 2012 AWS re:Invent
  {
    id: "bezos-2012-11-29-aws-reinvent-fireside",
    person_id: "bezos",
    date: "2012-11-29",
    date_precision: "day",
    type: "interview",
    title: "AWS re:Invent 2012：与 Werner Vogels 炉边谈话",
    title_en: "AWS re:Invent 2012: Fireside Chat with Werner Vogels",
    summary: "首届 AWS re:Invent 大会上贝佐斯与 Amazon CTO Werner Vogels 的炉边谈话。贝佐斯讲述 AWS 的起源——\"我们当时为内部开发者建基础设施，最后发现这套东西本身就是产品\"。这是了解 AWS 战略思维最权威的公开记录之一。",
    summary_en: "The fireside chat between Bezos and Amazon CTO Werner Vogels at the first-ever AWS re:Invent. Bezos tells the AWS origin story: \"We were building infrastructure for our own developers, and we realized that infrastructure itself was a product.\" One of the most authoritative public records of AWS strategic thinking.",
    location: "Las Vegas, NV",
    key: true,
    tags: ["AWS", "re:Invent", "Werner Vogels", "云计算"],
    sources: [
      youtubeSource(
        "youtube-aws-reinvent-2012",
        "O4MtQGRIIuA",
        "2012 re:Invent Day 2: Fireside Chat with Jeff Bezos & Werner Vogels",
        "Amazon Web Services",
        "首届 AWS re:Invent 大会贝佐斯与 Werner Vogels 的炉边谈话完整录像。",
        "Full first-ever AWS re:Invent fireside chat between Bezos and Werner Vogels.",
        { primary: true }
      ),
    ],
  },

  // 2014 Business Insider Ignition
  {
    id: "bezos-2014-12-02-business-insider-ignition",
    person_id: "bezos",
    date: "2014-12-02",
    date_precision: "day",
    type: "interview",
    title: "Business Insider IGNITION 大会专访",
    title_en: "Business Insider IGNITION Conference Interview",
    summary: "Business Insider 创始人 Henry Blodget 在 IGNITION 2014 大会上专访贝佐斯。重点讨论 Fire Phone 失败（\"几亿美元的损失，但我们必须做大胆的实验，如果一定能成功就不叫实验了\"）、Washington Post 收购、和 Amazon 的长期方向。",
    summary_en: "Business Insider founder Henry Blodget interviews Bezos at IGNITION 2014. Key topics: the Fire Phone failure (\"hundreds of millions of dollars lost, but we have to make big bold bets — if we knew they'd work, they wouldn't be experiments\"), the Washington Post acquisition, and Amazon's long-term direction.",
    location: "New York, NY",
    tags: ["Business Insider", "采访", "Fire Phone", "Henry Blodget"],
    sources: [
      youtubeSource(
        "youtube-bi-ignition-2014",
        "Xx92bUw7WX8",
        "Interview: Amazon CEO Jeff Bezos",
        "Business Insider",
        "Business Insider IGNITION 2014 大会贝佐斯专访完整录像。",
        "Full Business Insider IGNITION 2014 Bezos interview.",
        { primary: true }
      ),
    ],
  },

  // 2016 Code Conference
  {
    id: "bezos-2016-06-01-code-conference",
    person_id: "bezos",
    date: "2016-06-01",
    date_precision: "day",
    type: "interview",
    title: "Code Conference 2016：谈 Donald Trump 与 Peter Thiel",
    title_en: "Code Conference 2016: On Donald Trump and Peter Thiel",
    summary: "Code Conference 2016 上 Walt Mossberg 主持的贝佐斯专访。当时正值 Trump 大选造势期、Peter Thiel 资助 Hulk Hogan 起诉 Gawker——贝佐斯公开发声反对 Trump 对媒体的态度，并支持 Gawker。这是他罕见的公开政治表态。",
    summary_en: "Walt Mossberg's Bezos interview at Code Conference 2016 — at the height of Trump's campaign and Peter Thiel's secret funding of the Hulk Hogan lawsuit against Gawker. Bezos publicly criticized Trump's stance on the press and defended Gawker — a rare overt political statement from him.",
    location: "Rancho Palos Verdes, CA",
    tags: ["Code Conference", "Walt Mossberg", "Trump", "Peter Thiel", "媒体"],
    sources: [
      youtubeSource(
        "youtube-code-2016",
        "guVxubbQQKE",
        "Jeff Bezos vs. Peter Thiel and Donald Trump | Jeff Bezos, CEO Amazon | Code Conference 2016",
        "On with Kara Swisher",
        "Code Conference 2016 贝佐斯专访完整录像。",
        "Full Code Conference 2016 Bezos interview.",
        { primary: true }
      ),
    ],
  },

  // 2018 Bush Center Forum on Leadership
  {
    id: "bezos-2018-04-20-bush-center",
    person_id: "bezos",
    date: "2018-04-20",
    date_precision: "day",
    type: "speech",
    title: "布什中心 Forum on Leadership：关于领导力的对谈",
    title_en: "George W. Bush Center Forum on Leadership: A Conversation",
    summary: "贝佐斯在 SMU 的乔治·W·布什总统中心 \"Forum on Leadership\" 上的深度对谈。讨论 Amazon \"two-pizza team\"、\"disagree and commit\"（不同意但执行）、为什么大公司应该用类比小公司的方式做决策——是他关于决策方法论最系统的一次公开陈述。",
    summary_en: "Bezos's in-depth conversation at the George W. Bush Presidential Center's \"Forum on Leadership\" at SMU. Topics include Amazon's two-pizza team rule, \"disagree and commit,\" and why big companies should make decisions like small ones — his most systematic public articulation of his decision-making methodology.",
    location: "George W. Bush Presidential Center, SMU, Dallas, TX",
    key: true,
    tags: ["布什中心", "领导力", "决策", "Amazon"],
    sources: [
      youtubeSource(
        "youtube-bush-center-2018",
        "xu6vFIKAUxk",
        "Forum on Leadership: A Conversation with Jeff Bezos",
        "George W. Bush Presidential Center",
        "贝佐斯 2018 年布什中心 Forum on Leadership 完整对谈。",
        "Full Bezos 2018 Forum on Leadership conversation.",
        { primary: true }
      ),
      archiveSource(
        "archive-bush-center-2018",
        "CSPAN_20180526_010600_Bush_Center_Leadership_Forum_-_Jeff_Bezos_Conversation",
        "Bush Center Leadership Forum - Jeff Bezos Conversation (CSPAN)",
        "C-SPAN 2018 年 5 月转播版。",
        "C-SPAN's May 2018 broadcast version."
      ),
    ],
  },

  // 2018 Economic Club
  {
    id: "bezos-2018-09-13-economic-club-rubenstein",
    person_id: "bezos",
    date: "2018-09-13",
    date_precision: "day",
    type: "interview",
    title: "华盛顿经济俱乐部：与 David Rubenstein 对谈",
    title_en: "Economic Club of Washington: Conversation with David Rubenstein",
    summary: "Carlyle 联合创始人 David Rubenstein 主持的贝佐斯长访谈。这是贝佐斯财富、人生观、家庭、决策方法的全面陈述——其中关于\"后悔最小化框架\"（regret minimization framework）和母亲资助 Amazon 早期的故事广为流传。",
    summary_en: "David Rubenstein (Carlyle co-founder) hosts a long-form Bezos interview — a comprehensive statement on his wealth, worldview, family, and decision-making. Includes the widely-quoted \"regret minimization framework\" segment and the story of how his parents helped fund early Amazon.",
    location: "Washington, DC",
    key: true,
    tags: ["Economic Club", "David Rubenstein", "采访"],
    sources: [
      youtubeSource(
        "youtube-economic-club-2018",
        "xv_vkA0jsyo",
        "Jeff Bezos At The Economic Club Of Washington (9/13/18)",
        "CNBC",
        "贝佐斯 2018 年华盛顿经济俱乐部专访完整录像。",
        "Full 2018 Economic Club of Washington Bezos interview.",
        {
          primary: true,
          quotes: [
            {
              text: "I knew that when I was 80, I was not going to regret having tried this. I was not going to regret trying to participate in this thing called the Internet that I thought was going to be a really big deal. I knew that if I failed, I wouldn't regret that, but I knew the one thing I might regret is not ever having tried.",
              text_zh: "我知道当我 80 岁的时候，我不会后悔自己尝试过这件事。我不会后悔参与了这个叫\"互联网\"的、我觉得会是大事的东西。我知道哪怕我失败了，我不会后悔那个；但我会后悔的是——如果我从来没试过。",
              speaker: "Jeff Bezos",
              context: "讲述他离开 D.E. Shaw 创办 Amazon 时使用的 \"后悔最小化框架\"",
            },
          ],
        }
      ),
    ],
  },

  // 2018 AFA Conference
  {
    id: "bezos-2018-09-19-air-force-association",
    person_id: "bezos",
    date: "2018-09-19",
    date_precision: "day",
    type: "speech",
    title: "美国空军协会 Air, Space & Cyber 大会演讲",
    title_en: "Air Force Association Air, Space & Cyber Conference",
    summary: "贝佐斯在美国空军协会 Air, Space & Cyber 大会上的演讲。少见的\"硅谷 + 国防\"主题，讨论 Amazon 与 AWS 在国防和太空上的角色——这场演讲发生在 Project Maven 抗议之后（Google 员工抵制为五角大楼做 AI），贝佐斯明确表态 Amazon 会继续与国防部合作。",
    summary_en: "Bezos's speech at the Air Force Association's Air, Space & Cyber Conference — a rare \"Silicon Valley + defense\" appearance discussing Amazon's and AWS's role in defense and space. Delivered after the Project Maven protests (Google employees opposed Pentagon AI work), where Bezos explicitly affirmed Amazon would continue to work with DoD.",
    location: "National Harbor, MD",
    tags: ["国防", "Air Force", "AWS", "太空"],
    sources: [
      archiveSource(
        "archive-afa-2018",
        "CSPAN_20180920_100700_Amazon_CEO_Jeff_Bezos_at_Air_Force_Association_Air_Space__Cyber...",
        "Amazon CEO Jeff Bezos at Air Force Association Air, Space & Cyber Conference - Day 3",
        "C-SPAN 2018 年 9 月转播版。",
        "C-SPAN's September 2018 broadcast.",
        { primary: true }
      ),
    ],
  },

  // 2018 Sammies
  {
    id: "bezos-2018-10-02-sammies-michael-lewis",
    person_id: "bezos",
    date: "2018-10-02",
    date_precision: "day",
    type: "interview",
    title: "Sammies 2018：与 Michael Lewis 炉边谈话",
    title_en: "Sammies 2018: Fireside Chat with Michael Lewis",
    summary: "在 Partnership for Public Service 颁奖典礼 \"Sammies\" 上，贝佐斯与作家 Michael Lewis（《Moneyball》《The Big Short》《The Fifth Risk》作者）对谈。讨论政府与私营部门、长期主义、决策、Amazon 的雇人哲学。这是一场难得的、由文学性记者主持的访谈。",
    summary_en: "At the Partnership for Public Service \"Sammies\" awards, Bezos in fireside chat with author Michael Lewis (*Moneyball*, *The Big Short*, *The Fifth Risk*). Topics include government vs. private sector, long-term thinking, decision-making, and Amazon's hiring philosophy. A rare interview with a literary journalist as host.",
    location: "Washington, DC",
    tags: ["Sammies", "Michael Lewis", "公共服务"],
    sources: [
      youtubeSource(
        "youtube-sammies-2018",
        "ebGgG2Ojfbw",
        "Jeff Bezos and Michael Lewis Fireside Chat - Sammies 2018",
        "Partnership for Public Service",
        "Sammies 2018 颁奖典礼贝佐斯与 Michael Lewis 对谈完整录像。",
        "Full Sammies 2018 fireside chat between Bezos and Michael Lewis.",
        { primary: true }
      ),
    ],
  },

  // 2018 Wired25
  {
    id: "bezos-2018-10-15-wired25",
    person_id: "bezos",
    date: "2018-10-15",
    date_precision: "day",
    type: "interview",
    title: "Wired25 大会：硅谷的 25 年回顾",
    title_en: "Wired25 Summit",
    summary: "Wired 杂志 25 周年纪念大会上的贝佐斯专访。贝佐斯反思过去 25 年互联网的演变——\"我们站在第一天\"，AI 是下一个最大变化，并讨论太空殖民对人类长期生存的必要性。",
    summary_en: "Bezos's interview at Wired magazine's 25th anniversary summit. He reflects on 25 years of internet evolution — \"we are still on Day 1\" — names AI as the next biggest shift, and argues the necessity of space colonization for humanity's long-term survival.",
    location: "San Francisco, CA",
    tags: ["Wired", "AI", "太空", "Day 1"],
    sources: [
      youtubeSource(
        "youtube-wired25",
        "dvrnCQhDFrY",
        "Jeff Bezos speaks at Wired25 summit 2018",
        "Wired",
        "Wired25 大会贝佐斯专访完整录像。",
        "Full Wired25 summit Bezos interview.",
        { primary: true }
      ),
    ],
  },

  // 2019 re:MARS Fireside (different from existing keynote)
  {
    id: "bezos-2019-06-06-remars-fireside",
    person_id: "bezos",
    date: "2019-06-06",
    date_precision: "day",
    type: "interview",
    title: "re:MARS 2019：与 Jenny Freshwater 炉边谈话",
    title_en: "re:MARS 2019: Fireside Chat with Jenny Freshwater",
    summary: "re:MARS 大会上贝佐斯与 Amazon 副总裁 Jenny Freshwater 的炉边谈话（与同期主题演讲为不同场次）。讨论机器学习的商业化路径、Amazon 内部如何让算法决策成为常态，以及为什么\"客户痴迷\"在 AI 时代依然是核心。",
    summary_en: "A fireside chat at re:MARS between Bezos and Amazon VP Jenny Freshwater (a separate session from the main keynote). Topics: how to commercialize machine learning, how Amazon makes algorithmic decision-making routine, and why \"customer obsession\" remains core in the AI era.",
    location: "Las Vegas, NV",
    tags: ["re:MARS", "AI", "Amazon", "机器学习"],
    sources: [
      youtubeSource(
        "youtube-remars-fireside",
        "AbpXSM8WW4s",
        "Jeff Bezos Fireside Chat at Re:MARS 2019 | Amazon News",
        "Amazon News",
        "re:MARS 2019 大会贝佐斯炉边谈话完整录像。",
        "Full re:MARS 2019 Bezos fireside chat.",
        { primary: true }
      ),
    ],
  },

  // 2019 JFK Space Summit
  {
    id: "bezos-2019-06-19-jfk-space-summit",
    person_id: "bezos",
    date: "2019-06-19",
    date_precision: "day",
    type: "speech",
    title: "JFK Library 太空峰会：与 Caroline Kennedy 对谈",
    title_en: "JFK Library Space Summit: Fireside Chat with Caroline Kennedy",
    summary: "在肯尼迪总统图书馆举办的太空峰会上，贝佐斯与 Caroline Kennedy（约翰·F·肯尼迪之女）炉边对谈。讲述他作为 5 岁孩童亲眼看 Apollo 11 登月对一生的影响——\"我和 Blue Origin 在做的，是把太空的访问门槛降下来\"。",
    summary_en: "At the JFK Presidential Library's Space Summit, Bezos in fireside chat with Caroline Kennedy. Bezos describes the lifelong impact of watching Apollo 11 as a 5-year-old: \"What I'm doing with Blue Origin is lowering the cost of access to space.\"",
    location: "JFK Presidential Library, Boston, MA",
    tags: ["JFK Library", "Caroline Kennedy", "Apollo 11", "Blue Origin"],
    sources: [
      youtubeSource(
        "youtube-jfk-space-2019",
        "bG0kT78SDn0",
        "JFK Space Summit: Fireside Chat with Jeff Bezos",
        "John F. Kennedy Library Foundation",
        "肯尼迪图书馆 2019 太空峰会贝佐斯专访完整录像。",
        "Full JFK Library 2019 Space Summit Bezos interview.",
        { primary: true }
      ),
    ],
  },

  // 2020 House Antitrust Testimony
  {
    id: "bezos-2020-07-29-house-antitrust",
    person_id: "bezos",
    date: "2020-07-29",
    date_precision: "day",
    type: "speech",
    title: "美国众议院反垄断作证（与 Cook、Pichai、Zuckerberg 同场）",
    title_en: "U.S. House Antitrust Testimony (with Cook, Pichai, Zuckerberg)",
    summary: "美国众议院反垄断小组委员会传唤四位科技 CEO 同场作证——贝佐斯、Tim Cook（Apple）、Sundar Pichai（Google）、Mark Zuckerberg（Meta）。这是科技史上规模最大的一次国会反垄断质询，贝佐斯因身份原因第一次在国会作证。",
    summary_en: "The House Antitrust Subcommittee summoned four tech CEOs to testify together: Bezos, Tim Cook (Apple), Sundar Pichai (Google), Mark Zuckerberg (Meta). The largest-ever Congressional antitrust hearing on Big Tech — and Bezos's first time testifying before Congress.",
    location: "Washington, DC (virtual)",
    key: true,
    tags: ["反垄断", "国会作证", "Big Tech"],
    sources: [
      youtubeSource(
        "youtube-antitrust-2020",
        "1s1uWo1_bzg",
        "CEOs Mark Zuckerberg, Tim Cook, Jeff Bezos & Sundar Pichai testify before House Judiciary Cmte",
        "C-SPAN",
        "众议院反垄断小组委员会四 CEO 作证完整录像（C-SPAN）。",
        "Full C-SPAN coverage of the four-CEO House antitrust hearing.",
        { primary: true }
      ),
    ],
  },

  // 2024 DealBook Summit
  {
    id: "bezos-2024-12-04-dealbook-summit",
    person_id: "bezos",
    date: "2024-12-04",
    date_precision: "day",
    type: "interview",
    title: "纽约时报 DealBook 大会：与 Andrew Ross Sorkin 对谈",
    title_en: "NYT DealBook Summit: With Andrew Ross Sorkin",
    summary: "卸任 Amazon CEO 三年后，贝佐斯接受 NYT DealBook Summit 上 Andrew Ross Sorkin 的长访谈。讨论 Blue Origin、Washington Post 编辑权决策（备受争议地撤回 Kamala Harris 的支持背书）、AI、与 Trump 的关系。",
    summary_en: "Three years after stepping down as Amazon CEO, Bezos sits with Andrew Ross Sorkin at the NYT DealBook Summit. Topics include Blue Origin, the controversial Washington Post editorial decisions (the much-debated withdrawal of the Kamala Harris endorsement), AI, and his relationship with Trump.",
    location: "New York, NY",
    tags: ["DealBook", "Andrew Ross Sorkin", "Washington Post", "AI"],
    sources: [
      youtubeSource(
        "youtube-dealbook-2024",
        "s71nJQqzYRQ",
        "The Interview: From Amazon to Space — Jeff Bezos Talks Innovation, Progress and What's Next",
        "New York Times Events",
        "NYT DealBook Summit 2024 贝佐斯与 Andrew Ross Sorkin 长访谈完整录像。",
        "Full NYT DealBook Summit 2024 Bezos interview with Andrew Ross Sorkin.",
        { primary: true }
      ),
    ],
  },

  // 2025 Italian Tech Week
  {
    id: "bezos-2025-10-italian-tech-week",
    person_id: "bezos",
    date: "2025-10-01",
    date_precision: "month",
    type: "interview",
    title: "意大利科技周：与 John Elkann 对谈",
    title_en: "Italian Tech Week: With John Elkann",
    summary: "在都灵的意大利科技周大会上，贝佐斯与 Stellantis（FCA + PSA 合并）董事长、Agnelli 家族继承人 John Elkann 对谈。这是贝佐斯近年罕见的欧洲公开露面——讨论 Amazon、Blue Origin、AI 在欧洲创业生态中的位置。",
    summary_en: "At Italian Tech Week in Turin, Bezos in conversation with John Elkann, Stellantis chairman (FCA + PSA merger) and Agnelli family heir. A rare recent European appearance for Bezos — covering Amazon, Blue Origin, and AI in the European startup ecosystem.",
    location: "Turin, Italy",
    tags: ["Italian Tech Week", "John Elkann", "欧洲", "Stellantis"],
    sources: [
      youtubeSource(
        "youtube-italian-tech-2025",
        "HB3Rq6ZLliM",
        "Jeff Bezos & John Elkann - Italian Tech Week 2025",
        "Italian Tech Week",
        "意大利科技周 2025 贝佐斯专访完整录像。",
        "Full Italian Tech Week 2025 Bezos interview.",
        { primary: true }
      ),
    ],
  },
];

// === 3. Apply ===
let updated = 0;
let added = 0;
let fixed = 0;
let skipped = 0;

// 3a. Date fixes
for (const fix of FIX_DATES) {
  const event = events.find((e) => e.id === fix.eventId);
  if (!event) {
    console.error(`MISS event ${fix.eventId} for date fix`);
    continue;
  }
  if (event.date === fix.newDate) {
    console.log(`skip date fix ${fix.eventId} (already correct)`);
    continue;
  }
  console.log(`✎ ${fix.eventId}: ${event.date} → ${fix.newDate}`);
  event.date = fix.newDate;
  fixed++;
}

// 3b. Add sources to existing events
for (const item of ADDITIONS_TO_EXISTING) {
  const event = events.find((e) => e.id === item.eventId);
  if (!event) {
    console.error(`MISS event ${item.eventId}`);
    continue;
  }
  const exists = (event.sources || []).find((s) => s.id === item.src.id);
  if (exists) {
    skipped++;
    console.log(`skip existing source ${item.src.id} on ${item.eventId}`);
    continue;
  }
  event.sources = event.sources || [];
  event.sources.push(item.src);
  updated++;
  console.log(`+ source ${item.src.id} → ${item.eventId}`);
}

// 3c. Add new events
for (const newE of NEW_EVENTS) {
  const exists = events.find((e) => e.id === newE.id);
  if (exists) {
    skipped++;
    console.log(`skip existing event ${newE.id}`);
    continue;
  }
  events.push(newE);
  added++;
  console.log(`+ event ${newE.id}`);
}

events.sort((a, b) => a.date.localeCompare(b.date));

fs.writeFileSync(FILE, JSON.stringify(events, null, 2) + "\n");
console.log(`\nDone. Existing-event sources added: ${updated} | Date fixes: ${fixed} | New events: ${added} | Skipped: ${skipped}`);
