#!/usr/bin/env node
/**
 * Bootstrap Walt Disney events into data/events/disney.json.
 * Idempotent: skips events whose id already exists.
 * Run audit-urls.mjs --write + parse-youtube.mjs --write + verify-embeds.mjs after.
 */
import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "data", "events", "disney.json");
const events = fs.existsSync(filePath)
  ? JSON.parse(fs.readFileSync(filePath, "utf8"))
  : [];
const existingIds = new Set(events.map((e) => e.id));

const HUMAN = { license: "all-rights-reserved", authored_by: "human", mentions: [] };
const CCBYSA = { license: "cc-by-sa", authored_by: "human", mentions: [] };

const wikipediaDisneySource = {
  id: "wikipedia-disney-bio",
  url: "https://en.wikipedia.org/wiki/Walt_Disney",
  kind: "article",
  title: "Walt Disney (Wikipedia)",
  publisher: "Wikipedia",
  lang: "en",
  primary: false,
  ...CCBYSA,
};

const newEvents = [
  {
    id: "disney-1901-12-05-birth",
    person_id: "disney",
    date: "1901-12-05",
    date_precision: "day",
    type: "life",
    title: "华特·迪士尼出生于伊利诺伊州芝加哥",
    title_en: "Walt Disney born in Chicago, Illinois",
    summary:
      "1901 年 12 月 5 日，华特·伊利亚斯·迪士尼出生于伊利诺伊州芝加哥的赫莫萨社区。父亲伊利亚斯·迪士尼是一名建筑承包商，母亲弗洛拉是一名学校教师。华特是五个孩子中的第四个。家庭在他四岁时搬到密苏里州马塞琳的一个农场，那里的田园生活和自然风光深深影响了他后来对怀旧美国小镇形象的痴迷——这一审美后来在迪士尼乐园的“美国大街”中得到了完美呈现。",
    summary_en:
      "Walter Elias Disney was born on December 5, 1901, in the Hermosa neighborhood of Chicago, Illinois. His father Elias was a building contractor, his mother Flora a former school teacher. Walt was the fourth of five children. The family moved to a farm in Marceline, Missouri, when he was four — the idyllic small-town life there deeply influenced his lifelong nostalgic vision of America, later perfectly realized in Disneyland's Main Street, U.S.A.",
    location: "Chicago, Illinois, USA",
    key: true,
    tags: ["出生", "芝加哥", "童年"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1919-kansas-city-art",
    person_id: "disney",
    date: "1919-01-01",
    date_precision: "year",
    type: "career",
    title: "在堪萨斯城开始商业艺术和动画生涯",
    title_en: "Begins commercial art and animation career in Kansas City",
    summary:
      "1919 年，从法国红十字会救护车司机退役后，18 岁的华特·迪士尼在堪萨斯城找到了第一份商业艺术工作。他在 Pesmen-Rubin 商业美术工作室结识了同事乌布·伊沃克斯（Ub Iwerks），两人后来成为终生搭档。1920 年他加入堪萨斯城电影广告公司，首次接触动画制作技术。1921 年他创立了 Laugh-O-Gram 工作室制作动画短片，虽然公司最终在 1923 年破产，但这段经历为他日后的动画帝国奠定了技术和创意基础。",
    summary_en:
      "In 1919, after returning from service as a Red Cross ambulance driver in France, 18-year-old Walt Disney began his commercial art career in Kansas City. At Pesmen-Rubin studio he met Ub Iwerks, who became his lifelong collaborator. He founded Laugh-O-Gram Studio in 1921 to produce animated shorts; though it went bankrupt in 1923, the experience laid the technical and creative foundation for his future animation empire.",
    location: "Kansas City, Missouri, USA",
    key: true,
    tags: ["动画", "堪萨斯城", "乌布·伊沃克斯", "创业"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1923-10-16-disney-brothers-studio",
    person_id: "disney",
    date: "1923-10-16",
    date_precision: "day",
    type: "founding",
    title: "在好莱坞创立迪士尼兄弟工作室",
    title_en: "Founds Disney Brothers Studio in Hollywood",
    summary:
      "1923 年 10 月 16 日，华特·迪士尼与哥哥罗伊·迪士尼在加州好莱坞的叔叔车库里创立了迪士尼兄弟动画工作室（Disney Brothers Cartoon Studio）。公司最初制作“爱丽丝喜剧”系列（真人与动画结合的短片）。这一天后来被定为华特迪士尼公司的正式创立日。从一间车库到后来市值数千亿美元的全球娱乐帝国，迪士尼兄弟工作室的创立标志着一个传奇的开端。",
    summary_en:
      "On October 16, 1923, Walt Disney and his brother Roy O. Disney founded the Disney Brothers Cartoon Studio in their uncle's garage in Hollywood, California. They initially produced the 'Alice Comedies' series combining live action and animation. This date is recognized as the official founding of The Walt Disney Company. From a humble garage to a global entertainment empire worth hundreds of billions, the studio's founding marked the beginning of a legend.",
    location: "Hollywood, California, USA",
    key: true,
    tags: ["创立", "迪士尼公司", "好莱坞", "罗伊·迪士尼"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1928-11-18-steamboat-willie",
    person_id: "disney",
    date: "1928-11-18",
    date_precision: "day",
    type: "achievement",
    title: "《威利号汽船》首映，米老鼠诞生",
    title_en: "Steamboat Willie premieres — Mickey Mouse is born",
    summary:
      "1928 年 11 月 18 日，动画短片《威利号汽船》（Steamboat Willie）在纽约殖民地剧院首映。这是第一部配有完整同步音效的动画片，标志着动画史上的技术革命。影片中的米老鼠（Mickey Mouse）一夜成名，成为全球最具辨识度的卡通形象。米老鼠的诞生源于迪士尼失去“幸运兔奥斯华”版权后的绝地反击——他和伊沃克斯在火车上构思了这个新角色。迪士尼从此牢牢控制自己创作的知识产权，这一教训深刻塑造了公司的商业策略。",
    summary_en:
      "On November 18, 1928, Steamboat Willie premiered at the Colony Theatre in New York City. It was the first cartoon with fully synchronized sound throughout, marking a technical revolution in animation history. Mickey Mouse became an overnight sensation and the world's most recognizable cartoon character. Mickey was born from adversity — after losing the rights to Oswald the Lucky Rabbit, Disney and Iwerks conceived Mickey on a train ride. Disney's resolve to never again lose control of his intellectual property fundamentally shaped the company's business strategy.",
    location: "New York City, USA",
    key: true,
    tags: ["米老鼠", "威利号汽船", "动画", "有声动画"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1932-flowers-trees-first-color",
    person_id: "disney",
    date: "1932-07-30",
    date_precision: "day",
    type: "achievement",
    title: "《花与树》获首届奥斯卡最佳动画短片奖",
    title_en: "Flowers and Trees wins first Academy Award for Animated Short Film",
    summary:
      "1932 年，迪士尼的“糊涂交响曲”系列短片《花与树》（Flowers and Trees）成为第一部使用三色 Technicolor 技术制作的商业动画片，并获得第五届奥斯卡金像奖首次设立的最佳动画短片奖。迪士尼与 Technicolor 签订了为期两年的独家使用协议，将竞争对手挡在彩色动画大门之外。这一策略性举措展现了华特·迪士尼不仅是艺术家，更是精明的商人——他始终追求技术领先并善于将技术优势转化为商业壁垒。",
    summary_en:
      "In 1932 Disney's Silly Symphony short Flowers and Trees became the first commercial animated film produced in full-color Technicolor and won the inaugural Academy Award for Best Animated Short Film. Disney secured a two-year exclusive deal with Technicolor, locking out competitors from color animation. This strategic move revealed Walt Disney as not just an artist but a shrewd businessman who consistently pursued technological leadership and turned it into competitive advantage.",
    location: "Hollywood, California, USA",
    key: false,
    tags: ["奥斯卡", "彩色动画", "Technicolor", "技术创新"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1937-12-21-snow-white",
    person_id: "disney",
    date: "1937-12-21",
    date_precision: "day",
    type: "achievement",
    title: "《白雪公主与七个小矮人》首映——首部动画长片",
    title_en: "Snow White and the Seven Dwarfs premieres — first full-length animated feature",
    summary:
      "1937 年 12 月 21 日，《白雪公主与七个小矮人》在好莱坞迦太基圆形剧场举行盛大首映。这是世界上第一部用赛璐璐技术制作的动画长片，也是第一部美国动画长片。好莱坞业界曾嘲讽这个项目为“迪士尼的蠢事”（Disney's Folly），预言它必将惨败。然而影片最终获得了相当于今天 1 亿美元的票房，成为当时最赚钱的有声电影。这部电影证明了动画不只是短片笑料，更能够承载复杂的叙事和深刻的情感。",
    summary_en:
      "On December 21, 1937, Snow White and the Seven Dwarfs premiered at the Carthay Circle Theatre in Hollywood. It was the world's first full-length cel-animated feature film. The industry had mocked the project as 'Disney's Folly,' predicting certain failure. Instead, it earned the equivalent of $100 million in today's dollars, becoming the highest-grossing sound film at the time. Snow White proved that animation could carry complex storytelling and deep emotion, not just slapstick comedy.",
    location: "Hollywood, California, USA",
    key: true,
    tags: ["白雪公主", "动画长片", "票房", "里程碑"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1940-11-13-fantasia",
    person_id: "disney",
    date: "1940-11-13",
    date_precision: "day",
    type: "achievement",
    title: "《幻想曲》上映——动画与古典音乐的实验性结合",
    title_en: "Fantasia released — experimental fusion of animation and classical music",
    summary:
      "1940 年 11 月 13 日，《幻想曲》（Fantasia）上映。这部电影将动画与古典音乐深度融合，由费城管弦乐团演奏、利奥波德·斯托科夫斯基指挥。影片还首次使用了多声道立体声系统“Fantasound”。虽然《幻想曲》在首映时因票房不佳和二战导致欧洲市场关闭而造成严重亏损，但它后来被公认为动画史上最大胆的艺术实验之一。华特·迪士尼坚持认为这是他最自豪的作品。",
    summary_en:
      "On November 13, 1940, Fantasia was released, fusing animation with classical music performed by the Philadelphia Orchestra under Leopold Stokowski. It pioneered the multi-channel stereophonic 'Fantasound' system. Though Fantasia initially lost money due to poor box office and the closure of European markets during WWII, it is now recognized as one of the boldest artistic experiments in animation history. Walt Disney considered it his proudest achievement.",
    location: "New York City, USA",
    key: true,
    tags: ["幻想曲", "古典音乐", "艺术实验", "立体声"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1941-animators-strike",
    person_id: "disney",
    date: "1941-05-29",
    date_precision: "day",
    type: "life",
    title: "迪士尼动画师大罢工",
    title_en: "Disney animators' strike",
    summary:
      "1941 年 5 月 29 日，迪士尼工作室爆发了为期五周的动画师大罢工。起因是华特·迪士尼解雇了工会组织者阿特·巴比特等人，引发了约两百名员工的不满。罢工最终在联邦政府调解下以工会胜利告终。这一事件深刻改变了迪士尼——他从此对工会和左翼势力怀有深刻不信任，冷战期间甚至成为 FBI 的线人，并在国会非美活动委员会上作证指控同事是共产主义者。罢工也导致大批优秀动画师离开，其中许多人后来创立了联合制片（UPA）等竞争工作室。",
    summary_en:
      "On May 29, 1941, a five-week strike erupted at the Disney studio after Walt fired union organizer Art Babbitt and others. About 200 employees walked out, and the strike ended with a union victory after federal mediation. The event deeply changed Disney — he developed lasting distrust of unions and left-wing movements, later becoming an FBI informant and testifying before the House Un-American Activities Committee. The strike also caused an exodus of top animators, many of whom went on to found rival studios like UPA.",
    location: "Burbank, California, USA",
    key: true,
    tags: ["罢工", "工会", "争议", "阴暗面"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1955-07-17-disneyland-opens",
    person_id: "disney",
    date: "1955-07-17",
    date_precision: "day",
    type: "founding",
    title: "迪士尼乐园在加州阿纳海姆开园",
    title_en: "Disneyland opens in Anaheim, California",
    summary:
      "1955 年 7 月 17 日，迪士尼乐园（Disneyland）在加利福尼亚州阿纳海姆正式开园。开园日通过 ABC 电视台全国直播，虽然出现了沥青未干、饮水设施不足等混乱（被内部称为“黑色星期天”），但迪士尼乐园很快成为全球最成功的主题公园。华特·迪士尼亲自参与了每一个细节的设计——从“美国大街”的强制透视建筑到景区之间的视觉隔离。迪士尼乐园不仅创造了一个全新的娱乐产业（主题公园），更将迪士尼公司从一家动画工作室转变为综合性娱乐帝国。",
    summary_en:
      "On July 17, 1955, Disneyland opened in Anaheim, California. Opening day — broadcast live nationally on ABC — was marred by soft asphalt, insufficient water fountains, and overcrowding (internally called 'Black Sunday'), but the park quickly became the world's most successful theme park. Walt personally oversaw every detail, from the forced-perspective architecture of Main Street to the visual separation between themed lands. Disneyland created an entirely new entertainment industry and transformed the Disney company from an animation studio into a diversified entertainment empire.",
    location: "Anaheim, California, USA",
    key: true,
    tags: ["迪士尼乐园", "主题公园", "开园", "里程碑"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1964-08-27-mary-poppins",
    person_id: "disney",
    date: "1964-08-27",
    date_precision: "day",
    type: "achievement",
    title: "《欢乐满人间》上映——华特生前最后的巅峰之作",
    title_en: "Mary Poppins released — Walt's final masterpiece in his lifetime",
    summary:
      "1964 年 8 月 27 日，《欢乐满人间》（Mary Poppins）在美国上映。这部真人与动画结合的电影由朱莉·安德鲁斯和迪克·范·戴克主演，获得了五项奥斯卡金像奖（共 13 项提名），包括朱莉·安德鲁斯的最佳女主角奖。影片票房达到 1 亿美元（1964 年美元），成为当年最卖座的电影。华特·迪士尼花了整整 20 年时间才说服原著作者 P.L.特拉弗斯授权改编。这是华特·迪士尼生前参与的最后一部伟大电影，也被许多人视为他的艺术遗嘱。",
    summary_en:
      "On August 27, 1964, Mary Poppins was released in the United States. Starring Julie Andrews and Dick Van Dyke, the live-action/animation hybrid won five Academy Awards (from 13 nominations), including Best Actress for Andrews. It grossed $100 million (1964 dollars), becoming the year's top film. Walt had spent 20 years persuading author P.L. Travers to grant film rights. Mary Poppins was the last great film Walt Disney personally oversaw and is considered by many his artistic testament.",
    location: "Hollywood, California, USA",
    key: true,
    tags: ["欢乐满人间", "奥斯卡", "真人动画", "巅峰"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1965-11-15-disney-world-announcement",
    person_id: "disney",
    date: "1965-11-15",
    date_precision: "day",
    type: "career",
    title: "宣布在佛罗里达建设迪士尼世界计划",
    title_en: "Announces plans for Walt Disney World in Florida",
    summary:
      "1965 年 11 月 15 日，华特·迪士尼在佛罗里达州举行新闻发布会，正式宣布了在奥兰多附近建设“迪士尼世界”（Walt Disney World）的宏伟计划。项目占地约 27,000 英亩（约 109 平方公里），面积是迪士尼乐园的 150 倍。华特的核心愿景是 EPCOT（实验性未来社区原型）——一座真正有居民居住的未来城市。迪士尼公司此前已通过多个空壳公司秘密购买了大片佛罗里达沼泽地。遗憾的是，华特在项目完工前去世，迪士尼世界于 1971 年开园时，EPCOT 的原始愿景已被大幅简化。",
    summary_en:
      "On November 15, 1965, Walt Disney held a press conference in Florida to unveil plans for Walt Disney World near Orlando. The project spanned approximately 27,000 acres (109 km²) — 150 times the size of Disneyland. Walt's central vision was EPCOT (Experimental Prototype Community of Tomorrow), a working city of the future with real residents. Disney had secretly acquired vast Florida swampland through shell companies. Tragically, Walt died before the project's completion; when Walt Disney World opened in 1971, the original EPCOT vision had been significantly scaled back.",
    location: "Orlando, Florida, USA",
    key: true,
    tags: ["迪士尼世界", "EPCOT", "佛罗里达", "未来城市"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1966-12-15-death",
    person_id: "disney",
    date: "1966-12-15",
    date_precision: "day",
    type: "life",
    title: "华特·迪士尼在加州去世，享年 65 岁",
    title_en: "Walt Disney dies in Burbank, California, at age 65",
    summary:
      "1966 年 12 月 15 日，华特·迪士尼因肺癌在加州伯班克圣约瑟夫医院去世，享年 65 岁。他是一位终生重度吸烟者。去世前几周他还在病床上用天花板上的方格瓷砖向哥哥罗伊规划迪士尼世界的布局。华特的离去使公司陷入了长达十余年的方向迷失期（被内部称为“如果华特在的话会怎么做”的时代）。他一生获得 22 项奥斯卡金像奖和 59 项提名——至今仍是个人获奖最多的纪录。华特·迪士尼以想象力、完美主义和商业远见重新定义了全球娱乐产业。",
    summary_en:
      "Walt Disney died of lung cancer on December 15, 1966, at St. Joseph Hospital in Burbank, California, at age 65. A lifelong heavy smoker, he had been planning Disney World layout on his hospital ceiling tiles just weeks before his death. His passing plunged the company into over a decade of creative drift (the 'What Would Walt Do?' era). He won 22 Academy Awards from 59 nominations — still the record for most Oscars won by any individual. Walt Disney redefined the global entertainment industry through imagination, perfectionism, and visionary business acumen.",
    location: "Burbank, California, USA",
    key: true,
    tags: ["逝世", "纪念", "遗产", "奥斯卡纪录"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1928-oswald-loss",
    person_id: "disney",
    date: "1928-02-01",
    date_precision: "month",
    type: "career",
    title: "失去幸运兔奥斯华版权——知识产权觉醒的教训",
    title_en: "Loses Oswald the Lucky Rabbit rights — a pivotal lesson in IP control",
    summary:
      "1928 年初，华特·迪士尼前往纽约与发行商 Charles Mintz 谈判续约时，震惊地发现对方不仅拒绝加价，还已经在他背后挖走了大部分动画师，并且由于合同条款，“幸运兔奥斯华”的版权归发行商而非迪士尼所有。这一痛苦教训成为迪士尼商业哲学的转折点：从此以后，他坚持拥有自己创作的一切角色和内容的完整版权。正是在返回洛杉矶的火车上，他和妻子莉莲构思了米老鼠——一个将完全属于迪士尼的角色。",
    summary_en:
      "In early 1928, Walt traveled to New York to renegotiate with distributor Charles Mintz, only to discover that Mintz had poached most of his animators and, due to contract terms, owned the rights to Oswald the Lucky Rabbit. This painful lesson became the turning point in Disney's business philosophy: he vowed to always retain full ownership of his characters and content. It was on the train ride back to Los Angeles that he and wife Lillian conceived Mickey Mouse — a character that would belong entirely to Disney.",
    location: "New York City, USA",
    key: true,
    tags: ["奥斯华", "版权", "知识产权", "教训"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },

  {
    id: "disney-1950-cinderella-renaissance",
    person_id: "disney",
    date: "1950-02-15",
    date_precision: "day",
    type: "achievement",
    title: "《灰姑娘》上映，拯救迪士尼工作室于财务危机",
    title_en: "Cinderella released, rescuing the Disney studio from financial crisis",
    summary:
      "1950 年 2 月 15 日，《灰姑娘》（Cinderella）在美国上映。在经历了二战期间的《小鹿斑比》（1942）之后长达八年没有推出动画长片的低谷期后，《灰姑娘》的巨大商业成功（票房收入超过制作成本的十倍）将迪士尼工作室从濒临破产的边缘拉了回来。影片的利润为华特提供了资金去实现他最大胆的梦想：迪士尼乐园。《灰姑娘》也奠定了“迪士尼公主”系列的商业模式，至今仍是公司最重要的 IP 资产之一。",
    summary_en:
      "On February 15, 1950, Cinderella was released in the United States. After an eight-year gap without an animated feature following Bambi (1942), Cinderella's enormous commercial success (earning over ten times its production cost) rescued the Disney studio from the brink of bankruptcy. Its profits provided Walt with the capital to pursue his boldest dream: Disneyland. Cinderella also established the 'Disney Princess' franchise model, which remains one of the company's most valuable IP assets to this day.",
    location: "USA",
    key: false,
    tags: ["灰姑娘", "票房", "复兴", "迪士尼公主"],
    sources: [{ ...wikipediaDisneySource }],
    source_hints: null,
  },
];

newEvents.push({
  id: "disney-1953-peter-pan-distribution",
  person_id: "disney",
  date: "1953-07-28",
  date_precision: "day",
  type: "career",
  title: "\u521b\u7acb Buena Vista \u53d1\u884c\u516c\u53f8\uff0c\u5b9e\u73b0\u81ea\u4e3b\u53d1\u884c",
  title_en: "Founds Buena Vista Distribution, achieving self-distribution",
  summary:
    "1953 \u5e74\uff0c\u534e\u7279\u00b7\u8fea\u58eb\u5c3c\u521b\u7acb\u4e86 Buena Vista \u53d1\u884c\u516c\u53f8\uff0c\u7ed3\u675f\u4e86\u8fea\u58eb\u5c3c\u957f\u671f\u4f9d\u8d56 RKO\u3001\u54e5\u4f26\u6bd4\u4e9a\u7b49\u5916\u90e8\u53d1\u884c\u5546\u7684\u5386\u53f2\u3002\u8fd9\u4e00\u51b3\u7b56\u4f53\u73b0\u4e86\u534e\u7279\u201c\u63a7\u5236\u4ef7\u503c\u94fe\u6bcf\u4e00\u4e2a\u73af\u8282\u201d\u7684\u5546\u4e1a\u54f2\u5b66\u2014\u2014\u4ece\u521b\u4f5c\u3001\u5236\u4f5c\u5230\u53d1\u884c\u548c\u5c55\u793a\uff0c\u8fea\u58eb\u5c3c\u8981\u628a\u547d\u8fd0\u638c\u63e1\u5728\u81ea\u5df1\u624b\u4e2d\u3002\u8fd9\u4e00\u6218\u7565\u4e0e\u4ed6\u5f53\u5e74\u4e22\u5931\u5965\u65af\u534e\u7248\u6743\u7684\u6559\u8bad\u4e00\u8109\u76f8\u627f\uff0c\u5c55\u73b0\u4e86\u8fea\u58eb\u5c3c\u5bf9\u5546\u4e1a\u81ea\u4e3b\u6743\u7684\u6267\u7740\u8ffd\u6c42\u3002Buena Vista \u540e\u6765\u6f14\u53d8\u4e3a\u4eca\u5929\u7684\u534e\u7279\u8fea\u58eb\u5c3c\u5de5\u4f5c\u5ba4\u7535\u5f71\u53d1\u884c\u90e8\u95e8\u3002",
  summary_en:
    "In 1953 Walt Disney founded Buena Vista Distribution, ending Disney's long dependence on outside distributors like RKO and Columbia. This move embodied Walt's philosophy of controlling every link in the value chain \u2014 from creation and production to distribution and exhibition. The strategy traced directly back to the Oswald lesson: Disney would never again let others control his destiny. Buena Vista evolved into today's Walt Disney Studios Motion Pictures distribution arm.",
  location: "Burbank, California, USA",
  key: false,
  tags: ["\u53d1\u884c", "\u5546\u4e1a\u7b56\u7565", "Buena Vista", "\u81ea\u4e3b\u6743"],
  sources: [{ ...wikipediaDisneySource }],
  source_hints: null,
});

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
  `added ${toAdd.length} disney events (skipped ${skipped}); total now ${merged.length}`
);
