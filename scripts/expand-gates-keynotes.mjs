#!/usr/bin/env node
/**
 * Expand Bill Gates coverage with verified archive.org / YouTube sources.
 * Mirrors expand-jobs-keynotes.mjs in structure.
 *
 * - Adds video sources to ~10 existing events (Win 1.0/3.0/95, antitrust,
 *   TED 2009/2015, Inside Bill's Brain, Trevor Noah COVID, etc.)
 * - Creates ~13 new events (1984 Today Show, Excel 1.0 launch, Letterman 1995,
 *   Comdex 1995/1998/1999, Xbox CES reveal, Harvard 2007, Stanford 2014,
 *   Columbia 2017, Unconfuse Me w/ Altman, What's Next 2024, etc.)
 *
 * All IDs verified via verify-yt-batch.mjs before this script.
 */
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "events", "gates.json");
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

// === 1. Add sources to existing events ===
const ADDITIONS_TO_EXISTING = [
  // Win 1.0 — the famous 1986 Ballmer promo (slightly later than the launch)
  {
    eventId: "gates-1985-11-20-windows-1",
    src: archiveSource(
      "archive-win-1-ballmer",
      "windows-1.0-with-steve-ballmer",
      "Windows 1.0 with Steve Ballmer (1986 Promo)",
      "1986 年微软内部宣传片，Steve Ballmer 以美国电视购物风格推销 Windows 1.0。这段录像后来成为微软早期商业风格的著名见证。注意：录制于 1985 年 11 月 Windows 1.0 发布之后，技术上属于 1986 年的促销视频。",
      "1986 Microsoft internal promotional video, with Steve Ballmer pitching Windows 1.0 in US infomercial style. Famous as a snapshot of early Microsoft commercial culture. Note: filmed after the November 1985 launch, so technically a 1986 promo.",
    ),
  },
  // Win 3.0 — 1990 launch + Comdex Fall 1990 keynote
  {
    eventId: "gates-1990-05-22-windows-3",
    src: youtubeSource(
      "youtube-win-3-launch",
      "hyBU7F8dEVQ",
      "Windows 3.0 Launch • Bill Gates • 1990",
      "BluFlame",
      "Windows 3.0 1990 年 5 月 22 日发布会现场，盖茨亲自演示——这是 Windows 第一个真正意义上的成功版本，奠定了微软日后 PC 时代统治地位。",
      "The May 22, 1990 Windows 3.0 launch event with Gates demoing on stage — the first truly successful Windows release, the foundation of Microsoft's PC-era dominance."
    ),
  },
  {
    eventId: "gates-1990-05-22-windows-3",
    src: archiveSource(
      "archive-comdex-fall-1990",
      "comdexfall90-billgatesinformationatyourfingertips",
      "COMDEX Fall '90 — Bill Gates: Information At Your Fingertips",
      "1990 年 11 月 12 日 Comdex Fall 主题演讲。盖茨提出 \"Information At Your Fingertips\"（\"信息触手可及\"）这一对未来 10 年的核心愿景，预言图形界面 + 网络 + 多媒体将成为主流。",
      "The November 12, 1990 Comdex Fall keynote where Gates introduced \"Information At Your Fingertips\" — his core 10-year vision predicting the rise of GUI + networking + multimedia.",
      {
        quotes: [
          {
            text: "Information at your fingertips.",
            text_zh: "信息触手可及。",
            speaker: "Bill Gates",
            context: "1990 Comdex Fall 主题演讲提出的微软未来十年愿景",
          },
        ],
      }
    ),
  },
  // Win 95 — Jay Leno launch (FAMOUS)
  {
    eventId: "gates-1995-08-24-windows-95",
    src: archiveSource(
      "archive-win-95-jay-leno",
      "microsoftwindows95launchwithbillgatesandjayleno1995",
      "Microsoft Windows 95 Launch with Bill Gates & Jay Leno (1995)",
      "1995 年 8 月 24 日 Windows 95 发布会完整录像。盖茨与脱口秀主持人 Jay Leno 同台主持，成为科技史上最高调的产品发布之一——Rolling Stones 的 \"Start Me Up\" 主题曲、3 亿美元营销预算、午夜全球同步开卖。",
      "Full recording of the August 24, 1995 Windows 95 launch event — co-hosted with Jay Leno. One of the highest-profile tech product launches in history: Rolling Stones' \"Start Me Up\" theme, $300M marketing budget, midnight global launch."
    ),
  },
  // 1998 antitrust — full deposition
  {
    eventId: "gates-1998-05-18-antitrust",
    src: archiveSource(
      "archive-gates-deposition-1998",
      "bill-gates-microsoft-antitrust-deposition-full-version-august-1998",
      "Bill Gates - Microsoft Antitrust Deposition - Full Version (August 1998)",
      "1998 年 8 月司法部反垄断案中盖茨长达数十小时的庭外作证录像（完整版）。盖茨表现出的强硬、回避、对模糊词义的反复争论，成为他法律与公关史上的一大败笔——后来被广泛引用为 \"应该如何不应付反垄断作证\" 的范例。",
      "Full recording of Gates's many-hour pretrial deposition in the August 1998 DOJ antitrust case. His combativeness, evasiveness, and prolonged debates over the meaning of common words became a legal and PR low — widely cited afterward as a how-not-to example for antitrust testimony."
    ),
  },
  // TED 2009 — mosquitoes (FAMOUS)
  {
    eventId: "gates-2009-02-ted-mosquitoes",
    src: youtubeSource(
      "youtube-ted-2009-mosquitoes",
      "tsgvhP07BC8",
      "Mosquitos, malaria and education | Bill Gates",
      "TED",
      "2009 年 TED 大会上盖茨关于疟疾的著名演讲。讲到一半他打开一个装满蚊子的玻璃罐，让蚊子飞向观众席：\"没理由让穷人才被叮咬\"——全场震惊，画面成为 TED 史上最经典瞬间之一。",
      "Gates's famous 2009 TED talk on malaria. Mid-talk he opened a jar of mosquitoes into the audience, saying \"there's no reason only poor people should have the experience\" — one of the most iconic moments in TED history.",
      {
        primary: true,
        quotes: [
          {
            text: "Now, malaria is of course transmitted by mosquitoes. I brought some here, just so you could experience this. We'll let those roam around the auditorium a little bit. There's no reason only poor people should have the experience.",
            text_zh: "疟疾当然是由蚊子传播的。我带了一些来，就是为了让你们也体验一下。我们让它们在会场里飞一下。没有理由说只有穷人才该有这种体验。",
            speaker: "Bill Gates",
            context: "TED 2009 演讲中打开蚊子罐时的著名一句",
          },
        ],
      }
    ),
  },
  // TED 2015 — pandemic (FAMOUS, especially after COVID)
  {
    eventId: "gates-2015-03-ted-pandemics",
    src: youtubeSource(
      "youtube-ted-2015-pandemic",
      "6Af6b_wyiwI",
      "The next outbreak? We're not ready | Bill Gates | TED",
      "TED",
      "2015 年 TED 演讲 \"下一次疫情？我们还没准备好\"。盖茨警告未来几十年最大的全球威胁不是核战争而是流行病——人类没有为此做好准备。COVID-19 五年后爆发后，这场演讲被网友翻出，播放量暴增至数千万。",
      "The 2015 TED talk \"The next outbreak? We're not ready.\" Gates warned that the greatest global threat in the coming decades wasn't nuclear war but pandemics — and humanity wasn't prepared. After COVID-19 hit five years later, the talk went viral with tens of millions of views.",
      {
        primary: true,
        quotes: [
          {
            text: "If anything kills over 10 million people in the next few decades, it's most likely to be a highly infectious virus rather than a war. Not missiles, but microbes.",
            text_zh: "未来几十年里，如果有什么会杀死超过 1000 万人，最可能的就是一种高度传染性的病毒，而不是战争——不是导弹，而是微生物。",
            speaker: "Bill Gates",
            context: "TED 2015 关于全球大流行预警的核心论断；五年后 COVID-19 验证了这个判断",
          },
        ],
      }
    ),
  },
  // Inside Bill's Brain — Netflix trailer
  {
    eventId: "gates-2019-09-netflix-inside-bills-brain",
    src: youtubeSource(
      "youtube-inside-bills-brain-trailer",
      "aCv29JKmHNY",
      "Inside Bill's Brain: Decoding Bill Gates | Official Trailer | Netflix",
      "Netflix",
      "Netflix 三集纪录片《Inside Bill's Brain》官方预告片。Davis Guggenheim 执导，深度展现盖茨的思维方式、童年、Microsoft 早期、慈善工作，以及他与已故妹妹 Kristi 的关系。",
      "Official trailer for the Netflix three-part documentary *Inside Bill's Brain*. Directed by Davis Guggenheim, exploring Gates's thinking style, childhood, early Microsoft years, philanthropy, and his relationship with his late sister Kristi."
    ),
  },
  // 2008 Charlie Rose interview (just before retirement)
  {
    eventId: "gates-2008-06-27-retires-microsoft",
    src: archiveSource(
      "archive-charlie-rose-2008-07",
      "Charlie-Rose-2008-07-23",
      "Charlie Rose — July 23, 2008",
      "盖茨从微软日常工作正式退休一个月后接受 Charlie Rose 长访谈。回顾微软 33 年，反思与 Steve Jobs 的关系，谈未来全心投入比尔与梅琳达·盖茨基金会。",
      "A long-form Charlie Rose interview a month after Gates's official retirement from day-to-day Microsoft work. He reviews 33 years at Microsoft, reflects on the Steve Jobs rivalry, and discusses his full-time pivot to the Gates Foundation."
    ),
  },
  // 2020 Trevor Noah COVID
  {
    eventId: "gates-2020-04-covid-vaccine-funding",
    src: youtubeSource(
      "youtube-trevor-noah-covid",
      "5vXmTrB7rj8",
      "Full Interview | Bill Gates on The Daily Social Distancing Show with Trevor Noah",
      "Comedy Central Africa",
      "2020 年 4 月 COVID 疫情高峰时期，盖茨在 Trevor Noah 的 \"Daily Social Distancing Show\" 上的完整专访。讨论 Gates 基金会如何资助疫苗研发、为什么需要全球合作、对美国应对方式的批评。",
      "Full April 2020 interview at the peak of COVID with Trevor Noah on The Daily Social Distancing Show. Covers how the Gates Foundation funds vaccine development, the case for global cooperation, and criticism of the US response."
    ),
  },
];

