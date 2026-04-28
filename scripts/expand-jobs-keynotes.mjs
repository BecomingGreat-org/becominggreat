#!/usr/bin/env node
/**
 * Massive expansion of Steve Jobs coverage with verified archive.org / YouTube sources.
 *
 * - Adds video sources to 8 existing events
 * - Creates ~25 new events for famous Jobs keynotes (Macworld SF/NY 1999-2006,
 *   WWDC 1997-2008, Apple Special Events, 1980 footage, Triumph of the Nerds)
 *
 * All IDs were verified via /embed/ HEAD probe and YouTube oEmbed before this script.
 * Run: node scripts/expand-jobs-keynotes.mjs
 */
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "events", "jobs.json");
const events = JSON.parse(fs.readFileSync(FILE, "utf8"));

// === source builders ===
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
  // 1995 Smithsonian — has video version
  {
    eventId: "jobs-1995-04-20-smithsonian-oral-history",
    src: archiveSource(
      "archive-smithsonian-1995",
      "TheSteveJobs1995InterviewUnabridged",
      "The Steve Jobs 1995 Interview Unabridged",
      "Smithsonian 计算机历史口述项目对乔布斯的完整访谈录像（约 75 分钟），由 Daniel Morrow 主持。从 Apple 早期一直谈到当时正在做的 NeXT 与 Pixar，是少见的 1995 年完整影像版本。",
      "Full video of the Smithsonian Computer History oral history interview (~75 min), conducted by Daniel Morrow. Covers everything from Apple's early days to NeXT and Pixar. A rare full-length 1995 video version.",
      { duration_sec: 4500 }
    ),
  },
  // 2000 Macworld iCEO drop — short clip
  {
    eventId: "jobs-2000-01-05-permanent-ceo",
    src: youtubeSource(
      "youtube-macworld-2000-iceo",
      "SjlLG1EzJ2k",
      "Macworld 2000: Steve Jobs drops the \"i\" in iCEO",
      "JC",
      "乔布斯在 Macworld 2000 上正式去掉 \"interim CEO\" 头衔的著名片段。",
      "The famous clip of Jobs dropping the \"interim CEO\" title at Macworld 2000.",
      {
        duration_sec: 200,
        quotes: [
          {
            text: "Today, I'm pleased to announce that I'm dropping the \"interim\" title.",
            text_zh: "今天我很高兴地宣布——我把 \"临时\" 这两个字去掉了。",
            speaker: "Steve Jobs",
            context: "Macworld 2000 上正式从 iCEO 变为 CEO",
          },
        ],
      }
    ),
  },
  // 2003 iTunes Music Store — full archive video
  {
    eventId: "jobs-2003-04-28-itunes-music-store",
    src: archiveSource(
      "archive-itunes-store-launch",
      "2003-04-28-i-tunes-music-store-usa-intro",
      "Apple Special Event: April 2003 — iTunes Music Store launch",
      "iTunes Music Store 发布会完整录像。乔布斯亲自演示购买流程：99 美分一首、9.99 美元一张专辑、可以随便复制到无限多的 iPod。\"对，不就是去买唱片那么简单。\"",
      "Full recording of the iTunes Music Store launch event. Jobs demos the new purchase flow personally: 99¢ per song, $9.99 per album, copy to unlimited iPods.",
      {
        duration_sec: 3965,
        quotes: [
          {
            text: "We've decided to leverage the platform we have, the iPod, and combine it with a new on-line music store, the iTunes Music Store. Together they're a system for legally acquiring music and managing it. And it's revolutionary.",
            text_zh: "我们决定利用现有的 iPod 平台，再加上一个全新的在线音乐商店——iTunes Music Store。这两个加在一起，就是一个合法获取并管理音乐的系统。这是革命性的。",
            speaker: "Steve Jobs",
            context: "iTunes Music Store 发布会的核心定调",
          },
        ],
      }
    ),
  },
  // 2008 iPhone SDK roadmap — full archive video
  {
    eventId: "jobs-2008-03-06-iphone-sdk",
    src: archiveSource(
      "archive-iphone-sdk-2008",
      "3-iphone-software",
      "Apple Special Event March 2008 — iPhone Software Roadmap",
      "iPhone SDK 路线图发布会完整录像（约 75 分钟）。Apple 转身：从去年坚持的 Web App 路线，正式开放原生 SDK 与 App Store。Phil Schiller、Scott Forstall 等高管也都上台。",
      "Full recording of the iPhone SDK roadmap event (~75 min). Apple reverses course from last year's web-only stance and officially opens up the native SDK and announces the App Store. Phil Schiller, Scott Forstall and others present alongside Jobs.",
      { duration_sec: 4500 }
    ),
  },
  // 2008 MacBook Air — supplement with full Macworld 2008 keynote
  {
    eventId: "jobs-2008-01-15-macbook-air",
    src: archiveSource(
      "archive-macworld-2008-full",
      "972345688g-1-ip",
      "Macworld 2008 Full Keynote",
      "Macworld 2008 完整 keynote（约 90 分钟），包含 Time Capsule、iTunes Movie Rentals 与 MacBook Air 完整发布。乔布斯从牛皮纸袋里抽出 MacBook Air 的著名片段就在此。",
      "Full Macworld 2008 keynote (~90 min), including Time Capsule, iTunes Movie Rentals, and the full MacBook Air launch — including the famous moment of Jobs pulling MacBook Air from a manila envelope."
    ),
  },
  // 2010 iPad keynote — full archive
  {
    eventId: "jobs-2010-01-27-ipad",
    src: archiveSource(
      "archive-ipad-keynote",
      "11-ipad",
      "Apple Special Event January 2010 — iPad Introduction",
      "iPad 发布会完整录像（约 90 分钟）。乔布斯坐在皮椅上演示用 iPad 浏览网页、读邮件、看照片，称它是\"位于 iPhone 与笔记本之间的第三类设备\"。这是他生前主持的最后一场重大新品发布。",
      "Full recording of the iPad introduction (~90 min). Jobs demos web, email, photos from a leather chair, calling iPad a \"third category device\" between iPhone and laptop. The last major product launch he would personally lead.",
      {
        duration_sec: 5400,
        quotes: [
          {
            text: "It's so much more intimate than a laptop, and it's so much more capable than a smartphone.",
            text_zh: "它比笔记本电脑要亲密得多，也比智能手机能干得多。",
            speaker: "Steve Jobs",
            context: "iPad 的核心定位——介于两者之间但都不是",
          },
        ],
      }
    ),
  },
  // 2010 iPhone 4 — full WWDC 2010
  {
    eventId: "jobs-2010-06-07-iphone-4",
    src: archiveSource(
      "archive-wwdc-2010-iphone4",
      "apple_wwdc_2010_keynote_address_202109",
      "WWDC 2010 — iPhone 4 Introduction",
      "WWDC 2010 主题演讲完整录像（约 113 分钟）。乔布斯发布 iPhone 4：FaceTime、Retina 显示屏、双玻璃、不锈钢边框。著名的现场 Wi-Fi 故障也在这场——他不得不请观众关掉 WiFi 才能完成演示。",
      "Full WWDC 2010 keynote (~113 min). Jobs introduces iPhone 4: FaceTime, Retina display, double-glass, stainless steel frame. Includes the famous live Wi-Fi failure where he had to ask the audience to turn off WiFi.",
      { duration_sec: 6767 }
    ),
  },
  // 2011 WWDC iCloud — his last keynote
  {
    eventId: "jobs-2011-06-06-wwdc-icloud",
    src: archiveSource(
      "archive-wwdc-2011-icloud",
      "wwdc-2011",
      "WWDC 2011 Keynote — Mac OS X Lion, iOS 5, iCloud",
      "WWDC 2011 主题演讲完整录像（约 118 分钟）。乔布斯生前最后一场公开主持的 keynote。发布 OS X Lion、iOS 5 与 iCloud——把数字中心从 PC 转移到云端。三个月后他辞去 CEO 职务，五个月后去世。",
      "Full WWDC 2011 keynote (~118 min). The last keynote Jobs would personally host. Introduces OS X Lion, iOS 5, and iCloud — moving the digital hub from the PC to the cloud. He resigned as CEO three months later, died five months later.",
      {
        duration_sec: 7104,
        quotes: [
          {
            text: "We're going to demote the PC and the Mac to just be a device. We're going to move the digital hub, the center of your digital life, into the cloud.",
            text_zh: "我们要把 PC 和 Mac 降级为\"只是一台设备\"。我们要把数字生活的中心——\"数字中枢\"——搬到云端去。",
            speaker: "Steve Jobs",
            context: "iCloud 发布的核心定调，标志着 Apple 的下一个十年方向",
          },
        ],
      }
    ),
  },
];

