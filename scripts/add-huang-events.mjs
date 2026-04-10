#!/usr/bin/env node
/**
 * Bootstrap Jensen Huang (黄仁勋) events into data/events/huang.json.
 * Idempotent: skips events whose id already exists.
 * Run audit-urls.mjs --write + parse-youtube.mjs --write + verify-embeds.mjs after.
 */
import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "data", "events", "huang.json");
const events = fs.existsSync(filePath)
  ? JSON.parse(fs.readFileSync(filePath, "utf8"))
  : [];
const existingIds = new Set(events.map((e) => e.id));

const HUMAN = { license: "all-rights-reserved", authored_by: "human", mentions: [] };
const CCBYSA = { license: "cc-by-sa", authored_by: "human", mentions: [] };

const wikipediaHuangSource = {
  id: "wikipedia-huang-bio",
  url: "https://en.wikipedia.org/wiki/Jensen_Huang",
  kind: "article",
  title: "Jensen Huang (Wikipedia)",
  publisher: "Wikipedia",
  lang: "en",
  primary: false,
  ...CCBYSA,
};

const wikipediaNvidiaSource = {
  id: "wikipedia-nvidia",
  url: "https://en.wikipedia.org/wiki/Nvidia",
  kind: "article",
  title: "Nvidia (Wikipedia)",
  publisher: "Wikipedia",
  lang: "en",
  primary: false,
  ...CCBYSA,
};