// === 2. New events ===
const NEW_EVENTS = [
  // === 1984 ===
  {
    id: "gates-1984-04-25-today-show",
    person_id: "gates",
    date: "1984-04-25",
    date_precision: "day",
    type: "interview",
    title: "Today Show 早期电视访谈：28 岁的百万富翁",
    title_en: "Today Show Early Interview: A 28-year-old Millionaire",
    summary: "1984 年 NBC Today Show 对盖茨的早期电视访谈。28 岁的盖茨穿着略显宽松的西服，谈微软早期、与 IBM 的关系、刚成为百万富翁的感受——是他登上主流电视的最早纪录之一，与后来成熟的 \"科技帝国 CEO\" 形象反差强烈。",
    summary_en: "An early 1984 NBC Today Show TV interview with Gates. At 28, in a slightly oversized suit, Gates discusses Microsoft's early days, the IBM relationship, and what it felt like to have just become a millionaire — one of the earliest mainstream TV appearances, in striking contrast to his later \"tech-empire CEO\" persona.",
    location: "NBC Studios, New York, NY",
    tags: ["早期", "电视采访", "Microsoft"],
    sources: [
      youtubeSource(
        "youtube-today-1984",
        "zZrgVG2k8vU",
        "From 1984: Bill Gates talks Microsoft early days, millionaire status",
        "TODAY (NBC)",
        "1984 年 NBC Today Show 对 28 岁盖茨的早期访谈完整片段。",
        "Full clip of the 1984 NBC Today Show interview with the 28-year-old Gates.",
        { primary: true }
      ),
    ],
  },

  // === 1985 Excel 1.0 launch ===
  {
    id: "gates-1985-05-02-excel-launch",
    person_id: "gates",
    date: "1985-05-02",
    date_precision: "day",
    type: "product",
    title: "在 Tavern on the Green 发布 Excel 1.0",
    title_en: "Launches Excel 1.0 at Tavern on the Green",
    summary: "微软在纽约中央公园的 Tavern on the Green 餐厅发布 Excel 1.0——首先专为 Macintosh 平台开发，三年后才上 Windows。盖茨亲自演示，宣告微软进军电子表格市场（当时被 Lotus 1-2-3 主导）。这场发布会成了微软早期 \"先做最好的应用，再带动操作系统\" 战略的标志事件。",
    summary_en: "Microsoft launched Excel 1.0 at the Tavern on the Green restaurant in Central Park, NY — initially Mac-only (it would not arrive on Windows for three more years). Gates demoed personally, signaling Microsoft's entry into spreadsheets (then dominated by Lotus 1-2-3). The event became emblematic of Microsoft's early \"build the best apps first, drag the OS along\" strategy.",
    location: "Tavern on the Green, Central Park, New York, NY",
    tags: ["产品发布", "Excel", "Macintosh"],
    sources: [
      archiveSource(
        "archive-excel-launch",
        "microsoft-excel-1.0-product-announcement-tavern-on-the-green-the-gentleman-progr",
        "Microsoft Excel 1.0 Product Announcement — Tavern on the Green",
        "Excel 1.0 1985 年纽约发布会完整录像。",
        "Full recording of the 1985 New York Excel 1.0 launch."
      ),
    ],
  },

  // === 1990 Triumph of the Nerds is 1996 ===
  // 1995 Letterman + 1995 Comdex
  {
    id: "gates-1995-11-13-comdex-office-future",
    person_id: "gates",
    date: "1995-11-13",
    date_precision: "day",
    type: "speech",
    title: "Comdex Fall 1995：\"未来办公室\"主题演讲",
    title_en: "Comdex Fall 1995: \"Office of the Future\" Keynote",
    summary: "1995 年 11 月 Comdex Fall 主题演讲，盖茨展示对未来办公的预测——电子邮件普及、文档协作、网络化文件系统。这个 30 年前的预测今天看几乎全部应验，被视为 Gates 最有前瞻性的演讲之一。",
    summary_en: "Gates's November 1995 Comdex Fall keynote presenting his vision for the \"Office of the Future\" — pervasive email, document collaboration, networked file systems. Looking back 30 years later, almost every prediction came true. One of his most prescient talks.",
    location: "Las Vegas, NV",
    tags: ["Comdex", "演讲", "Office", "未来办公"],
    sources: [
      youtubeSource(
        "youtube-comdex-1995-office-future",
        "YCQI1t8wdMI",
        "\"Office of the Future\" presented at Fall COMDEX November 1995, featuring Bill Gates",
        "Hardcore Software",
        "Comdex Fall 1995 \"未来办公室\" 主题演讲完整录像。",
        "Full recording of the Comdex Fall 1995 \"Office of the Future\" keynote.",
        { primary: true }
      ),
    ],
  },
  {
    id: "gates-1995-11-27-letterman",
    person_id: "gates",
    date: "1995-11-27",
    date_precision: "day",
    type: "interview",
    title: "Late Show with David Letterman：向 Letterman 解释互联网",
    title_en: "Late Show with David Letterman: Explaining the Internet to Dave",
    summary: "1995 年 11 月 27 日盖茨上 Letterman 节目。Letterman 用各种讽刺问题挑战 \"为什么需要互联网\"——\"我有自己的电话能打，为什么要互联网？\"——盖茨耐心地解释：球赛重播、远程工作、跨国通讯。这段对话后来成了\"互联网早期主流认知\"的经典见证。",
    summary_en: "Gates's November 27, 1995 appearance on Late Show with David Letterman. Letterman challenged with sarcastic questions about \"why do we need the internet?\" — \"I've got a phone, why do I need the internet?\" — and Gates patiently explained game replays, remote work, international communication. The exchange became a classic snapshot of the era's mainstream perception of the internet.",
    location: "Ed Sullivan Theater, New York, NY",
    key: true,
    tags: ["电视采访", "互联网", "Letterman", "经典"],
    sources: [
      youtubeSource(
        "youtube-letterman-1995-full",
        "jgLiCNgRFZ8",
        "Bill Gates on Late Show, November 27, 1995 (full, stereo)",
        "Don Giller",
        "1995 年 11 月 27 日 Letterman 节目完整版。",
        "Full version of the November 27, 1995 Letterman appearance.",
        { primary: true }
      ),
      youtubeSource(
        "youtube-letterman-1995-clip",
        "fs-YpQj88ew",
        "Bill Gates Explains the Internet to Dave (1995) | Letterman",
        "Letterman",
        "Letterman 1995 年专访中关于互联网的著名片段。",
        "The famous internet-explainer clip from the 1995 Letterman appearance."
      ),
    ],
  },

  // === 1996 Triumph of the Nerds (Gates segment) ===
  {
    id: "gates-1996-triumph-nerds",
    person_id: "gates",
    date: "1996-04-13",
    date_precision: "day",
    type: "interview",
    title: "PBS《Triumph of the Nerds》纪录片采访",
    title_en: "PBS \"Triumph of the Nerds\" Interview",
    summary: "Robert Cringely 制作的 1996 年 PBS 三集纪录片中对盖茨的深度采访。讲述 Microsoft 创业故事、与 IBM 谈判 PC-DOS 协议的著名细节、以及他对 Apple 与 Mac 的看法——\"他们做了一个很好的产品，但他们的商业模式是错的\"。",
    summary_en: "Gates's extended interview in Robert Cringely's 1996 PBS three-part documentary. Covers the Microsoft origin story, the famous IBM PC-DOS negotiation, and his view of Apple and the Mac — \"they made a great product but their business model was wrong.\"",
    location: "Microsoft HQ, Redmond, WA",
    tags: ["PBS", "纪录片", "Microsoft 早期", "经典"],
    sources: [
      archiveSource(
        "archive-triumph-nerds-gates",
        "triumph_of_the_nerds",
        "Triumph of the Nerds",
        "PBS 1996 三集纪录片完整版，包含盖茨、乔布斯、沃兹的 1995 年深度采访。",
        "Full 1996 PBS three-part documentary featuring deep 1995 interviews with Gates, Jobs, and Wozniak.",
        { primary: true }
      ),
    ],
  },

  // === 1998 Comdex ===
  {
    id: "gates-1998-11-15-comdex-keynote",
    person_id: "gates",
    date: "1998-11-15",
    date_precision: "day",
    type: "speech",
    title: "Comdex Fall 1998 主题演讲（反垄断诉讼期间）",
    title_en: "Comdex Fall 1998 Keynote (during antitrust trial)",
    summary: "Comdex Fall 1998 主题演讲——这场演讲发生在司法部反垄断审判进行中。盖茨演示 Windows 2000、Office 2000、IE 5.0 的早期预览，但全场的政治色彩与气氛远比技术内容更受关注。",
    summary_en: "The Comdex Fall 1998 keynote — delivered while the DOJ antitrust trial was underway. Gates demoed early previews of Windows 2000, Office 2000, and IE 5.0, but the political atmosphere of the event drew more attention than the technical content.",
    location: "Las Vegas, NV",
    tags: ["Comdex", "演讲", "反垄断"],
    sources: [
      archiveSource(
        "archive-comdex-1998",
        "billgatesusergrouppresentation-extreme-speakerbillgatesatcomdex-lasvegasnv11-15-98",
        "Bill Gates at Comdex — Las Vegas, NV (11/15/98)",
        "Comdex 1998 主题演讲完整录像。",
        "Full recording of the 1998 Comdex Fall keynote."
      ),
    ],
  },
  {
    id: "gates-1999-11-14-comdex-keynote",
    person_id: "gates",
    date: "1999-11-14",
    date_precision: "day",
    type: "speech",
    title: "Comdex Fall 1999 主题演讲",
    title_en: "Comdex Fall 1999 Keynote",
    summary: "Comdex Fall 1999 主题演讲。微软已经在反垄断案一审败诉前的关键节点，盖茨同时谈 Windows 2000 即将发布、互联网战略、与 AT&T 的合作。是他作为 CEO 的最后几场 Comdex keynote 之一。",
    summary_en: "The Comdex Fall 1999 keynote — Microsoft was at a critical moment just before the antitrust verdict. Gates discussed the upcoming Windows 2000 release, Microsoft's internet strategy, and an AT&T partnership. One of his final Comdex keynotes as CEO.",
    location: "Las Vegas, NV",
    tags: ["Comdex", "演讲", "Windows 2000"],
    sources: [
      archiveSource(
        "archive-comdex-1999",
        "comdex1999lasvegas.billgateskeynote.11-14-99",
        "Comdex 1999: Las Vegas. Bill Gates Keynote. (11/14/99)",
        "Comdex Fall 1999 主题演讲完整录像。",
        "Full recording of the 1999 Comdex Fall keynote."
      ),
    ],
  },

  // === 2001 Xbox CES reveal (separate from Nov 15 retail launch) ===
  {
    id: "gates-2001-01-06-xbox-ces-reveal",
    person_id: "gates",
    date: "2001-01-06",
    date_precision: "day",
    type: "product",
    title: "CES 2001：与 The Rock 共同揭幕 Xbox",
    title_en: "CES 2001: Reveals Xbox with The Rock",
    summary: "在 2001 年 CES 大会上，盖茨与摔角明星 Dwayne \"The Rock\" Johnson 共同揭幕 Xbox 主机——微软第一次正式发布游戏机产品形态。距实际零售发布（2001 年 11 月 15 日）还有 10 个月。这个 \"科技 + 摔角明星\" 的奇怪搭配后来被反复回顾。",
    summary_en: "At CES 2001, Gates and wrestling star Dwayne \"The Rock\" Johnson jointly revealed the Xbox console — Microsoft's first formal reveal of the gaming hardware. The retail launch followed 10 months later on November 15, 2001. The \"tech + wrestling star\" pairing has been replayed many times since.",
    location: "Las Vegas Convention Center, Las Vegas, NV",
    tags: ["CES", "Xbox", "产品发布"],
    sources: [
      youtubeSource(
        "youtube-xbox-ces-2001",
        "Lu7o3exy00Q",
        "2001 - Xbox Console Reveal with The Rock and Bill Gates",
        "NeoGamer - The Video Game Archive",
        "CES 2001 Xbox 揭幕仪式完整片段。",
        "Full clip of the CES 2001 Xbox reveal ceremony.",
        { primary: true }
      ),
    ],
  },

  // === 2007 Harvard ===
  {
    id: "gates-2007-06-07-harvard-commencement",
    person_id: "gates",
    date: "2007-06-07",
    date_precision: "day",
    type: "speech",
    title: "哈佛大学毕业演讲（迟到 30 多年的学位）",
    title_en: "Harvard Commencement Address (the degree he finally got)",
    summary: "1973 年入学、1975 年因创办微软退学的盖茨，于 2007 年回到哈佛接受荣誉博士学位并发表毕业演讲。他自嘲是 \"哈佛历史上最成功的辍学生之一\"，但演讲核心是慈善——批评全球资本主义制度让 \"减少不平等远比提高生产力难得多\"。",
    summary_en: "Gates entered Harvard in 1973 and dropped out in 1975 to start Microsoft. In 2007 he returned to receive an honorary doctorate and deliver the commencement address. He joked he was \"the most successful Harvard dropout in history,\" but the core message was philanthropy — a critique that under global capitalism \"reducing inequity is harder than increasing productivity.\"",
    location: "Tercentenary Theatre, Harvard University, Cambridge, MA",
    key: true,
    tags: ["Harvard", "毕业演讲", "慈善"],
    sources: [
      youtubeSource(
        "youtube-harvard-2007",
        "zPx5N6Lh3sw",
        "Bill Gates Harvard Commencement Address 2007",
        "Harvard University",
        "盖茨 2007 年哈佛毕业演讲完整录像。",
        "Full recording of Gates's 2007 Harvard commencement address.",
        {
          primary: true,
          quotes: [
            {
              text: "Reducing inequity is the highest human achievement.",
              text_zh: "减少不平等是人类最高的成就。",
              speaker: "Bill Gates",
              context: "2007 哈佛毕业演讲的核心命题",
            },
          ],
        }
      ),
    ],
  },

  // === 2014 Stanford ===
  {
    id: "gates-2014-06-15-stanford-commencement",
    person_id: "gates",
    date: "2014-06-15",
    date_precision: "day",
    type: "speech",
    title: "斯坦福大学毕业演讲（与 Melinda 同台）",
    title_en: "Stanford Commencement Address (with Melinda)",
    summary: "盖茨与梅琳达·盖茨同台在斯坦福毕业典礼演讲——这是他们罕见的公开联合发言。两人交替讲述 Gates 基金会工作中的真实故事——印度的女性艾滋病患者、坦桑尼亚的儿童——并向毕业生强调 \"乐观必须建立在你愿意亲眼看见痛苦的基础上\"。",
    summary_en: "Gates delivered the Stanford commencement together with Melinda — a rare joint public address. They alternated stories from their Gates Foundation work — women with HIV in India, children in Tanzania — and challenged graduates that \"optimism must be grounded in your willingness to see suffering with your own eyes.\"",
    location: "Stanford Stadium, Stanford, CA",
    tags: ["Stanford", "毕业演讲", "慈善", "Melinda Gates"],
    sources: [
      youtubeSource(
        "youtube-stanford-2014",
        "wug9n5Atk8c",
        "Bill and Melinda Gates' 2014 Stanford Commencement Address",
        "Stanford",
        "比尔与梅琳达·盖茨 2014 年斯坦福毕业演讲完整录像。",
        "Full recording of Bill and Melinda Gates's 2014 Stanford commencement address.",
        { primary: true }
      ),
    ],
  },

  // === 2017 Charlie Rose Columbia (Buffett+Gates) ===
  {
    id: "gates-2017-01-27-columbia-buffett",
    person_id: "gates",
    date: "2017-01-27",
    date_precision: "day",
    type: "interview",
    title: "哥伦比亚大学：与巴菲特、Charlie Rose 同台",
    title_en: "Columbia University: Joint Talk with Buffett and Charlie Rose",
    summary: "在哥伦比亚商学院由 Charlie Rose 主持，盖茨与巴菲特同台对谈。两人长期友谊、Giving Pledge、与下一代领导者的对话——是两位老朋友少见的公开同框访谈，因 Buffett 私下不太接受电视镜头而尤显珍贵。",
    summary_en: "A Charlie Rose-hosted joint conversation at Columbia Business School between Gates and Buffett — covering their long friendship, the Giving Pledge, and a dialogue with the next generation of leaders. A rare on-camera joint appearance, especially valuable since Buffett tends to avoid televised settings.",
    location: "Columbia Business School, New York, NY",
    tags: ["哥伦比亚大学", "Warren Buffett", "Giving Pledge", "Charlie Rose"],
    sources: [
      youtubeSource(
        "youtube-columbia-2017",
        "lNRWxN7jKlI",
        "Bill Gates + Warren Buffett + Charlie Rose @ Columbia University 2017",
        "DMarcoTheBeast",
        "盖茨与巴菲特 2017 年 1 月在哥伦比亚商学院与 Charlie Rose 的同台访谈完整版。",
        "Full recording of the Gates-Buffett-Charlie Rose joint Columbia Business School conversation, January 2017.",
        { primary: true }
      ),
    ],
  },

  // === 2024 Unconfuse Me Sam Altman ===
  {
    id: "gates-2024-01-11-unconfuse-altman",
    person_id: "gates",
    date: "2024-01-11",
    date_precision: "day",
    type: "interview",
    title: "Unconfuse Me 第六集：与 Sam Altman 谈 AI 未来",
    title_en: "Unconfuse Me Ep 6: Sam Altman on the future of AI",
    summary: "盖茨自己主持的 \"Unconfuse Me\" 播客第六集，邀请 OpenAI CEO Sam Altman 长访谈。讨论 GPT-5 进展、AI 与教育、AI 与就业、AGI 时间表——这是盖茨退出微软日常工作后最深入的 AI 相关访谈之一。",
    summary_en: "Episode 6 of Gates's own \"Unconfuse Me\" podcast, an extended interview with OpenAI CEO Sam Altman. Covers GPT-5 progress, AI and education, AI and employment, the AGI timeline — one of Gates's deepest AI conversations since stepping back from Microsoft day-to-day.",
    location: "Recorded virtually",
    tags: ["AI", "OpenAI", "Sam Altman", "播客"],
    sources: [
      youtubeSource(
        "youtube-unconfuse-altman",
        "PkXELH6Y2lM",
        "Episode 6: OpenAI CEO Sam Altman on the future of AI",
        "Bill Gates",
        "Unconfuse Me 第六集：盖茨与 Sam Altman 关于 AI 未来的完整访谈。",
        "Full Unconfuse Me Episode 6 conversation between Gates and Sam Altman on the future of AI.",
        { primary: true }
      ),
    ],
  },

  // === 2024 What's Next Netflix ===
  {
    id: "gates-2024-09-18-whats-next-netflix",
    person_id: "gates",
    date: "2024-09-18",
    date_precision: "day",
    type: "writing",
    title: "Netflix 五集纪录片《What's Next? The Future with Bill Gates》",
    title_en: "Netflix five-part documentary: \"What's Next? The Future with Bill Gates\"",
    summary: "Netflix 五集纪录片，盖茨亲自主持，每集围绕一个未来命题：AI、气候、虚假信息、不平等、人类未来。盖茨与各领域专家、政治家、活动家对谈，是他作为退休 CEO + 慈善家的整体世界观陈述。",
    summary_en: "A Netflix five-part documentary hosted by Gates personally. Each episode tackles one big future question: AI, climate, misinformation, inequality, the future of humanity. Gates converses with domain experts, politicians, and activists — a comprehensive worldview statement from him as a retired CEO and philanthropist.",
    location: "Netflix",
    tags: ["Netflix", "纪录片", "AI", "气候", "未来"],
    sources: [
      youtubeSource(
        "youtube-whats-next-trailer",
        "6xxhYr4gbQE",
        "What's Next? The Future with Bill Gates | Official Trailer | Netflix",
        "Netflix",
        "《What's Next? The Future with Bill Gates》官方预告片。",
        "Official trailer for *What's Next? The Future with Bill Gates*.",
        { primary: true }
      ),
    ],
  },
];

// === 3. Apply ===
let updated = 0;
let added = 0;
let skipped = 0;

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
console.log(`\nDone. Existing-event sources added: ${updated} | New events: ${added} | Skipped: ${skipped}`);