// === 2. New events ===
const NEW_EVENTS = [
  // === 1980 ===
  {
    id: "jobs-1980-presentation",
    person_id: "jobs",
    date: "1980-01-01",
    date_precision: "year",
    type: "speech",
    title: "1980 年罕见早期演讲：\"Insanely Great\"",
    title_en: "1980 Rare Early Presentation: \"Insanely Great\"",
    summary: "目前公开能看到的最早一段乔布斯完整演讲录像之一（约 22 分钟），地点是一次内部销售/合作伙伴活动。彼时 25 岁的乔布斯介绍 Apple 的愿景，已经能听到他后来反复使用的 \"insanely great\"、\"changing the world\" 等核心叙事的雏形。",
    summary_en: "One of the earliest publicly available full-length Jobs presentations (~22 min), recorded at an internal Apple sales/partner event. At 25, Jobs lays out his vision for Apple — the seeds of the \"insanely great\" and \"changing the world\" narratives he would repeat for decades.",
    location: "Apple Internal Event, USA",
    tags: ["早期", "Apple", "演讲", "经典"],
    sources: [
      youtubeSource(
        "youtube-jobs-1980",
        "0lvMgMrNDlg",
        "Steve Jobs rare footage conducting a presentation on 1980 (Insanely Great)",
        "naji1234",
        "1980 年乔布斯早期演讲完整录像（约 22 分钟）。",
        "Full recording of Jobs's early 1980 presentation (~22 min).",
        { duration_sec: 1320, primary: true }
      ),
    ],
  },

  // === 1995 ===
  {
    id: "jobs-1995-triumph-of-the-nerds",
    person_id: "jobs",
    date: "1995-04-13",
    date_precision: "day",
    type: "interview",
    title: "PBS 纪录片《Triumph of the Nerds》乔布斯采访",
    title_en: "PBS \"Triumph of the Nerds\" Steve Jobs Interview",
    summary: "Robert Cringely 制作的 1996 年 PBS 三集纪录片，乔布斯在其中接受深度采访。著名的 \"Microsoft has no taste\"（微软毫无品味）评论就出自这部片子。完整版可在 archive.org 上看到，包括乔布斯、盖茨、沃兹尼亚克的 1995 年采访片段。",
    summary_en: "The 1996 three-part PBS documentary by Robert Cringely featuring an extended Jobs interview. The famous \"Microsoft has no taste\" remark comes from this doc. Full version on archive.org includes 1995 interviews with Jobs, Gates, and Wozniak.",
    location: "Filmed at NeXT, Redwood City, CA (and various)",
    key: true,
    tags: ["Triumph of the Nerds", "PBS", "纪录片", "经典"],
    sources: [
      archiveSource(
        "archive-triumph-of-the-nerds",
        "triumph_of_the_nerds",
        "Triumph of the Nerds",
        "PBS 1996 三集纪录片完整版，包含乔布斯、盖茨、沃兹的 1995 年采访。",
        "Full 1996 PBS three-part documentary including 1995 interviews with Jobs, Gates, and Woz.",
        {
          quotes: [
            {
              text: "The only problem with Microsoft is they just have no taste. They have absolutely no taste. And I don't mean that in a small way, I mean that in a big way, in the sense that they don't think of original ideas, and they don't bring much culture into their products.",
              text_zh: "微软唯一的问题是他们毫无品味——一点品味都没有。我说的不是小事，而是大事：他们不出原创想法，也几乎不把任何文化感带进产品里。",
              speaker: "Steve Jobs",
              context: "Triumph of the Nerds 采访中关于微软最著名的评论",
            },
          ],
        }
      ),
    ],
  },

  // === 1997 ===
  {
    id: "jobs-1997-01-07-macworld-sf-jobs-returns",
    person_id: "jobs",
    date: "1997-01-07",
    date_precision: "day",
    type: "speech",
    title: "Macworld SF 1997：乔布斯重返 Apple 公开亮相",
    title_en: "Macworld SF 1997: Jobs Returns to Apple Stage",
    summary: "Apple 在 1996-12-20 宣布收购 NeXT 后，乔布斯第一次以\"NeXT 创始人 + Apple 顾问\"身份出现在 Macworld 上。当时的 CEO Gil Amelio 把他请上台演示 OpenStep / Rhapsody——这是他事实上回归 Apple 的标志时刻。",
    summary_en: "After Apple announced the NeXT acquisition on Dec 20, 1996, this was Jobs's first public Macworld appearance — as NeXT founder + Apple advisor. CEO Gil Amelio invites him on stage to demo OpenStep/Rhapsody. The de facto moment of his return to Apple.",
    location: "Moscone Center, San Francisco, CA",
    key: true,
    tags: ["Macworld", "回归 Apple", "NeXT", "OpenStep"],
    sources: [
      archiveSource(
        "archive-macworld-1997-jobs-return",
        "ne-xt-open-step-and-the-return-of-steve-jobs-to-apple",
        "NeXT, OpenStep, and the Return of Steve Jobs to Apple — Macworld San Francisco 1997",
        "Macworld SF 1997 keynote 完整录像。Amelio 把乔布斯请上台演示 OpenStep。",
        "Full Macworld SF 1997 keynote recording. Amelio brings Jobs on stage to demo OpenStep."
      ),
    ],
  },
  {
    id: "jobs-1997-05-13-wwdc-fireside",
    person_id: "jobs",
    date: "1997-05-13",
    date_precision: "day",
    type: "speech",
    title: "WWDC 1997 闭幕 Q&A：\"从客户体验出发，再倒推回技术\"",
    title_en: "WWDC 1997 Fireside Chat Q&A: \"Start with the customer experience\"",
    summary: "回归 Apple 担任顾问几个月后，乔布斯主持 WWDC 1997 闭幕 Q&A。一位开发者尖锐质问 Apple 砍掉 OpenDoc 的决定，乔布斯坦率回应——著名的\"你必须从客户体验出发，再倒推回需要什么技术\"就出自这场，被广泛视为他产品哲学最清晰的一次现场表述。",
    summary_en: "A few months after returning to Apple as advisor, Jobs hosts the WWDC 1997 closing Q&A. A developer sharply challenges Apple's decision to kill OpenDoc, and Jobs answers candidly — including his famous \"You've got to start with the customer experience and work backwards to the technology,\" widely regarded as his clearest live articulation of his product philosophy.",
    location: "San Jose Convention Center, San Jose, CA",
    key: true,
    tags: ["WWDC", "OpenDoc", "Q&A", "经典"],
    sources: [
      archiveSource(
        "archive-wwdc-1997-fireside",
        "wwdc-1997-fireside-chat-steve-jobs",
        "Apple WWDC 1997 Closing Keynote — Fireside Chat with Steve Jobs",
        "WWDC 1997 闭幕 fireside chat 完整视频版（VHS Vault 收录），由 Jason Molenda 1997 年原始录制。",
        "Full video of the WWDC 1997 fireside chat (from the VHS Vault), originally recorded by Jason Molenda in 1997.",
        {
          quotes: [
            {
              text: "You've got to start with the customer experience and work backwards to the technology. You can't start with the technology and try to figure out where you're going to try to sell it. And I've made this mistake probably more than anybody else in this room. And I've got the scar tissue to prove it.",
              text_zh: "你必须从客户体验出发，再倒推回技术——你不能反过来：先有技术，然后再去想这能拿来卖给谁。这个错误我犯过的次数恐怕比这屋里任何人都多，留下的伤疤可以作证。",
              speaker: "Steve Jobs",
              context: "对开发者批评 Apple 砍 OpenDoc 的回应；常被认为是他产品方法论最清晰的一次表述",
            },
          ],
        }
      ),
      youtubeSource(
        "youtube-wwdc-1997-customer-clip",
        "EZll3dJ2AjY",
        "Steve Jobs | Start with Customer Experience and Work Backwards to the Technology",
        "PodiumVC",
        "WWDC 1997 现场最经典片段的独立 YouTube 上传。",
        "Standalone YouTube clip of the most famous moment from the WWDC 1997 Q&A."
      ),
    ],
  },

  // === 1998 ===
  {
    id: "jobs-1998-05-11-wwdc-os-x-strategy",
    person_id: "jobs",
    date: "1998-05-11",
    date_precision: "day",
    type: "speech",
    title: "WWDC 1998 主题演讲：揭示 OS X 战略",
    title_en: "WWDC 1998 Keynote: OS X Strategy",
    summary: "回归 Apple 后第一次主持完整的 WWDC keynote。宣布把 NeXT 的操作系统技术和现有的 Mac OS 合并成下一代 OS X，并阐述 Carbon、Cocoa、Java 三套 API 战略。这是后来主导 Apple 十年的软件路线图的起点。",
    summary_en: "His first full WWDC keynote since returning to Apple. Announces merging NeXT's OS technology with the existing Mac OS into the next-generation OS X, and lays out the Carbon / Cocoa / Java three-API strategy — the software roadmap that would shape Apple for the next decade.",
    location: "San Jose Convention Center, San Jose, CA",
    tags: ["WWDC", "Mac OS X", "NeXT"],
    sources: [
      archiveSource(
        "archive-wwdc-1998",
        "open-kynt",
        "WWDC 1998 Keynote",
        "WWDC 1998 主题演讲完整录像（约 89 分钟）。",
        "Full WWDC 1998 keynote recording (~89 min).",
        { duration_sec: 5351 }
      ),
    ],
  },

  // === 1999 ===
  {
    id: "jobs-1999-01-07-macworld-sf",
    person_id: "jobs",
    date: "1999-01-07",
    date_precision: "day",
    type: "speech",
    title: "Macworld SF 1999 主题演讲",
    title_en: "Macworld San Francisco 1999 Keynote",
    summary: "回归后的第一场完整 Macworld SF。发布五种颜色版的 iMac、Power Mac G3 蓝白机箱、QuickTime 4 公测，正式宣布 Apple 已重回盈利轨道。",
    summary_en: "His first full Macworld SF since returning. Introduces the five-color iMac (Tangerine, Strawberry, Lime, Blueberry, Grape), the blue-and-white Power Mac G3, QuickTime 4 public beta, and announces Apple is fully profitable again.",
    location: "Moscone Center, San Francisco, CA",
    tags: ["Macworld", "iMac"],
    sources: [
      archiveSource(
        "archive-mwsf-1999",
        "19990107-macworld-san-fransisco-1999-keynote-address_202108",
        "Macworld San Francisco 1999",
        "Macworld SF 1999 keynote 完整录像。",
        "Full Macworld SF 1999 keynote recording."
      ),
    ],
  },
  {
    id: "jobs-1999-05-10-wwdc",
    person_id: "jobs",
    date: "1999-05-10",
    date_precision: "day",
    type: "speech",
    title: "WWDC 1999 主题演讲",
    title_en: "WWDC 1999 Keynote",
    summary: "演示 Mac OS X Server 1.0、Mac OS 9 预览、QuickTime Streaming Server。继续推进 OS X 转型路线图。",
    summary_en: "Demos Mac OS X Server 1.0, Mac OS 9 preview, and QuickTime Streaming Server. Continues to push the OS X transition roadmap.",
    location: "San Jose Convention Center, San Jose, CA",
    tags: ["WWDC", "Mac OS X"],
    sources: [
      archiveSource(
        "archive-wwdc-1999",
        "1999-05-10-wwdc-keynote-bad-audio",
        "WWDC 1999",
        "WWDC 1999 keynote 完整录像（音质较差）。",
        "Full WWDC 1999 keynote recording (audio quality is rough)."
      ),
    ],
  },
  {
    id: "jobs-1999-07-21-macworld-ny-ibook",
    person_id: "jobs",
    date: "1999-07-21",
    date_precision: "day",
    type: "speech",
    title: "Macworld New York 1999：发布 iBook",
    title_en: "Macworld New York 1999: Introduces iBook",
    summary: "发布初代 iBook——便携式版的 iMac，与 AirPort 无线网卡同时推出，让笔记本第一次可以无线上网。乔布斯在台上接受空中\"扔接\"的方式让笔记本断开连线又联回，全场震撼。",
    summary_en: "Introduces the original iBook — a portable iMac — alongside AirPort wireless networking, the first time a consumer laptop could go fully wireless. Jobs famously demos by walking the iBook through the air without losing connection.",
    location: "Javits Center, New York, NY",
    key: true,
    tags: ["Macworld", "iBook", "AirPort", "无线网络"],
    sources: [
      archiveSource(
        "archive-mwny-1999",
        "1999-07-21-macworld-new-york-keynote",
        "Macworld New York Keynote 1999",
        "Macworld NY 1999 keynote 完整录像（约 90 分钟）。",
        "Full Macworld NY 1999 keynote recording (~90 min)."
      ),
    ],
  },

  // === 2000 ===
  {
    id: "jobs-2000-07-19-macworld-ny-cube",
    person_id: "jobs",
    date: "2000-07-19",
    date_precision: "day",
    type: "speech",
    title: "Macworld New York 2000：发布 Power Mac G4 Cube",
    title_en: "Macworld New York 2000: Introduces the Power Mac G4 Cube",
    summary: "发布 Power Mac G4 Cube——一块 8 英寸见方、悬浮在透明亚克力外壳里的电脑。商业上不算成功（一年后停产），但被现代艺术博物馆永久收藏，是乔布斯设计美学的极致代表作之一。",
    summary_en: "Introduces the Power Mac G4 Cube — a computer suspended inside an 8-inch transparent acrylic shell. A commercial flop (discontinued after a year) but acquired by MoMA's permanent collection. One of the purest expressions of Jobs's design aesthetic.",
    location: "Javits Center, New York, NY",
    tags: ["Macworld", "G4 Cube", "工业设计"],
    sources: [
      archiveSource(
        "archive-mwny-2000",
        "2000-07-19-macworld-new-york-keynote",
        "Macworld New York Keynote 2000",
        "Macworld NY 2000 keynote 完整录像（约 102 分钟）。",
        "Full Macworld NY 2000 keynote recording (~102 min)."
      ),
    ],
  },

  // === 2001 ===
  {
    id: "jobs-2001-01-09-macworld-sf-titanium",
    person_id: "jobs",
    date: "2001-01-09",
    date_precision: "day",
    type: "speech",
    title: "Macworld SF 2001：发布 PowerBook G4 钛合金 + iTunes",
    title_en: "Macworld SF 2001: Introduces Titanium PowerBook G4 + iTunes",
    summary: "发布钛合金外壳的 PowerBook G4——1 英寸厚、5.3 磅，第一台真正薄到能在飞机经济舱里打开使用的 Mac 笔记本。同场发布 iTunes 1.0，为 9 个月后的 iPod 埋下伏笔。",
    summary_en: "Introduces the Titanium PowerBook G4 — 1 inch thick, 5.3 lbs, the first Mac laptop genuinely thin enough to use in coach. Also introduces iTunes 1.0, foreshadowing the iPod nine months later.",
    location: "Moscone Center, San Francisco, CA",
    tags: ["Macworld", "PowerBook", "iTunes"],
    sources: [
      archiveSource(
        "archive-mwsf-2001",
        "mwsf01_300",
        "Macworld San Francisco January 2001 Steve Jobs Keynote Address",
        "Macworld SF 2001 keynote 完整录像。同时发布 iTunes 1.0。",
        "Full Macworld SF 2001 keynote recording. Includes iTunes 1.0 launch."
      ),
      youtubeSource(
        "youtube-mwsf-2001-itunes",
        "KLWom93pEHY",
        "Macworld 2001: Apple introduces iTunes",
        "JC",
        "iTunes 1.0 发布片段独立剪辑。",
        "Standalone clip of the iTunes 1.0 introduction."
      ),
    ],
  },

  // === 2002 ===
  {
    id: "jobs-2002-01-07-macworld-sf-imac-g4",
    person_id: "jobs",
    date: "2002-01-07",
    date_precision: "day",
    type: "speech",
    title: "Macworld SF 2002：发布 iMac G4（向日葵 iMac）",
    title_en: "Macworld SF 2002: Introduces the iMac G4 (\"Sunflower\" iMac)",
    summary: "发布带可旋转支臂的 iMac G4——半球形底座 + 15 寸 LCD 屏 + 不锈钢悬臂，被时代杂志评为该年度最佳设计。乔布斯亲自把屏幕掰来掰去，演示\"屏幕跟着你转\"的设计哲学。",
    summary_en: "Introduces the iMac G4 with swivel arm — hemispherical base + 15\" LCD + stainless-steel arm, named TIME's Design of the Year. Jobs personally demos the screen rotating in every direction, showcasing the \"the screen follows you\" design philosophy.",
    location: "Moscone Center, San Francisco, CA",
    tags: ["Macworld", "iMac G4", "工业设计"],
    sources: [
      archiveSource(
        "archive-mwsf-2002",
        "2002-01-07-macworld-san-francisco-keynote",
        "Macworld San Francisco Keynote 2002",
        "Macworld SF 2002 keynote 完整录像（约 109 分钟）。",
        "Full Macworld SF 2002 keynote recording (~109 min)."
      ),
    ],
  },

  // === 2003 ===
  {
    id: "jobs-2003-01-07-macworld-sf-safari",
    person_id: "jobs",
    date: "2003-01-07",
    date_precision: "day",
    type: "speech",
    title: "Macworld SF 2003：发布 Safari 浏览器与 PowerBook G4 17/12",
    title_en: "Macworld SF 2003: Introduces Safari, PowerBook G4 17\" and 12\"",
    summary: "发布 Apple 自研浏览器 Safari（基于 KHTML，后演化为 WebKit），并推出 17 英寸（最大）和 12 英寸（最小）的 PowerBook G4 双产品线。Safari 后来成为 iPhone 时代移动浏览器的基石。",
    summary_en: "Introduces Safari (Apple's own browser, based on KHTML, later evolving into WebKit) and the 17\" (largest) and 12\" (smallest) PowerBook G4. Safari would later become the foundation of mobile browsers in the iPhone era.",
    location: "Moscone Center, San Francisco, CA",
    tags: ["Macworld", "Safari", "PowerBook", "WebKit"],
    sources: [
      archiveSource(
        "archive-mwsf-2003",
        "macworld-2003-full-keynote",
        "Macworld 2003 Full Keynote",
        "Macworld SF 2003 keynote 完整录像（约 120 分钟）。",
        "Full Macworld SF 2003 keynote recording (~120 min)."
      ),
    ],
  },
  {
    id: "jobs-2003-10-16-itunes-windows",
    person_id: "jobs",
    date: "2003-10-16",
    date_precision: "day",
    type: "speech",
    title: "Apple Special Event 2003 年 10 月：iTunes for Windows",
    title_en: "Apple Special Event October 2003: iTunes for Windows",
    summary: "把 iTunes 移植到 Windows——\"地狱已经结冰了。\" 同时宣布与 AOL 等 Windows 巨头合作，让 iPod 和 iTunes Music Store 真正面向全球用户。这是把 iPod 推向主流的决定性一步。",
    summary_en: "Brings iTunes to Windows — \"Hell froze over.\" Announces partnerships with AOL and others, opening iPod and the iTunes Music Store to the entire Windows world. The decisive step that pushed iPod into the mainstream.",
    location: "Moscone Center, San Francisco, CA",
    key: true,
    tags: ["iTunes", "Windows", "iPod"],
    sources: [
      archiveSource(
        "archive-itunes-windows",
        "2003-10-16-i-tunes-for-windows-intro",
        "Apple Special Event October 2003",
        "2003 年 10 月 16 日 iTunes for Windows 发布会完整录像。",
        "Full recording of the October 16, 2003 iTunes for Windows launch event.",
        {
          quotes: [
            {
              text: "Hell froze over.",
              text_zh: "地狱结冰了。",
              speaker: "Steve Jobs",
              context: "宣布 iTunes 登陆 Windows 时的著名调侃——多年来 Apple 的服务从不上 Windows",
            },
          ],
        }
      ),
    ],
  },

  // === 2004 ===
  {
    id: "jobs-2004-01-06-macworld-sf-ilife",
    person_id: "jobs",
    date: "2004-01-06",
    date_precision: "day",
    type: "speech",
    title: "Macworld SF 2004：发布 iLife '04（含 GarageBand）",
    title_en: "Macworld SF 2004: Introduces iLife '04 (including GarageBand)",
    summary: "发布 iLife '04，首次包含 GarageBand——把专业级音乐制作软件带给普通人。乔布斯邀请 John Mayer 上台用 GarageBand 现场即兴，演示\"你的孩子也能做唱片\"。",
    summary_en: "Introduces iLife '04, including GarageBand for the first time — bringing pro-level music production to ordinary people. Jobs brings John Mayer on stage to jam live with GarageBand, demonstrating \"your kid can record an album.\"",
    location: "Moscone Center, San Francisco, CA",
    tags: ["Macworld", "iLife", "GarageBand", "John Mayer"],
    sources: [
      archiveSource(
        "archive-mwsf-2004",
        "mwsf-2004",
        "Macworld San Francisco 2004",
        "Macworld SF 2004 keynote 完整录像（约 121 分钟）。",
        "Full Macworld SF 2004 keynote recording (~121 min)."
      ),
      youtubeSource(
        "youtube-mwsf-2004-garageband",
        "RYTkVh33Ags",
        "John Mayer at Macworld SF 2004 - GarageBand Introduction",
        "Dick Mittens",
        "John Mayer 与乔布斯在 Macworld 2004 上演示 GarageBand 的著名片段。",
        "The famous clip of John Mayer and Jobs demoing GarageBand at Macworld 2004."
      ),
    ],
  },
  {
    id: "jobs-2004-06-28-wwdc-tiger",
    person_id: "jobs",
    date: "2004-06-28",
    date_precision: "day",
    type: "speech",
    title: "WWDC 2004：预览 Mac OS X 10.4 Tiger",
    title_en: "WWDC 2004: Previews Mac OS X 10.4 Tiger",
    summary: "预览 Mac OS X 10.4 Tiger，包含 Spotlight 全文搜索、Dashboard 微件、Core Data 等新框架。同场宣布 30 寸 Cinema Display 与 iChat AV 视频会议升级。",
    summary_en: "Previews Mac OS X 10.4 Tiger including Spotlight full-text search, Dashboard widgets, and the Core Data framework. Also announces the 30\" Cinema Display and iChat AV multi-party video conferencing.",
    location: "Moscone Center, San Francisco, CA",
    tags: ["WWDC", "Tiger", "Spotlight", "Cinema Display"],
    sources: [
      archiveSource(
        "archive-wwdc-2004",
        "wwdc-2004",
        "WWDC 2004",
        "WWDC 2004 keynote 完整录像（约 100 分钟）。",
        "Full WWDC 2004 keynote recording (~100 min)."
      ),
      youtubeSource(
        "youtube-wwdc-2004-tiger",
        "-mCbiXFNaNE",
        "Steve Jobs introduces OS X Tiger 30 inch Cinema Display - WWDC 2004",
        "Apple Novinky",
        "WWDC 2004 keynote YouTube 上传版本。",
        "WWDC 2004 keynote uploaded to YouTube."
      ),
    ],
  },

  // === 2005 ===
  {
    id: "jobs-2005-01-11-macworld-sf-mac-mini",
    person_id: "jobs",
    date: "2005-01-11",
    date_precision: "day",
    type: "speech",
    title: "Macworld SF 2005：发布 Mac mini 与 iPod shuffle",
    title_en: "Macworld SF 2005: Introduces Mac mini and iPod shuffle",
    summary: "同场发布两款廉价产品：499 美元起的 Mac mini（最便宜的 Mac，目标 Windows 用户切换），以及 99 美元的 iPod shuffle（无屏幕、最小、随机播放）。乔布斯把 shuffle 直接塞进口香糖包装里演示尺寸。",
    summary_en: "Introduces two budget products at the same event: the Mac mini starting at $499 (cheapest Mac ever, targeting Windows switchers), and the $99 iPod shuffle (no screen, smallest yet, random playback). Jobs slips the shuffle into a pack of gum to demo the size.",
    location: "Moscone Center, San Francisco, CA",
    tags: ["Macworld", "Mac mini", "iPod shuffle"],
    sources: [
      archiveSource(
        "archive-mwsf-2005",
        "mwsf-2005",
        "Macworld 2005",
        "Macworld SF 2005 keynote 完整录像（约 116 分钟）。",
        "Full Macworld SF 2005 keynote recording (~116 min)."
      ),
    ],
  },
  {
    id: "jobs-2005-06-06-wwdc-intel",
    person_id: "jobs",
    date: "2005-06-06",
    date_precision: "day",
    type: "speech",
    title: "WWDC 2005：宣布 Mac 转向 Intel 处理器",
    title_en: "WWDC 2005: Announces the Intel transition",
    summary: "在 PowerPC 时代结束时一锤定音——宣布从 IBM PowerPC 全面切换到 Intel x86，同时透露 OS X 已经在 Intel 上跑了 5 年（暗中）。同时发布转译层 Rosetta 让旧软件继续能跑。这是 Apple 第三次大规模的 CPU 架构转移，被誉为最干净的一次。",
    summary_en: "The decisive call to end the PowerPC era — announces the full switch from IBM PowerPC to Intel x86, revealing that OS X has been secretly running on Intel for 5 years. Also introduces the Rosetta translation layer so legacy software keeps working. Apple's third major CPU architecture migration, widely considered the cleanest.",
    location: "Moscone Center, San Francisco, CA",
    key: true,
    tags: ["WWDC", "Intel", "架构迁移"],
    sources: [
      archiveSource(
        "archive-wwdc-2005-intel",
        "wwdc-2005",
        "WWDC 2005",
        "WWDC 2005 keynote 完整录像（约 58 分钟），宣布 Intel 转型。",
        "Full WWDC 2005 keynote recording (~58 min), announcing the Intel transition.",
        {
          quotes: [
            {
              text: "It's true. We are going to begin the transition from the PowerPC to Intel processors.",
              text_zh: "是真的。我们将开始从 PowerPC 向 Intel 处理器的转型。",
              speaker: "Steve Jobs",
              context: "WWDC 2005 上正式确认传言数月的 Intel 转型",
            },
          ],
        }
      ),
    ],
  },
  {
    id: "jobs-2005-09-07-ipod-nano",
    person_id: "jobs",
    date: "2005-09-07",
    date_precision: "day",
    type: "speech",
    title: "Apple Special Event 2005 年 9 月：发布 iPod nano",
    title_en: "Apple Special Event September 2005: Introduces iPod nano",
    summary: "发布 iPod nano——铅笔粗细、火柴盒大小、彩色屏幕、全闪存。乔布斯在台上从牛仔裤的小口袋里掏出来一只，全场震惊：原来 iPod mini（销量第一）真的可以缩到这么小。当场宣布 mini 停产。",
    summary_en: "Introduces the iPod nano — pencil-thin, matchbox-sized, color screen, all flash. Jobs pulls one from the small jeans pocket on stage, shocking the audience: the iPod mini (the best-seller) really could be shrunk this much. iPod mini is discontinued on the spot.",
    location: "Moscone Center, San Francisco, CA",
    tags: ["Special Event", "iPod nano"],
    sources: [
      archiveSource(
        "archive-ipod-nano",
        "i-pod-nano-introduction-7-sep-2005",
        "Apple Special Event September 2005",
        "iPod nano 发布会完整录像（约 46 分钟）。",
        "Full iPod nano launch event recording (~46 min)."
      ),
    ],
  },

  // === 2006 ===
  {
    id: "jobs-2006-01-10-macworld-sf-intel-macs",
    person_id: "jobs",
    date: "2006-01-10",
    date_precision: "day",
    type: "speech",
    title: "Macworld SF 2006：首批 Intel Mac（MacBook Pro + iMac）",
    title_en: "Macworld SF 2006: First Intel Macs (MacBook Pro + iMac)",
    summary: "发布首批 Intel 处理器的 Mac——MacBook Pro（取代 PowerBook 的新品牌）与 Intel iMac，比承诺的时间提前半年完成 Intel 转型。\"PowerBook G4 已经达到了我们能做到的极限。我们需要更多。\"",
    summary_en: "Introduces the first Intel-based Macs — MacBook Pro (a new brand replacing PowerBook) and the Intel iMac — completing the Intel transition six months ahead of schedule. \"PowerBook G4 has reached the limit of what we can do. We need more.\"",
    location: "Moscone Center, San Francisco, CA",
    key: true,
    tags: ["Macworld", "Intel", "MacBook Pro", "iMac"],
    sources: [
      archiveSource(
        "archive-mwsf-2006",
        "MWSF-2006",
        "Macworld 2006",
        "Macworld SF 2006 keynote 完整录像（约 89 分钟）。首批 Intel Mac 发布。",
        "Full Macworld SF 2006 keynote recording (~89 min). First Intel Macs launch."
      ),
    ],
  },
  {
    id: "jobs-2006-08-07-wwdc",
    person_id: "jobs",
    date: "2006-08-07",
    date_precision: "day",
    type: "speech",
    title: "WWDC 2006：发布 Mac Pro，预览 Mac OS X Leopard",
    title_en: "WWDC 2006: Introduces Mac Pro, previews Mac OS X Leopard",
    summary: "发布最后一款 Mac 完成 Intel 转型——Mac Pro，并预览 Mac OS X 10.5 Leopard 的十大\"top secret\"特性。WWDC 2006 也是第一次史蒂夫·乔布斯关键的健康问题在外界开始引发议论的场合（他明显消瘦）。",
    summary_en: "Introduces the Mac Pro — the last Mac to complete the Intel transition — and previews the \"top secret\" features of Mac OS X 10.5 Leopard. WWDC 2006 is also when Jobs's noticeable weight loss first sparked public health speculation.",
    location: "Moscone Center, San Francisco, CA",
    tags: ["WWDC", "Mac Pro", "Leopard"],
    sources: [
      archiveSource(
        "archive-wwdc-2006",
        "steve-jobs-2006-7-wwdc-presentation",
        "WWDC 2006 Keynote",
        "WWDC 2006 keynote 完整录像（约 84 分钟）。",
        "Full WWDC 2006 keynote recording (~84 min)."
      ),
    ],
  },

  // === 2007 ===
  {
    id: "jobs-2007-06-11-wwdc-iphone-web-apps",
    person_id: "jobs",
    date: "2007-06-11",
    date_precision: "day",
    type: "speech",
    title: "WWDC 2007：iPhone 第三方开发是 Web App、Safari for Windows",
    title_en: "WWDC 2007: iPhone third-party = Web Apps, Safari for Windows",
    summary: "WWDC 2007 keynote。当时（iPhone 上市前 18 天）乔布斯坚持 iPhone 不开放原生 SDK，第三方应用全部走 Safari Web App 路线——是他这一时期最有争议的产品决定。同场宣布 Safari for Windows，对 IE/Firefox 发起进攻。",
    summary_en: "The WWDC 2007 keynote, 18 days before iPhone shipped. Jobs insists no native SDK — all third-party apps must be Safari web apps — the most contested product call of his second Apple era. Also launches Safari for Windows, attacking IE and Firefox.",
    location: "Moscone Center, San Francisco, CA",
    tags: ["WWDC", "iPhone", "Safari", "Web App"],
    sources: [
      archiveSource(
        "archive-wwdc-2007",
        "wwdc2007_iphone1000_100",
        "WWDC 2007",
        "WWDC 2007 keynote 完整录像（约 84 分钟）。",
        "Full WWDC 2007 keynote recording (~84 min)."
      ),
    ],
  },
  {
    id: "jobs-2007-09-05-ipod-touch",
    person_id: "jobs",
    date: "2007-09-05",
    date_precision: "day",
    type: "speech",
    title: "Apple Special Event 2007 年 9 月：发布 iPod touch",
    title_en: "Apple Special Event September 2007: Introduces iPod touch",
    summary: "发布 iPod touch——\"没有电话功能的 iPhone\"，把 iPhone 的多点触控界面带给全部 iPod 用户。同场把 iPhone 价格从 599 美元砍到 399 美元（早期买家集体抗议，乔布斯随后给每人 100 美元 Apple Store credit）。",
    summary_en: "Introduces the iPod touch — \"an iPhone without the phone\" — bringing iPhone's multi-touch interface to all iPod users. Also slashes iPhone price from $599 to $399 (early buyers protest; Jobs gives them $100 Apple Store credit).",
    location: "Moscone Center, San Francisco, CA",
    tags: ["Special Event", "iPod touch", "iPhone"],
    sources: [
      archiveSource(
        "archive-ipod-touch",
        "apple-event-september-2007",
        "Apple Special Event September 2007",
        "iPod touch 发布会完整录像（约 84 分钟）。",
        "Full iPod touch launch event recording (~84 min)."
      ),
    ],
  },

  // === 2008 ===
  {
    id: "jobs-2008-06-09-wwdc-app-store",
    person_id: "jobs",
    date: "2008-06-09",
    date_precision: "day",
    type: "speech",
    title: "WWDC 2008：发布 iPhone 3G、App Store、MobileMe",
    title_en: "WWDC 2008: Introduces iPhone 3G, App Store, MobileMe",
    summary: "发布 iPhone 3G、App Store（开放原生 SDK，结束去年的 web-only 策略）、MobileMe 云同步服务。App Store 是这次 keynote 的关键——把 iPhone 从一个手机变成一个平台，从此移动经济模型彻底改变。",
    summary_en: "Introduces iPhone 3G, the App Store (opening the native SDK and reversing last year's web-only stance), and MobileMe cloud sync. The App Store is the headline — turning iPhone from a phone into a platform and permanently changing the mobile economy.",
    location: "Moscone Center, San Francisco, CA",
    key: true,
    tags: ["WWDC", "App Store", "iPhone 3G"],
    sources: [
      archiveSource(
        "archive-wwdc-2008",
        "4-wwdc-2008",
        "WWDC 2008",
        "WWDC 2008 keynote 完整录像（约 104 分钟），App Store 与 iPhone 3G 发布会。",
        "Full WWDC 2008 keynote recording (~104 min), App Store and iPhone 3G launch."
      ),
    ],
  },
  {
    id: "jobs-2008-10-14-special-event-aluminum-macbook",
    person_id: "jobs",
    date: "2008-10-14",
    date_precision: "day",
    type: "speech",
    title: "Apple Special Event 2008 年 10 月：铝合金一体成型 MacBook",
    title_en: "Apple Special Event October 2008: Unibody Aluminum MacBook",
    summary: "发布全新的铝合金一体成型（unibody）MacBook 与 MacBook Pro，介绍 Apple 用 CNC 数控机床直接从一整块铝里铣出机身的工艺——这种工艺日后成为整个 Apple 产品线的标志。",
    summary_en: "Introduces the all-new aluminum unibody MacBook and MacBook Pro, showcasing Apple's CNC-machining process that carves the laptop body from a single block of aluminum — the manufacturing technique that would later define the entire Apple product line.",
    location: "Town Hall, Apple HQ, Cupertino, CA",
    tags: ["Special Event", "MacBook", "Unibody", "工业设计"],
    sources: [
      archiveSource(
        "archive-special-oct-2008",
        "6-october-2008",
        "Apple Special Event October 2008",
        "2008 年 10 月特别活动完整录像，发布 unibody MacBook。",
        "Full October 2008 special event recording, launching the unibody MacBook."
      ),
    ],
  },

  // === 2010 ===
  {
    id: "jobs-2010-04-08-special-event-iphone-os-4",
    person_id: "jobs",
    date: "2010-04-08",
    date_precision: "day",
    type: "speech",
    title: "Apple Special Event 2010 年 4 月：发布 iPhone OS 4 与 iAd",
    title_en: "Apple Special Event April 2010: iPhone OS 4 and iAd",
    summary: "发布 iPhone OS 4 七大新功能——多任务、文件夹、统一收件箱、iBooks、企业管理、Game Center、iAd 广告平台。iAd 后来失败但显示了乔布斯试图改造广告业的野心。",
    summary_en: "Announces iPhone OS 4 with seven \"tentpole\" features — multitasking, folders, unified inbox, iBooks, enterprise management, Game Center, and the iAd ad platform. iAd would later fail but reflected Jobs's ambition to reshape the ad industry.",
    location: "Town Hall, Apple HQ, Cupertino, CA",
    tags: ["Special Event", "iPhone OS 4", "iAd"],
    sources: [
      archiveSource(
        "archive-special-apr-2010",
        "12-april-2010",
        "Apple Special Event April 2010",
        "2010 年 4 月特别活动完整录像（约 90 分钟）。",
        "Full April 2010 special event recording (~90 min)."
      ),
    ],
  },
  {
    id: "jobs-2010-09-01-special-event-ipod-touch-apple-tv",
    person_id: "jobs",
    date: "2010-09-01",
    date_precision: "day",
    type: "speech",
    title: "Apple Special Event 2010 年 9 月：iPod touch 4 与新 Apple TV",
    title_en: "Apple Special Event September 2010: iPod touch 4 and new Apple TV",
    summary: "发布带 Retina 屏的 iPod touch 第 4 代、彩屏 iPod nano（首次有触控屏的 nano）、99 美元的全新 Apple TV（彻底转向流媒体）、iTunes 10 与 Ping 社交网络（后来失败）。",
    summary_en: "Introduces the iPod touch 4th gen with Retina display, the new color-screen iPod nano (first nano with multi-touch), the new $99 streaming-only Apple TV, plus iTunes 10 and the (later abandoned) Ping social network.",
    location: "Yerba Buena Center, San Francisco, CA",
    tags: ["Special Event", "iPod", "Apple TV", "Ping"],
    sources: [
      archiveSource(
        "archive-special-sept-2010",
        "apple-september-2010-livestream-version",
        "Apple Special Event September 2010 (Livestream Version)",
        "2010 年 9 月特别活动完整直播录像。",
        "Full September 2010 special event livestream recording."
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