const newEvents = [
  // ──────────────────────────── PERSONAL / EARLY LIFE ────────────────────────────

  {
    id: "huang-1963-02-17-birth",
    person_id: "huang",
    date: "1963-02-17",
    date_precision: "day",
    type: "life",
    title: "黄仁勋出生于台湾台南",
    title_en: "Jensen Huang born in Tainan, Taiwan",
    summary:
      "1963 年 2 月 17 日，黄仁勋（Jen-Hsun Huang）出生于台湾台南——台湾历史上的古都。父亲黄兴泰是化学工程师，母亲罗彩秀是小学教师。黄仁勋是家中次子，5 岁时全家迁居泰国。他的成长背景横跨台湾、泰国和美国三地，这种多元文化经历塑造了他日后的全球视野和韧性。他后来回忆说，童年的不确定性反而教会他面对逆境时的适应力。",
    summary_en:
      "Jen-Hsun (Jensen) Huang was born on February 17, 1963, in Tainan, Taiwan, the historic southern capital. His father was a chemical engineer and his mother a schoolteacher. The family moved to Thailand when Jensen was five, beginning a cross-cultural upbringing that would shape his global outlook.",
    location: "Tainan, Taiwan",
    key: true,
    tags: ["出生", "台南", "童年"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: null,
  },

  {
    id: "huang-1973-move-to-us",
    person_id: "huang",
    date: "1973-01-01",
    date_precision: "year",
    type: "life",
    title: "9 岁被送往美国，就读肯塔基州寄宿学校",
    title_en: "Sent to the US at age 9; attends Oneida Baptist Institute in Kentucky",
    summary:
      "1973 年，越战蔓延至泰国，父母决定将年仅 9 岁的黄仁勋和 10 岁的哥哥作为无人陪伴的未成年人送往美国。两兄弟落脚华盛顿州塔科马的叔叔家，叔叔随即将他们送入肯塔基州奥奈达浸信会学院——他以为那是一所精英寄宿学校，实际上却是一所接收问题少年的改革学校。黄仁勋的室友是一个 17 岁的文盲，第一晚就向他展示身上的刀疤。身材矮小、几乎不会说英语的他不得不每天穿越一座摇摇欲坠的绳桥去上学。这段经历锻造了他异常坚韧的性格。",
    summary_en:
      "In 1973, as the Vietnam War spread to Thailand, Jensen's parents sent him and his older brother as unaccompanied minors to the US. Their uncle enrolled them at Oneida Baptist Institute in rural Kentucky — a reform school for troubled youth, not the elite academy the family expected. The harsh environment forged Jensen's extraordinary resilience.",
    location: "Oneida, Kentucky",
    key: true,
    tags: ["移民", "童年", "肯塔基", "韧性"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: null,
  },

  {
    id: "huang-1975-oregon-high-school",
    person_id: "huang",
    date: "1975-01-01",
    date_precision: "year",
    type: "life",
    title: "父母移居俄勒冈州，黄仁勋转入 Aloha 高中",
    title_en: "Parents move to Oregon; Jensen transfers to Aloha High School",
    summary:
      "约 1975 年，黄仁勋的父母移居俄勒冈州比弗顿，两兄弟从肯塔基州转出，与家人团聚。黄仁勋就读于 Aloha 高中，在学业上表现优异，连跳两级，16 岁即高中毕业。他同时是全国排名的乒乓球选手，也活跃于数学、计算机和科学社团。这段高中时期展现了他日后在 NVIDIA 的一个核心特质：在多个领域同时追求卓越。",
    summary_en:
      "Around 1975, Jensen's parents settled in Beaverton, Oregon, and the brothers rejoined their family. At Aloha High School, Jensen excelled academically, skipping two grades and graduating at 16. He was also a nationally ranked table-tennis player.",
    location: "Aloha, Oregon",
    key: false,
    tags: ["高中", "俄勒冈", "乒乓球"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: null,
  },

  // ──────────────────────────── EDUCATION ────────────────────────────

  {
    id: "huang-1984-oregon-state-bsee",
    person_id: "huang",
    date: "1984-01-01",
    date_precision: "year",
    type: "education",
    title: "获得俄勒冈州立大学电气工程学士学位",
    title_en: "Graduates from Oregon State University with BSEE",
    summary:
      "1984 年，黄仁勋以最高荣誉从俄勒冈州立大学（Oregon State University）毕业，获得电气工程学士学位。大学期间他遇到了未来的妻子 Lori Mills——她是他的工程实验课搭档。OSU 的工程训练为他后来在半导体行业的职业生涯奠定了坚实基础。黄仁勋后来多次回馈母校，2022 年向 OSU 捐赠 5000 万美元用于建设超级计算中心。",
    summary_en:
      "In 1984, Huang graduated with highest honors from Oregon State University with a bachelor's in electrical engineering. During college he met his future wife, Lori Mills, who was his engineering lab partner.",
    location: "Corvallis, Oregon",
    key: true,
    tags: ["教育", "俄勒冈州立大学", "电气工程"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: null,
  },

  {
    id: "huang-1992-stanford-msee",
    person_id: "huang",
    date: "1992-01-01",
    date_precision: "year",
    type: "education",
    title: "获得斯坦福大学电气工程硕士学位",
    title_en: "Earns MSEE from Stanford University",
    summary:
      "1992 年，黄仁勋从斯坦福大学获得电气工程硕士学位（MSEE）。他在工作期间完成了硕士学业——当时他已在 AMD 和 LSI Logic 工作多年。斯坦福的学术训练和硅谷的人脉网络为他一年后创办 NVIDIA 提供了关键的知识储备和行业关系。斯坦福后来成为黄仁勋频繁回归演讲的地方，也是他最大的慈善捐赠目标之一。",
    summary_en:
      "In 1992, Huang earned his master's in electrical engineering from Stanford University while working in the semiconductor industry. The Stanford network and technical training proved instrumental when he co-founded NVIDIA the following year.",
    location: "Stanford, California",
    key: true,
    tags: ["教育", "斯坦福", "MSEE"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: null,
  },

  // ──────────────────────────── CAREER BEFORE NVIDIA ────────────────────────────

  {
    id: "huang-1984-amd-designer",
    person_id: "huang",
    date: "1984-01-01",
    date_precision: "year",
    type: "career",
    title: "加入 AMD 担任微处理器设计师",
    title_en: "Joins AMD as a microprocessor designer",
    summary:
      "1984 年大学毕业后，黄仁勋加入 Advanced Micro Devices（AMD），担任微处理器设计师。在 AMD，他深入学习了芯片架构与半导体设计的核心技术，这段经历让他真正理解了「计算的本质是架构创新」。AMD 的工作也让他结识了众多半导体行业的人才，其中不乏后来 NVIDIA 创业团队的核心成员。",
    summary_en:
      "After graduating from Oregon State in 1984, Huang joined AMD as a microprocessor designer. The experience gave him deep expertise in chip architecture and introduced him to the semiconductor talent pool that would later fuel NVIDIA.",
    location: "Sunnyvale, California",
    key: false,
    tags: ["AMD", "芯片设计", "职业起步"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: null,
  },

  {
    id: "huang-1985-lsi-logic",
    person_id: "huang",
    date: "1985-01-01",
    date_precision: "year",
    type: "career",
    title: "加入 LSI Logic，升任 CoreWare 部门总监",
    title_en: "Joins LSI Logic, rises to Director of CoreWare",
    summary:
      "约 1985 年，黄仁勋从 AMD 转入 LSI Logic，最终升任 CoreWare 部门总监，负责芯片系统级设计。这段经历教会他如何将复杂的系统架构转化为产品，也让他建立了关键的行业人脉。LSI Logic 的 CEO Wilfred Corrigan 后来成为 NVIDIA 的早期支持者，在 1993 年将黄仁勋介绍给了传奇风投人 Don Valentine（红杉资本），帮助 NVIDIA 获得了种子轮融资。",
    summary_en:
      "Around 1985, Huang moved from AMD to LSI Logic, eventually becoming Director of CoreWare. LSI Logic's CEO Wilfred Corrigan later introduced Huang to legendary VC Don Valentine of Sequoia Capital, helping NVIDIA secure its initial funding.",
    location: "Milpitas, California",
    key: false,
    tags: ["LSI Logic", "半导体", "CoreWare"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: null,
  },

  // ──────────────────────────── NVIDIA FOUNDING & EARLY YEARS ────────────────────────────

  {
    id: "huang-1993-01-01-nvidia-founding",
    person_id: "huang",
    date: "1993-01-01",
    date_precision: "day",
    type: "founding",
    title: "在 Denny's 餐厅联合创办 NVIDIA",
    title_en: "Co-founds NVIDIA at a Denny's restaurant",
    summary:
      "1993 年 1 月，30 岁的黄仁勋与 Chris Malachowsky 和 Curtis Priem 在圣何塞东区 Berryessa 路的一家 Denny's 餐厅里敲定了创业方案，以 40,000 美元启动资金正式创立 NVIDIA。三人都是芯片设计出身，他们押注一个当时几乎无人看好的方向：专用图形加速芯片。两位联合创始人选择黄仁勋担任 CEO。公司名称取自拉丁语 invidia（嫉妒），寓意创造令人嫉妒的技术。这家从快餐店起步的公司，30 年后成为全球市值最高的企业之一。",
    summary_en:
      "On January 1, 1993, 30-year-old Jensen Huang co-founded NVIDIA with Chris Malachowsky and Curtis Priem at a Denny's restaurant in East San Jose, with $40,000 in the bank. The trio bet on dedicated graphics acceleration — a market that barely existed. Three decades later, NVIDIA became one of the world's most valuable companies.",
    location: "San Jose, California",
    key: true,
    tags: ["创立", "NVIDIA", "Denny's", "GPU"],
    sources: [
      { ...wikipediaHuangSource },
      { ...wikipediaNvidiaSource },
    ],
    source_hints: null,
  },

  // ──────────────────────────── NVIDIA PRODUCTS & MILESTONES ────────────────────────────

  {
    id: "huang-1999-01-22-nvidia-ipo",
    person_id: "huang",
    date: "1999-01-22",
    date_precision: "day",
    type: "career",
    title: "NVIDIA 在纳斯达克上市",
    title_en: "NVIDIA goes public on NASDAQ",
    summary:
      "1999 年 1 月 22 日，NVIDIA 在纳斯达克证券交易所挂牌上市，IPO 发行价 12 美元。上市时公司已推出 RIVA TNT 系列显卡并在 PC 游戏图形市场站稳脚跟。IPO 为 NVIDIA 提供了进一步研发扩张的资金弹药。当年晚些时候，NVIDIA 推出了革命性的 GeForce 256，首次提出「GPU」（图形处理单元）这一概念。从 12 美元发行价起步，NVIDIA 股票在此后 25 年间经历了多次拆分，回报超过百万倍。",
    summary_en:
      "On January 22, 1999, NVIDIA went public on NASDAQ at $12 per share. The IPO funded the company's expansion and preceded the launch of the revolutionary GeForce 256 later that year. The stock would go on to deliver extraordinary returns over the next quarter-century.",
    location: "Santa Clara, California",
    key: true,
    tags: ["IPO", "纳斯达克", "上市"],
    sources: [{ ...wikipediaNvidiaSource }],
    source_hints: null,
  },

  {
    id: "huang-1999-10-11-geforce-256",
    person_id: "huang",
    date: "1999-10-11",
    date_precision: "day",
    type: "product",
    title: "发布 GeForce 256 —— 世界上第一款「GPU」",
    title_en: "Launches GeForce 256 — the world's first 'GPU'",
    summary:
      "1999 年 10 月 11 日，NVIDIA 发布 GeForce 256，并以「世界上第一款 GPU」（Graphics Processing Unit，图形处理单元）进行市场宣传。GeForce 256 首次将变换、光照、三角形设置/裁剪和渲染引擎集成到单一芯片上，每秒可处理至少 1000 万个多边形。「GPU」这一术语由 NVIDIA 提出并推广，彻底改变了计算机图形行业的话语体系。GeForce 系列由此成为 PC 游戏玩家的标配品牌，至今延续了超过 25 年。",
    summary_en:
      "On October 11, 1999, NVIDIA launched the GeForce 256, marketed as 'the world's first GPU.' It integrated transform, lighting, and rendering on a single chip. NVIDIA coined the term 'GPU' with this product, reshaping the graphics industry vocabulary and establishing GeForce as the iconic PC gaming brand.",
    location: "Santa Clara, California",
    key: true,
    tags: ["GPU", "GeForce 256", "产品里程碑"],
    sources: [
      {
        id: "wikipedia-geforce-256",
        url: "https://en.wikipedia.org/wiki/GeForce_256",
        kind: "article",
        title: "GeForce 256 (Wikipedia)",
        publisher: "Wikipedia",
        lang: "en",
        primary: false,
        ...CCBYSA,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2006-11-cuda-launch",
    person_id: "huang",
    date: "2006-11-01",
    date_precision: "month",
    type: "product",
    title: "发布 CUDA —— GPU 通用计算时代开启",
    title_en: "Launches CUDA — the birth of GPU computing",
    summary:
      "2006 年 11 月，NVIDIA 发布 CUDA（Compute Unified Device Architecture），这是一个允许开发者使用 C 语言在 GPU 上进行通用并行计算的平台和编程模型。在当时，这个决定被很多人视为浪费——为什么要让游戏显卡做科学计算？但黄仁勋坚信 GPU 的大规模并行架构有远超图形渲染的潜力。CUDA 后来成为深度学习革命的关键基础设施：从 AlexNet 到 ChatGPT，几乎所有 AI 突破都运行在 CUDA 之上。这或许是黄仁勋最具远见的产品决策。",
    summary_en:
      "In November 2006, NVIDIA released CUDA (Compute Unified Device Architecture), enabling developers to use GPUs for general-purpose parallel computing. Widely seen as a gamble at the time, CUDA became the foundational infrastructure for the deep learning revolution — arguably Huang's most visionary product decision.",
    location: "Santa Clara, California",
    key: true,
    tags: ["CUDA", "GPU 计算", "产品里程碑", "AI 基础设施"],
    sources: [
      { ...wikipediaNvidiaSource },
      {
        id: "wikipedia-cuda",
        url: "https://en.wikipedia.org/wiki/CUDA",
        kind: "article",
        title: "CUDA (Wikipedia)",
        publisher: "Wikipedia",
        lang: "en",
        primary: false,
        ...CCBYSA,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2012-10-alexnet-imagenet",
    person_id: "huang",
    date: "2012-10-01",
    date_precision: "month",
    type: "other",
    title: "AlexNet 使用 NVIDIA GPU 赢得 ImageNet —— AI 时代开启",
    title_en: "AlexNet wins ImageNet using NVIDIA GPUs — the AI era begins",
    summary:
      "2012 年 10 月，多伦多大学 Alex Krizhevsky、Ilya Sutskever 和 Geoffrey Hinton 开发的 AlexNet 使用两块 NVIDIA GTX 580 GPU 赢得 ImageNet 图像识别竞赛，top-5 错误率仅 15.3%，远超第二名的 26.2%。这一结果震惊了整个计算机视觉界，标志着深度学习革命的正式起点。NVIDIA 的 CUDA 平台和 GPU 硬件为这一突破提供了关键算力支持。从此 AI 研究者纷纷转向 GPU 训练，NVIDIA 从一家游戏显卡公司开始向 AI 计算平台蜕变。",
    summary_en:
      "In October 2012, AlexNet — trained on two NVIDIA GTX 580 GPUs — won the ImageNet competition with a top-5 error rate of 15.3%, crushing the 26.2% runner-up. This watershed moment ignited the deep learning revolution and validated NVIDIA's CUDA bet, beginning the company's transformation from a gaming GPU maker into an AI computing platform.",
    location: "Toronto, Canada",
    key: true,
    tags: ["AlexNet", "ImageNet", "深度学习", "AI 革命"],
    sources: [
      {
        id: "wikipedia-alexnet",
        url: "https://en.wikipedia.org/wiki/AlexNet",
        kind: "article",
        title: "AlexNet (Wikipedia)",
        publisher: "Wikipedia",
        lang: "en",
        primary: false,
        ...CCBYSA,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2016-08-dgx1-openai",
    person_id: "huang",
    date: "2016-08-01",
    date_precision: "month",
    type: "product",
    title: "亲手将首台 DGX-1 超级计算机交付给 OpenAI",
    title_en: "Personally delivers first DGX-1 AI supercomputer to OpenAI",
    summary:
      "2016 年 8 月，黄仁勋亲自将第一台 NVIDIA DGX-1 AI 超级计算机送到了 OpenAI 位于旧金山的总部，交给了 Sam Altman 和 Elon Musk。DGX-1 搭载 8 块 Tesla P100 GPU，算力相当于 250 台传统服务器。黄仁勋在机器上签名写道：「致 Elon 和 OpenAI 的全体成员——为了计算与人类的未来。」这台机器后来被用于训练了一系列突破性的 AI 模型。这一刻被视为现代 AI 革命的一个重要起点——GPU 算力与 AI 雄心的直接结合。",
    summary_en:
      "In August 2016, Huang hand-delivered the first NVIDIA DGX-1 AI supercomputer to OpenAI's San Francisco headquarters, inscribing it 'To Elon & the OpenAI team — for the future of computing and humanity.' The DGX-1, packing 8 Tesla P100 GPUs equivalent to 250 servers, became a foundational tool for training breakthrough AI models.",
    location: "San Francisco, California",
    key: true,
    tags: ["DGX-1", "OpenAI", "AI 超级计算机"],
    sources: [
      {
        id: "wikipedia-nvidia-dgx",
        url: "https://en.wikipedia.org/wiki/Nvidia_DGX",
        kind: "article",
        title: "Nvidia DGX (Wikipedia)",
        publisher: "Wikipedia",
        lang: "en",
        primary: false,
        ...CCBYSA,
      },
    ],
    source_hints: "Date given as August 2016 in NVIDIA press materials",
  },

  {
    id: "huang-2018-08-20-rtx-ray-tracing",
    person_id: "huang",
    date: "2018-08-20",
    date_precision: "day",
    type: "product",
    title: "发布 GeForce RTX 系列 —— 实时光线追踪革命",
    title_en: "Unveils GeForce RTX series — real-time ray tracing arrives",
    summary:
      "2018 年 8 月 20 日，黄仁勋在德国科隆 Gamescom 大会上正式发布基于 Turing 架构的 GeForce RTX 20 系列显卡，首次将实时光线追踪（ray tracing）和 AI 驱动的 DLSS 技术带入消费级游戏市场。光线追踪此前一直是好莱坞电影级渲染的专属技术，RTX 让它在游戏中实时运行。黄仁勋在发布会上的标志性动作——穿着黑色皮夹克展示光追效果——成为科技界的经典画面。RTX 品牌延续至今，定义了高端游戏显卡的标准。",
    summary_en:
      "On August 20, 2018, Huang unveiled the GeForce RTX 20 series at Gamescom, bringing real-time ray tracing and AI-powered DLSS to consumer gaming for the first time via the Turing architecture. The RTX brand became synonymous with cutting-edge gaming graphics.",
    location: "Cologne, Germany",
    key: true,
    tags: ["RTX", "光线追踪", "Turing", "游戏"],
    sources: [
      {
        id: "wikipedia-geforce-rtx-20",
        url: "https://en.wikipedia.org/wiki/GeForce_RTX_20_series",
        kind: "article",
        title: "GeForce RTX 20 series (Wikipedia)",
        publisher: "Wikipedia",
        lang: "en",
        primary: false,
        ...CCBYSA,
      },
    ],
    source_hints: null,
  },

  // ──────────────────────────── DEALS ────────────────────────────

  {
    id: "huang-2020-09-13-arm-acquisition",
    person_id: "huang",
    date: "2020-09-13",
    date_precision: "day",
    type: "deal",
    title: "宣布以 400 亿美元收购 Arm —— 史上最大芯片并购案",
    title_en: "Announces $40B acquisition of Arm — largest chip deal ever",
    summary:
      "2020 年 9 月 13 日，NVIDIA 宣布从软银集团以约 400 亿美元收购英国芯片设计公司 Arm Limited，若完成将成为半导体行业史上最大并购案。Arm 的架构授权给全球数十亿设备——从智能手机到数据中心——收购将使 NVIDIA 获得前所未有的行业影响力。然而交易引发了美国 FTC、欧盟和中国监管机构的全面反垄断审查。最终在 2022 年 2 月 8 日，双方因「重大监管障碍」宣布终止交易。软银保留了 NVIDIA 支付的 12.5 亿美元预付金。",
    summary_en:
      "On September 13, 2020, NVIDIA announced a ~$40B deal to acquire Arm Limited from SoftBank — the largest semiconductor acquisition ever proposed. After facing antitrust challenges from the US FTC, EU, and China, the deal was terminated on February 8, 2022. SoftBank retained NVIDIA's $1.25B deposit.",
    location: "Santa Clara, California",
    key: true,
    tags: ["收购", "Arm", "反垄断", "监管"],
    sources: [
      {
        id: "wikipedia-nvidia-arm",
        url: "https://en.wikipedia.org/wiki/Nvidia",
        kind: "article",
        title: "Nvidia (Wikipedia) — Arm acquisition section",
        publisher: "Wikipedia",
        lang: "en",
        primary: false,
        ...CCBYSA,
      },
    ],
    source_hints: "Announced Sept 13, 2020; terminated Feb 8, 2022",
  },

  // ──────────────────────────── AI ERA & MARKET CAP MILESTONES ────────────────────────────

  {
    id: "huang-2022-11-30-chatgpt-nvidia-demand",
    person_id: "huang",
    date: "2022-11-30",
    date_precision: "day",
    type: "other",
    title: "ChatGPT 发布 —— NVIDIA GPU 需求爆发",
    title_en: "ChatGPT launches — NVIDIA GPU demand explodes",
    summary:
      "2022 年 11 月 30 日，OpenAI 发布 ChatGPT，两个月内用户突破 1 亿，成为史上增长最快的消费级应用。ChatGPT 背后的 GPT-3.5 模型运行在数千块 NVIDIA A100 GPU 之上，它的病毒式传播让全球企业意识到生成式 AI 的巨大潜力，纷纷抢购 NVIDIA GPU 以训练和部署自己的大语言模型。NVIDIA 的数据中心营收在此后几个季度飙升数倍，公司股价开始了令人瞠目结舌的上涨。黄仁勋此前十多年在 CUDA 和 AI 生态上的投入，终于迎来了指数级的回报。",
    summary_en:
      "On November 30, 2022, OpenAI released ChatGPT, which reached 100 million users in two months. Running on thousands of NVIDIA A100 GPUs, it triggered an unprecedented global rush for NVIDIA hardware. Data center revenue surged and NVIDIA's stock began its historic climb — validating Huang's decade-long bet on AI computing.",
    location: "San Francisco, California",
    key: true,
    tags: ["ChatGPT", "AI 爆发", "GPU 需求", "A100"],
    sources: [{ ...wikipediaNvidiaSource }],
    source_hints: null,
  },

  {
    id: "huang-2023-05-30-nvidia-1t",
    person_id: "huang",
    date: "2023-05-30",
    date_precision: "day",
    type: "other",
    title: "NVIDIA 市值突破 1 万亿美元",
    title_en: "NVIDIA hits $1 trillion market cap",
    summary:
      "2023 年 5 月 30 日，NVIDIA 市值在盘中突破 1 万亿美元，成为美国首家市值达到这一里程碑的芯片公司，也是全球第八家跨过万亿门槛的企业。此时距 NVIDIA 1993 年在 Denny's 餐厅创立刚好 30 年。推动市值飙升的核心动力是 AI 训练和推理对 GPU 的爆炸性需求——公司数据中心业务营收同比增长超过 100%。黄仁勋从一个被华尔街长期低估的「游戏显卡 CEO」一夜之间成为科技界最炙手可热的人物。",
    summary_en:
      "On May 30, 2023, NVIDIA's market cap crossed $1 trillion during trading, making it the first US chipmaker to reach this milestone. Exactly 30 years after its founding at a Denny's, the company's value was propelled by explosive AI-driven demand for GPUs.",
    location: "Santa Clara, California",
    key: true,
    tags: ["万亿市值", "里程碑", "AI 热潮"],
    sources: [{ ...wikipediaNvidiaSource }],
    source_hints: null,
  },

  {
    id: "huang-2024-03-18-blackwell-gtc",
    person_id: "huang",
    date: "2024-03-18",
    date_precision: "day",
    type: "product",
    title: "GTC 2024 发布 Blackwell 架构 —— 下一代 AI 芯片",
    title_en: "Announces Blackwell architecture at GTC 2024 — next-gen AI chip",
    summary:
      "2024 年 3 月 18 日，黄仁勋在 GTC 2024 大会上发布了 NVIDIA Blackwell GPU 架构（以统计学家 David Blackwell 命名），宣布其训练万亿参数大语言模型的成本和能耗比上一代 Hopper 降低 25 倍。旗舰芯片 B200 拥有 2080 亿个晶体管，是有史以来最大的 GPU。黄仁勋称 Blackwell 为「AI 工厂的引擎」——不仅是芯片，而是一整套包含网络、软件和系统的平台。Blackwell 的发布进一步巩固了 NVIDIA 在 AI 基础设施领域的绝对领先地位。",
    summary_en:
      "On March 18, 2024, Huang unveiled the Blackwell GPU architecture at GTC 2024, promising 25x lower cost and energy for training trillion-parameter LLMs compared to the previous Hopper generation. The flagship B200 chip contained 208 billion transistors — the largest GPU ever built.",
    location: "San Jose, California",
    key: true,
    tags: ["Blackwell", "GTC", "AI 芯片", "B200"],
    sources: [
      {
        id: "wikipedia-blackwell",
        url: "https://en.wikipedia.org/wiki/Blackwell_(microarchitecture)",
        kind: "article",
        title: "Blackwell (microarchitecture) (Wikipedia)",
        publisher: "Wikipedia",
        lang: "en",
        primary: false,
        ...CCBYSA,
      },
      {
        id: "youtube-gtc-2024-keynote",
        url: "https://www.youtube.com/watch?v=Y2F8yisiS6E",
        kind: "video",
        title: "GTC March 2024 Keynote with NVIDIA CEO Jensen Huang",
        publisher: "NVIDIA (YouTube)",
        lang: "en",
        primary: false,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2024-06-18-most-valuable-company",
    person_id: "huang",
    date: "2024-06-18",
    date_precision: "day",
    type: "other",
    title: "NVIDIA 超越微软和苹果，成为全球市值最高的公司",
    title_en: "NVIDIA briefly becomes the world's most valuable company",
    summary:
      "2024 年 6 月 18 日，NVIDIA 市值超过 3.3 万亿美元，短暂超越微软和苹果成为全球市值最高的公司。这是一个历史性时刻——一家以游戏显卡起家的芯片公司，在 AI 浪潮的推动下登顶全球资本市场。黄仁勋从一个在 Denny's 创业的台湾移民，变成了全球最有价值公司的掌舵人。这一地位此后在 NVIDIA、苹果和微软之间反复交替，但 NVIDIA 始终保持在前三。",
    summary_en:
      "On June 18, 2024, NVIDIA's market cap surpassed $3.3 trillion, overtaking Microsoft and Apple to briefly become the world's most valuable company. A historic moment: a chip company that started as a gaming GPU maker reached the summit of global capital markets, driven by AI demand.",
    location: "Santa Clara, California",
    key: true,
    tags: ["市值第一", "AI 热潮", "里程碑"],
    sources: [{ ...wikipediaNvidiaSource }],
    source_hints: null,
  },

  // ──────────────────────────── SPEECHES & KEYNOTES ────────────────────────────

  {
    id: "huang-2023-05-27-ntu-commencement",
    person_id: "huang",
    date: "2023-05-27",
    date_precision: "day",
    type: "speech",
    title: "台湾大学毕业典礼演讲：「跑起来，不要走」",
    title_en: "NTU commencement speech: 'Run, don't walk'",
    summary:
      "2023 年 5 月 27 日，黄仁勋回到台湾，在国立台湾大学毕业典礼上发表了一场令人震撼的演讲。他穿着标志性的黑色皮夹克，用流利的国语对毕业生说：「跑起来，不要走。不管是为了追逐食物，还是为了不变成食物——你都得跑。」他分享了 NVIDIA 三次濒临破产的故事，每一次都是靠着「谦卑地面对错误，然后全速奔跑」才活下来。这场演讲在华语世界引发了病毒式传播。",
    summary_en:
      "On May 27, 2023, Huang delivered a commencement speech at National Taiwan University in his signature leather jacket, telling graduates: 'Run, don't walk — either you're running for food, or you are the food.' He shared three near-death stories from NVIDIA's history. The speech went viral across the Chinese-speaking world.",
    location: "Taipei, Taiwan",
    key: true,
    tags: ["演讲", "台大", "毕业典礼", "跑起来"],
    sources: [
      { ...wikipediaHuangSource },
      {
        id: "nvidia-ntu-blog",
        url: "https://blogs.nvidia.com/blog/2023/05/26/huang-ntu-commencement/",
        kind: "article",
        title: "NVIDIA CEO Tells NTU Grads to Run, Not Walk",
        publisher: "NVIDIA Blog",
        lang: "en",
        primary: false,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2023-03-21-gtc-2023-keynote",
    person_id: "huang",
    date: "2023-03-21",
    date_precision: "day",
    type: "speech",
    title: "GTC 2023 主题演讲 —— 发布 H100 及 AI 平台愿景",
    title_en: "GTC 2023 keynote — H100 and AI platform vision",
    summary:
      "2023 年 3 月 21 日，黄仁勋在 GTC 2023 大会上发表主题演讲，全面展示了 NVIDIA 从芯片到系统到软件的 AI 全栈平台。他发布了一系列重磅产品和合作，包括 DGX Cloud 服务、与微软、Google、Oracle 等云厂商的深度合作，以及面向生成式 AI 的推理优化。这场演讲标志着黄仁勋将 NVIDIA 定位从「芯片公司」彻底转向「AI 基础设施平台公司」。",
    summary_en:
      "On March 21, 2023, Huang delivered the GTC 2023 keynote, unveiling NVIDIA's full-stack AI platform including DGX Cloud, major cloud partnerships, and generative AI inference optimizations — firmly repositioning NVIDIA from a chip company to an AI infrastructure platform.",
    location: "San Jose, California",
    key: false,
    tags: ["GTC", "演讲", "H100", "AI 平台"],
    sources: [
      {
        id: "youtube-gtc-2023",
        url: "https://www.youtube.com/watch?v=DiGB5uAYKAg",
        kind: "video",
        title: "GTC 2023 Keynote with NVIDIA CEO Jensen Huang",
        publisher: "NVIDIA (YouTube)",
        lang: "en",
        primary: false,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2024-03-14-stanford-siepr",
    person_id: "huang",
    date: "2024-03-14",
    date_precision: "day",
    type: "speech",
    title: "斯坦福 SIEPR 经济峰会演讲：「痛苦和磨难才能成就伟大」",
    title_en: "Stanford SIEPR summit: 'Pain and suffering is what makes greatness'",
    summary:
      "2024 年 3 月 14 日，黄仁勋在斯坦福大学 SIEPR 经济峰会上发表演讲，对台下的斯坦福学生说了一句引发广泛讨论的话：「你们对自己的期望太高了。期望越高的人，韧性就越低。我祝愿你们经历足够多的痛苦和磨难。」他强调伟大的成就来自于性格，而性格是在逆境中锻造的。这番言论引起了关于「精英泡沫」与「成长心态」的热烈辩论。",
    summary_en:
      "On March 14, 2024, Huang told Stanford students at the SIEPR Economic Summit: 'People with very high expectations have very low resilience. I wish upon you ample doses of pain and suffering.' He argued that greatness comes from character forged through adversity — sparking widespread debate.",
    location: "Stanford, California",
    key: true,
    tags: ["演讲", "斯坦福", "韧性", "名言"],
    sources: [
      {
        id: "youtube-siepr-2024",
        url: "https://www.youtube.com/watch?v=cEg8cOx7UZk",
        kind: "video",
        title: "Keynote by NVIDIA CEO Jensen Huang at 2024 SIEPR Economic Summit",
        publisher: "Stanford SIEPR (YouTube)",
        lang: "en",
        primary: false,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2024-06-14-caltech-commencement",
    person_id: "huang",
    date: "2024-06-14",
    date_precision: "day",
    type: "speech",
    title: "加州理工学院毕业典礼演讲：「追逐零亿美元市场」",
    title_en: "Caltech commencement: 'Pursue zero-billion-dollar markets'",
    summary:
      "2024 年 6 月 14 日，黄仁勋在加州理工学院第 130 届毕业典礼上发表主旨演讲。他鼓励毕业生追逐「零亿美元市场」——那些当前规模为零、但未来可能改变世界的领域，正如 1993 年 NVIDIA 创立时 3D 图形加速芯片几乎没有市场。他还告诫学生：「挫折不是失败，而是新机遇的开端。」作为一位从肯塔基改革学校走出来的台湾移民，黄仁勋的人生经历赋予了这些话语格外的分量。",
    summary_en:
      "On June 14, 2024, Huang delivered Caltech's 130th commencement address, urging graduates to 'pursue zero-billion-dollar markets' — just as NVIDIA targeted the then-nonexistent GPU market in 1993. He encouraged them to see setbacks as new opportunities.",
    location: "Pasadena, California",
    key: false,
    tags: ["演讲", "加州理工", "毕业典礼"],
    sources: [
      { ...wikipediaHuangSource },
      {
        id: "nvidia-caltech-blog",
        url: "https://blogs.nvidia.com/blog/jensen-huang-caltech-commencement-address/",
        kind: "article",
        title: "NVIDIA CEO Delivers Caltech Commencement Address",
        publisher: "NVIDIA Blog",
        lang: "en",
        primary: false,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2024-04-28-60-minutes",
    person_id: "huang",
    date: "2024-04-28",
    date_precision: "day",
    type: "interview",
    title: "CBS《60 分钟》专访 —— NVIDIA 与 AI 的未来",
    title_en: "60 Minutes profile — NVIDIA and the future of AI",
    summary:
      "2024 年 4 月 28 日，CBS《60 分钟》播出了对黄仁勋的深度专访，记者 Bill Whitaker 以 2024 年 3 月 GTC 大会为锚点，全面呈现了黄仁勋的领导力、NVIDIA 的崛起以及 AI 的未来。节目中揭示了黄仁勋的两面：公众场合和蔼可亲，实际管理中极其严苛——多位员工形容他「要求极高、追求完美、不好相处」。节目还展示了 Blackwell 芯片的制造过程，以及黄仁勋 15 岁在 Denny's 当洗碗工的故事。",
    summary_en:
      "On April 28, 2024, CBS 60 Minutes aired a major profile of Jensen Huang, anchored around the GTC 2024 conference. Reporter Bill Whitaker revealed Huang's intense management style — employees described him as 'demanding, a perfectionist, not easy to work for' — alongside his vision for AI and his journey from dishwasher to CEO.",
    location: "San Jose, California",
    key: true,
    tags: ["采访", "60 Minutes", "CBS", "领导力"],
    sources: [
      {
        id: "cbs-60-minutes-huang",
        url: "https://www.cbsnews.com/news/meet-nvida-ceo-jensen-huang-company-powering-ai-today-60-minutes-transcript/",
        kind: "article",
        title: "Meet Nvidia CEO Jensen Huang (60 Minutes Transcript)",
        publisher: "CBS News",
        lang: "en",
        primary: true,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2025-03-lex-fridman-podcast",
    person_id: "huang",
    date: "2025-03-01",
    date_precision: "month",
    type: "interview",
    title: "Lex Fridman 播客 #494 —— 深度对话 AI 革命",
    title_en: "Lex Fridman Podcast #494 — The $4 Trillion Company & the AI Revolution",
    summary:
      "2025 年 3 月，黄仁勋接受了 Lex Fridman 的长篇深度访谈（播客第 494 期）。两人从 NVIDIA 的 AI 全栈工程——内存、功耗、供应链（台积电、ASML）——聊到领导力哲学和人生意义。黄仁勋分享了他对 AI 未来的深刻思考，包括 AI 将如何重塑每一个行业，以及为什么「加速计算」不仅仅是技术进步，而是一种新的计算范式。这期节目成为科技从业者理解 NVIDIA 战略的必听内容。",
    summary_en:
      "In March 2025, Huang sat down with Lex Fridman for Podcast #494, a deep-dive conversation covering NVIDIA's full AI stack engineering, leadership philosophy, and the future of computing. The episode became essential listening for understanding NVIDIA's strategy.",
    location: "Austin, Texas",
    key: false,
    tags: ["播客", "Lex Fridman", "AI", "深度访谈"],
    sources: [
      {
        id: "youtube-lex-fridman-494",
        url: "https://www.youtube.com/watch?v=vif8NQcjVf0",
        kind: "video",
        title: "Jensen Huang: NVIDIA - The $4 Trillion Company & the AI Revolution | Lex Fridman Podcast #494",
        publisher: "Lex Fridman (YouTube)",
        lang: "en",
        primary: true,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2024-10-acquired-podcast",
    person_id: "huang",
    date: "2024-10-01",
    date_precision: "month",
    type: "interview",
    title: "Acquired 播客深度访谈 —— NVIDIA CEO 黄仁勋",
    title_en: "Acquired podcast interview — NVIDIA CEO Jensen Huang",
    summary:
      "2024 年 10 月，黄仁勋接受了 Acquired 播客主持人 Ben Gilbert 和 David Rosenthal 的深度访谈。此前 Acquired 已用三期、共计超过七个小时的节目详细讲述了 NVIDIA 的历史，而这期节目直接与黄仁勋对话，探讨了 NVIDIA 的创业故事、多次濒临破产的经历、CUDA 的战略赌注、AI 时代的加速到来，以及黄仁勋独特的管理哲学——包括他著名的「没有 1:1 会议」和「40 个直属下属」的扁平管理结构。",
    summary_en:
      "In October 2024, Huang sat down with Acquired podcast hosts Ben Gilbert and David Rosenthal for an in-depth interview covering NVIDIA's founding story, near-death experiences, the CUDA bet, and Huang's unique management philosophy — including his famous flat structure with 40+ direct reports and no 1:1 meetings.",
    location: "USA",
    key: false,
    tags: ["播客", "Acquired", "管理哲学"],
    sources: [
      {
        id: "acquired-jensen-huang",
        url: "https://www.acquired.fm/episodes/jensen-huang",
        kind: "podcast",
        title: "NVIDIA CEO Jensen Huang",
        publisher: "Acquired",
        lang: "en",
        primary: true,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2025-01-06-ces-2025-keynote",
    person_id: "huang",
    date: "2025-01-06",
    date_precision: "day",
    type: "speech",
    title: "CES 2025 主题演讲 —— 消费级 AI 与 GeForce RTX 50 系列",
    title_en: "CES 2025 keynote — Consumer AI and GeForce RTX 50 series",
    summary:
      "2025 年 1 月 6 日，黄仁勋在拉斯维加斯 CES 2025 大会上发表主题演讲，发布了基于 Blackwell 架构的 GeForce RTX 50 系列消费级显卡，将 AI 和光追性能带入新一代桌面和笔记本电脑。他还展示了 NVIDIA 在自动驾驶、机器人和数字孪生方面的最新进展。黄仁勋穿着标志性皮夹克在舞台上展示新技术的画面，延续了他作为科技界最具魅力的产品发布人的地位。",
    summary_en:
      "On January 6, 2025, Huang delivered the CES 2025 keynote in Las Vegas, unveiling the Blackwell-based GeForce RTX 50 series for consumer PCs, along with advances in autonomous driving, robotics, and digital twins.",
    location: "Las Vegas, Nevada",
    key: false,
    tags: ["CES", "演讲", "RTX 50", "消费级"],
    sources: [
      {
        id: "youtube-ces-2025",
        url: "https://www.youtube.com/watch?v=k82RwXqZHY8",
        kind: "video",
        title: "NVIDIA CEO Jensen Huang Keynote at CES 2025",
        publisher: "NVIDIA (YouTube)",
        lang: "en",
        primary: true,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-2025-03-17-gtc-2025-keynote",
    person_id: "huang",
    date: "2025-03-17",
    date_precision: "day",
    type: "speech",
    title: "GTC 2025 主题演讲 —— 通用机器人时代到来",
    title_en: "GTC 2025 keynote — 'The age of generalist robotics is here'",
    summary:
      "2025 年 3 月 17 日，黄仁勋在圣何塞 SAP 中心发表了长达两个半小时的 GTC 2025 主题演讲，宣布「通用机器人时代已经到来」。他发布了 GROOT N1 机器人 AI 模型、Blackwell Ultra 芯片，以及下一代 Vera Rubin 架构的路线图。演讲中他提出「结构化数据与生成式 AI 的融合」将在一个又一个行业中重复发生——这一愿景定义了 NVIDIA 从 AI 训练平台向 AI 工厂和物理 AI 的战略扩展方向。黄仁勋的 GTC 主题演讲已成为全球科技界的年度盛事。",
    summary_en:
      "On March 17, 2025, Huang delivered a 2.5-hour GTC 2025 keynote at the SAP Center in San Jose, declaring 'the age of generalist robotics is here.' He unveiled GROOT N1 robotics AI, Blackwell Ultra, and the Vera Rubin architecture roadmap, defining NVIDIA's expansion from AI training to AI factories and physical AI.",
    location: "San Jose, California",
    key: true,
    tags: ["GTC", "演讲", "机器人", "Vera Rubin", "Blackwell Ultra"],
    sources: [{ ...wikipediaNvidiaSource }],
    source_hints: null,
  },

  // ──────────────────────────── PERSONAL LIFE ────────────────────────────

  {
    id: "huang-1993-marriage-lori",
    person_id: "huang",
    date: "1993-01-01",
    date_precision: "year",
    type: "life",
    title: "与 Lori Mills 结婚",
    title_en: "Marries Lori Mills",
    summary:
      "黄仁勋与 Lori Mills 结婚。两人在俄勒冈州立大学的工程实验室相识——Lori 是他的实验课搭档。据报道，黄仁勋曾向 Lori 许诺会在 30 岁前创办自己的公司，而他确实在 30 岁那年创立了 NVIDIA。两人育有两个孩子。Lori 长期低调支持丈夫的事业，很少出现在公众视野中。",
    summary_en:
      "Huang married Lori Mills, his engineering lab partner from Oregon State University. He reportedly promised her he would start his own company by age 30 — and co-founded NVIDIA at exactly that age. The couple has two children.",
    location: "Oregon",
    key: false,
    tags: ["婚姻", "家庭"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: "Some sources date the marriage to late 1980s; others to early 1990s",
  },

  // ──────────────────────────── FAMOUS QUOTES & CULTURAL MOMENTS ────────────────────────────

  {
    id: "huang-2024-03-18-buy-more-save-more",
    person_id: "huang",
    date: "2024-03-18",
    date_precision: "day",
    type: "speech",
    title: "GTC 名言：「买得越多，省得越多」",
    title_en: "GTC meme: 'The more you buy, the more you save'",
    summary:
      "在 2024 年 GTC 主题演讲中，黄仁勋在展示 Blackwell 芯片的性价比优势时说出了那句让全场爆笑、后来席卷互联网的名言：「The more you buy, the more you save」（买得越多，省得越多）。这句话原本是对 NVIDIA GPU 加速计算降低总体拥有成本的认真论述，但因为出自一家万亿美元芯片公司 CEO 之口、又恰好像极了零售促销话术，迅速成为科技界最火的 meme。黄仁勋本人似乎也乐在其中，之后多次重复使用。",
    summary_en:
      "At GTC 2024, Huang's line 'The more you buy, the more you save' — originally a serious point about GPU cost efficiency — became the tech world's hottest meme. The contrast between a trillion-dollar chipmaker CEO and what sounds like a retail sales pitch made it go viral. Huang has leaned into it since.",
    location: "San Jose, California",
    key: false,
    tags: ["名言", "meme", "GTC", "买得越多省得越多"],
    sources: [
      {
        id: "youtube-gtc-2024-keynote-2",
        url: "https://www.youtube.com/watch?v=Y2F8yisiS6E",
        kind: "video",
        title: "GTC March 2024 Keynote with NVIDIA CEO Jensen Huang",
        publisher: "NVIDIA (YouTube)",
        lang: "en",
        primary: false,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  {
    id: "huang-leather-jacket-persona",
    person_id: "huang",
    date: "2000-01-01",
    date_precision: "year",
    type: "other",
    title: "黑色皮夹克 —— 黄仁勋的标志性形象",
    title_en: "The leather jacket — Jensen Huang's signature persona",
    summary:
      "黄仁勋的黑色皮夹克已经成为科技界最具辨识度的个人标志之一，与乔布斯的黑色高领毛衣、扎克伯格的灰色 T 恤并列。他几乎在所有公开场合——GTC 主题演讲、CES 发布会、大学毕业典礼、电视采访——都穿着这件皮夹克，无论场合多正式。皮夹克已经超越了服装本身，成为「Jensen 风格」的文化符号：技术极客的酷、摇滚明星的气场、以及对传统硅谷 CEO 形象的彻底颠覆。",
    summary_en:
      "Huang's black leather jacket has become one of tech's most iconic personal trademarks, alongside Steve Jobs' black turtleneck. Worn at every public appearance — GTC keynotes, CES, commencement speeches, TV interviews — the jacket has transcended fashion to become a cultural symbol of 'Jensen style': tech-geek cool meets rock-star energy.",
    location: "Santa Clara, California",
    key: false,
    tags: ["皮夹克", "个人品牌", "文化符号"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: "The leather jacket tradition dates back roughly to the early 2000s",
  },

  // ──────────────────────────── AWARDS ────────────────────────────

  {
    id: "huang-2024-time-100",
    person_id: "huang",
    date: "2024-01-01",
    date_precision: "year",
    type: "award",
    title: "入选《时代》杂志全球最具影响力 100 人",
    title_en: "Named to TIME 100 Most Influential People",
    summary:
      "2024 年，黄仁勋入选《时代》杂志（TIME）评选的全球最具影响力 100 人名单。作为推动全球 AI 革命的核心人物，黄仁勋被认为是当今世界最具影响力的科技领袖之一。从一个 9 岁被送到肯塔基改革学校的台湾男孩，到引领万亿美元 AI 帝国的 CEO，黄仁勋的人生故事本身就是美国梦和全球科技创业精神的缩影。",
    summary_en:
      "In 2024, Huang was named to the TIME 100 Most Influential People list, recognized as one of the key figures driving the global AI revolution — from a 9-year-old sent to a Kentucky reform school to the CEO leading a trillion-dollar AI empire.",
    location: "USA",
    key: false,
    tags: ["TIME 100", "荣誉", "影响力"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: null,
  },

  // ──────────────────────────── STANFORD GSB INTERVIEW ────────────────────────────

  {
    id: "huang-2024-stanford-gsb-interview",
    person_id: "huang",
    date: "2024-01-01",
    date_precision: "year",
    type: "interview",
    title: "斯坦福商学院访谈 —— 第一性原理思维",
    title_en: "Stanford GSB interview — first-principles thinking",
    summary:
      "2024 年，黄仁勋在斯坦福大学商学院接受深度访谈，分享了他的第一性原理思维方式和决策框架。他讨论了 NVIDIA 如何在竞争激烈的半导体市场中持续创新，以及为什么他认为「公司的目的不是赚钱，而是做出对世界有价值的东西——赚钱只是副产品」。他还谈到了他独特的管理风格：不做一对一会议，直接管理约 40 个直属下属，以及为什么他认为透明和速度比层级结构更重要。",
    summary_en:
      "In 2024, Huang sat down with Stanford GSB to discuss first-principles thinking and decision-making. He shared his unique management philosophy: no 1:1 meetings, ~40 direct reports, and the belief that 'the purpose of a company isn't to make money — it's to make something valuable; money is a byproduct.'",
    location: "Stanford, California",
    key: false,
    tags: ["访谈", "斯坦福商学院", "管理哲学", "第一性原理"],
    sources: [
      {
        id: "youtube-stanford-gsb",
        url: "https://www.youtube.com/watch?v=lXLBTBBil2U",
        kind: "video",
        title: "Jensen Huang, Founder and CEO of NVIDIA",
        publisher: "Stanford Graduate School of Business (YouTube)",
        lang: "en",
        primary: true,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },

  // ──────────────────────────── PHILANTHROPY ────────────────────────────

  {
    id: "huang-2022-osu-donation",
    person_id: "huang",
    date: "2022-01-01",
    date_precision: "year",
    type: "other",
    title: "向俄勒冈州立大学捐赠 5000 万美元",
    title_en: "Donates $50M to Oregon State University",
    summary:
      "2022 年，黄仁勋和妻子 Lori 向母校俄勒冈州立大学捐赠 5000 万美元，用于在工程学院建设一座协作创新综合大楼。这是 OSU 历史上收到的最大单笔捐赠之一。黄仁勋表示，OSU 的工程教育奠定了他一生事业的基础，他希望回馈母校，帮助下一代工程师获得同样优质的教育和研究环境。此举也体现了他一贯的教育慈善理念。",
    summary_en:
      "In 2022, Jensen and Lori Huang donated $50 million to Oregon State University for a collaborative innovation complex in the College of Engineering — one of the largest gifts in OSU history.",
    location: "Corvallis, Oregon",
    key: false,
    tags: ["慈善", "教育", "俄勒冈州立大学"],
    sources: [{ ...wikipediaHuangSource }],
    source_hints: null,
  },

  {
    id: "huang-2024-stanford-donation",
    person_id: "huang",
    date: "2024-01-01",
    date_precision: "year",
    type: "other",
    title: "向斯坦福大学捐赠建设黄仁勋工程中心",
    title_en: "Donates to Stanford for the Huang Engineering Center",
    summary:
      "黄仁勋和妻子 Lori 向斯坦福大学工程学院捐赠重金，用于建设以他们命名的「黄仁勋工程中心」（Jen-Hsun Huang Engineering Center）。该中心成为斯坦福工程学院的核心建筑，汇聚了跨学科研究和教学空间。黄仁勋在落成仪式上表示，斯坦福的工程教育和硅谷生态是 NVIDIA 得以诞生的土壤，他希望通过这座中心帮助培养下一代科技创新者。",
    summary_en:
      "Jensen and Lori Huang made a major donation to Stanford's School of Engineering, funding the Jen-Hsun Huang Engineering Center — a central hub for interdisciplinary research and teaching that became an anchor of the engineering campus.",
    location: "Stanford, California",
    key: false,
    tags: ["慈善", "斯坦福", "教育"],
    sources: [
      {
        id: "stanford-huang-center",
        url: "https://engineering.stanford.edu/news/huang-center-dedicated-lauded-stanfords-engineering-anchor",
        kind: "article",
        title: "Huang Center dedicated, lauded as Stanford's engineering anchor",
        publisher: "Stanford Engineering",
        lang: "en",
        primary: false,
        ...HUMAN,
      },
    ],
    source_hints: null,
  },
];

const toAdd = newEvents.filter((e) => !existingIds.has(e.id));
const skipped = newEvents.length - toAdd.length;

if (toAdd.length === 0) {
  console.log("nothing to add");
  process.exit(0);
}

const merged = [...events, ...toAdd].sort((a, b) =>
  a.date.localeCompare(b.date)
);

fs.writeFileSync(filePath, JSON.stringify(merged, null, 2) + "\n");
console.log(
  `added ${toAdd.length} huang events (skipped ${skipped}); total now ${merged.length}`
);
