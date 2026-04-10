#!/usr/bin/env node
/**
 * Bootstrap Benjamin Franklin events into data/events/franklin.json.
 * Idempotent: skips events whose id already exists.
 * Run audit-urls.mjs --write + parse-youtube.mjs --write + verify-embeds.mjs after.
 */
import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "data", "events", "franklin.json");
const events = fs.existsSync(filePath)
  ? JSON.parse(fs.readFileSync(filePath, "utf8"))
  : [];
const existingIds = new Set(events.map((e) => e.id));

const HUMAN = { license: "all-rights-reserved", authored_by: "human", mentions: [] };
const CCBYSA = { license: "cc-by-sa", authored_by: "human", mentions: [] };

const wikipediaFranklinSource = {
  id: "wikipedia-franklin-bio",
  url: "https://en.wikipedia.org/wiki/Benjamin_Franklin",
  kind: "article",
  title: "Benjamin Franklin (Wikipedia)",
  publisher: "Wikipedia",
  lang: "en",
  primary: false,
  ...CCBYSA,
};

const newEvents = [
  {
    id: "franklin-1706-01-17-birth",
    person_id: "franklin",
    date: "1706-01-17",
    date_precision: "day",
    type: "life",
    title: "本杰明·富兰克林出生于马萨诸塞州波士顿",
    title_en: "Benjamin Franklin born in Boston, Massachusetts",
    summary:
      "1706 年 1 月 17 日，本杰明·富兰克林出生于马萨诸塞州波士顿的一个清教徒家庭，是父亲乔赛亚·富兰克林 17 个孩子中的第 15 个、也是最小的儿子。父亲是从英格兰移民来的蜡烛和肥皂制造商。由于家庭经济有限，富兰克林只接受了两年正规教育，但他从小酷爱读书，自学成才的经历后来成为“美国精神”的原型。",
    summary_en:
      "Benjamin Franklin was born on January 17, 1706, in Boston, Massachusetts, the 15th of Josiah Franklin's 17 children and the youngest son. His father, an English immigrant, made candles and soap. Franklin received only two years of formal schooling but was a voracious reader — his self-education would become an archetype of the American spirit.",
    location: "Boston, Massachusetts",
    key: true,
    tags: ["出生", "波士顿", "童年"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1718-apprentice-printer",
    person_id: "franklin",
    date: "1718-01-01",
    date_precision: "year",
    type: "career",
    title: "成为哥哥詹姆斯的印刷学徒",
    title_en: "Becomes apprentice printer to brother James",
    summary:
      "1718 年，12 岁的富兰克林正式成为哥哥詹姆斯的印刷学徒，签下了为期九年的学徒契约。在印刷作坊里，他不仅学会了印刷排版技术，更通过大量阅读印刷品自学了写作。他以“沉默行善者”（Silence Dogood）的笔名在哥哥创办的《新英格兰报》上发表讽刺文章，广受欢迎。然而兄弟间的矛盾日益加深，为他日后的出走埋下了伏笔。",
    summary_en:
      "In 1718, the 12-year-old Franklin was formally apprenticed to his brother James, a printer. In the print shop he mastered typesetting and taught himself to write by studying printed works. Under the pseudonym 'Silence Dogood,' he published popular satirical essays in James's New-England Courant. Growing friction between the brothers, however, set the stage for his eventual escape.",
    location: "Boston, Massachusetts",
    key: true,
    tags: ["学徒", "印刷", "写作"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1723-runs-to-philadelphia",
    person_id: "franklin",
    date: "1723-01-01",
    date_precision: "year",
    type: "life",
    title: "逃离波士顿，只身前往费城",
    title_en: "Runs away from Boston to Philadelphia",
    summary:
      "1723 年，17 岁的富兰克林违反学徒契约，秘密逃离波士顿，辗转纽约后抵达费城。他到达时身无分文、蓬头垢面，走在费城街头啃着面包卷的场景后来成为美国文学中最经典的画面之一。然而正是在费城这座城市，富兰克林将从一个落魄少年成长为美国最杰出的政治家、科学家和外交家。这次出走也成为美国文化中“白手起家”叙事的原型。",
    summary_en:
      "In 1723, the 17-year-old Franklin broke his apprenticeship and secretly fled Boston, arriving in Philadelphia penniless and disheveled. The image of the young man walking down Market Street munching a bread roll became one of the most iconic scenes in American literature. Philadelphia would be the stage on which Franklin transformed from a runaway teenager into one of America's greatest statesmen, scientists, and diplomats.",
    location: "Philadelphia, Pennsylvania",
    key: true,
    tags: ["出走", "费城", "白手起家"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1729-pennsylvania-gazette",
    person_id: "franklin",
    date: "1729-01-01",
    date_precision: "year",
    type: "founding",
    title: "收购《宾夕法尼亚公报》",
    title_en: "Buys the Pennsylvania Gazette",
    summary:
      "1729 年富兰克林收购了经营不善的《宾夕法尼亚公报》（Pennsylvania Gazette），将其打造成北美殖民地最成功的报纸之一。他以犀利的评论、幽默的文风和高质量的印刷吸引了大量读者。这份报纸不仅为富兰克林带来了可观的经济收入，更奠定了他在费城乃至整个殖民地的公共影响力。《宾夕法尼亚公报》后来成为殖民地时期最重要的舆论阵地之一。",
    summary_en:
      "In 1729 Franklin purchased the struggling Pennsylvania Gazette and transformed it into one of the most successful newspapers in the American colonies. With sharp commentary, witty prose, and excellent printing, it drew a large readership. The Gazette gave Franklin both financial security and growing public influence across Pennsylvania and beyond.",
    location: "Philadelphia, Pennsylvania",
    key: true,
    tags: ["报纸", "媒体", "创业"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1732-poor-richards-almanack",
    person_id: "franklin",
    date: "1732-01-01",
    date_precision: "year",
    type: "writing",
    title: "开始出版《穷理查年鉴》",
    title_en: "Begins publishing Poor Richard's Almanack",
    summary:
      "1732 年富兰克林以“穷理查”（Richard Saunders）为笔名开始出版《穷理查年鉴》（Poor Richard's Almanack），持续出版长达 25 年。年鉴中穿插的格言警句——如“早睡早起使人健康、富有、聪明”“省一分等于赚一分”“天助自助者”——深入美国民间文化，至今被广泛引用。年鉴年销量高达一万册，是殖民地时代最畅销的出版物之一，也使富兰克林成为北美最家喻户晓的作家。",
    summary_en:
      "In 1732 Franklin began publishing Poor Richard's Almanack under the pen name Richard Saunders — a yearly publication he continued for 25 years. Its witty proverbs ('Early to bed and early to rise,' 'A penny saved is a penny earned,' 'God helps those who help themselves') became embedded in American culture. Selling up to 10,000 copies annually, it was one of the best-selling publications in colonial America and made Franklin a household name.",
    location: "Philadelphia, Pennsylvania",
    key: true,
    tags: ["写作", "穷理查年鉴", "格言"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1731-library-company",
    person_id: "franklin",
    date: "1731-01-01",
    date_precision: "year",
    type: "founding",
    title: "创立费城图书馆公司（美国第一家借阅图书馆）",
    title_en: "Founds the Library Company of Philadelphia (first lending library in America)",
    summary:
      "1731 年富兰克林创立了费城图书馆公司（Library Company of Philadelphia），这是北美殖民地第一家会员制借阅图书馆。会员缴纳会费后可借阅书籍，使普通市民也能接触到知识。这一创举体现了富兰克林“公共教育是共和国基石”的信念。费城图书馆公司至今仍在运营，是美国最古老的文化机构之一。此后富兰克林还参与创立了宾夕法尼亚大学和美国哲学学会。",
    summary_en:
      "In 1731 Franklin founded the Library Company of Philadelphia, the first subscription lending library in the American colonies. By pooling resources, ordinary citizens gained access to books previously available only to the wealthy. The institution reflected Franklin's belief that public education was the cornerstone of a republic. The Library Company still operates today as one of America's oldest cultural institutions.",
    location: "Philadelphia, Pennsylvania",
    key: true,
    tags: ["图书馆", "公共教育", "创立"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1752-06-kite-experiment",
    person_id: "franklin",
    date: "1752-06-01",
    date_precision: "month",
    type: "achievement",
    title: "进行风筝实验，证明闪电是电",
    title_en: "Performs kite experiment, proving lightning is electricity",
    summary:
      "1752 年 6 月，富兰克林在费城进行了著名的风筝实验：在暴风雨中放飞一只系有金属钥匙的风筝，成功将大气中的电引导到莱顿瓶中，证明了闪电就是电的一种形式。这一实验不仅验证了他之前提出的电学理论，更直接催生了避雷针的发明。富兰克林的电学研究使他获得英国皇家学会科普利奖章，成为当时欧洲最受尊敬的科学家之一。",
    summary_en:
      "In June 1752 Franklin conducted his famous kite experiment in Philadelphia, flying a kite with a metal key during a thunderstorm to capture atmospheric electricity in a Leyden jar, proving that lightning is electrical in nature. The experiment validated his earlier theories and directly led to his invention of the lightning rod. His electrical research earned him the Royal Society's Copley Medal and made him one of the most respected scientists in Europe.",
    location: "Philadelphia, Pennsylvania",
    key: true,
    tags: ["科学", "电学", "风筝实验", "避雷针"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1757-london-colonial-agent",
    person_id: "franklin",
    date: "1757-01-01",
    date_precision: "year",
    type: "career",
    title: "前往伦敦担任宾夕法尼亚殖民地代理人",
    title_en: "Goes to London as colonial agent for Pennsylvania",
    summary:
      "1757 年富兰克林受宾夕法尼亚议会派遣前往伦敦，代表殖民地与英国政府交涉税收和治理问题。他先后在伦敦居住了近 18 年（1757-1762，1764-1775），期间还兼任乔治亚、新泽西和马萨诸塞等殖民地的代理人。在英期间他广泛结交欧洲知识界精英，科学声望日隆。然而随着英国对殖民地征税日趋苛刻，富兰克林从温和的调解者逐渐转变为坚定的独立主义者。",
    summary_en:
      "In 1757 Franklin sailed to London as the Pennsylvania Assembly's agent to negotiate taxation and governance disputes with the British government. He spent nearly 18 years in London (1757-1762, 1764-1775), also representing Georgia, New Jersey, and Massachusetts. As Britain's colonial taxation policies grew harsher, Franklin gradually transformed from a moderate mediator to a firm advocate for American independence.",
    location: "London, England",
    key: true,
    tags: ["外交", "伦敦", "殖民地代理人"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1775-returns-to-america",
    person_id: "franklin",
    date: "1775-05-05",
    date_precision: "day",
    type: "life",
    title: "从伦敦返回美洲，投身独立运动",
    title_en: "Returns from London to join the American independence movement",
    summary:
      "1775 年 5 月 5 日，在伦敦遭受枢密院的公开羞辱后，69 岁的富兰克林离开生活了十余年的英格兰返回费城。抵达次日他即被选入第二次大陆会议。从英帝国的忠实子民到革命者的转变至此完成。富兰克林带回了对英国政治体制的深刻了解，以及在欧洲建立的广泛人脉——这些资源很快在独立战争中发挥了关键作用。",
    summary_en:
      "On May 5, 1775, after being publicly humiliated before the Privy Council in London, the 69-year-old Franklin returned to Philadelphia. He was elected to the Second Continental Congress the very next day. His transformation from loyal British subject to revolutionary was complete. Franklin brought with him an intimate knowledge of British politics and a vast European network — resources that would prove crucial in the coming war for independence.",
    location: "Philadelphia, Pennsylvania",
    key: false,
    tags: ["回国", "独立运动", "大陆会议"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1776-07-04-declaration",
    person_id: "franklin",
    date: "1776-07-04",
    date_precision: "day",
    type: "achievement",
    title: "参与起草并签署《独立宣言》",
    title_en: "Helps draft and signs the Declaration of Independence",
    summary:
      "1776 年 7 月 4 日，富兰克林作为“五人委员会”成员之一（与杰斐逊、亚当斯、谢尔曼、利文斯顿共同组成），参与了《独立宣言》的起草和修改。70 岁的富兰克林是签署者中年龄最大的一位。在签字仪式上，他留下了名言：“我们必须团结一致，否则就会被各个击破。”（We must all hang together, or most assuredly, we shall all hang separately.）宣言的发布标志着美国正式脱离英国独立。",
    summary_en:
      "On July 4, 1776, Franklin, as a member of the Committee of Five (alongside Jefferson, Adams, Sherman, and Livingston), helped draft and signed the Declaration of Independence. At 70, he was the oldest signatory. He reportedly quipped: 'We must all hang together, or most assuredly, we shall all hang separately.' The Declaration formally declared American independence from Britain.",
    location: "Philadelphia, Pennsylvania",
    key: true,
    tags: ["独立宣言", "建国", "五人委员会"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1778-02-06-treaty-france",
    person_id: "franklin",
    date: "1778-02-06",
    date_precision: "day",
    type: "achievement",
    title: "促成美法同盟条约签订",
    title_en: "Secures the Treaty of Alliance with France",
    summary:
      "1778 年 2 月 6 日，在富兰克林的长期外交努力下，美国与法国正式签署《美法同盟条约》。富兰克林于 1776 年底以 70 高龄抵达巴黎，凭借他在欧洲的科学声望和个人魅力，赢得了法国宫廷和知识界的广泛同情。法国的军事和财政援助成为美国独立战争的决定性转折点——没有法国的介入，美国独立几乎不可能实现。富兰克林在巴黎成为美国历史上最成功的外交官之一。",
    summary_en:
      "On February 6, 1778, after years of diplomatic effort by Franklin, the United States and France signed the Treaty of Alliance. Franklin had arrived in Paris in late 1776 at age 70, leveraging his scientific celebrity and personal charm to win over the French court and intelligentsia. France's military and financial support proved the decisive turning point of the American Revolution — without French intervention, American independence would have been virtually impossible. Franklin became one of the most successful diplomats in American history.",
    location: "Paris, France",
    key: true,
    tags: ["外交", "法国", "同盟条约", "独立战争"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1785-returns-from-france",
    person_id: "franklin",
    date: "1785-09-14",
    date_precision: "day",
    type: "life",
    title: "结束驻法使命返回费城，当选宾夕法尼亚州长",
    title_en: "Returns from France; elected President of Pennsylvania",
    summary:
      "1785 年 9 月 14 日，79 岁的富兰克林结束了长达近九年的驻法使命返回费城，受到万人空巷的热烈欢迎。他随即当选宾夕法尼亚最高行政委员会主席（相当于州长），连任三届直到 1788 年。尽管年事已高且饱受痛风和肾结石之苦，富兰克林仍然活跃在公共事务第一线，继续为新生的美国共和国贡献力量。",
    summary_en:
      "On September 14, 1785, the 79-year-old Franklin returned to Philadelphia after nearly nine years in France, receiving a hero's welcome. He was promptly elected President (Governor) of Pennsylvania, serving three terms until 1788. Despite advanced age, gout, and kidney stones, Franklin remained active in public affairs, continuing to serve the young republic.",
    location: "Philadelphia, Pennsylvania",
    key: false,
    tags: ["回国", "州长", "宾夕法尼亚"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1787-constitutional-convention",
    person_id: "franklin",
    date: "1787-09-17",
    date_precision: "day",
    type: "achievement",
    title: "出席制宪会议（最年长代表，81 岁）",
    title_en: "Attends the Constitutional Convention (oldest delegate, age 81)",
    summary:
      "1787 年 9 月 17 日，81 岁的富兰克林作为制宪会议最年长的代表签署了美国宪法。由于身体虚弱，他在会议后期需要被人用椅子抬入会场。尽管如此，他在关键时刻发挥了不可替代的调解作用，敦促各方妥协。在最终签署日，他发表了著名演讲：虽然宪法并不完美，但他怀疑任何制宪会议能做得更好。富兰克林是唯一同时签署了《独立宣言》《美法同盟条约》和《美国宪法》三份建国文件的美国国父。",
    summary_en:
      "On September 17, 1787, the 81-year-old Franklin signed the United States Constitution as the Convention's oldest delegate. Too frail to stand for long, he was carried into Independence Hall in a sedan chair. He played an indispensable role as mediator, urging compromise. In his famous closing speech, he acknowledged the Constitution's imperfections but doubted any convention could do better. Franklin is the only Founding Father to have signed all three foundational documents: the Declaration of Independence, the Treaty of Alliance with France, and the U.S. Constitution.",
    location: "Philadelphia, Pennsylvania",
    key: true,
    tags: ["制宪会议", "宪法", "国父", "妥协"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1790-04-17-death",
    person_id: "franklin",
    date: "1790-04-17",
    date_precision: "day",
    type: "life",
    title: "在费城去世，享年 84 岁",
    title_en: "Dies in Philadelphia at age 84",
    summary:
      "1790 年 4 月 17 日，本杰明·富兰克林在费城去世，享年 84 岁。约两万人参加了他的葬礼——约占费城总人口的一半。法国国民议会为他举行了三天的哀悼仪式。富兰克林的一生几乎与 18 世纪的美国同步：从波士顿的贫困少年到费城的印刷商、科学家、外交家和建国元勋，他的人生轨迹就是“美国梦”最早也最完美的注脚。他在遗嘱中留下资金设立了波士顿和费城的公益信托基金，运作超过 200 年。",
    summary_en:
      "Benjamin Franklin died on April 17, 1790, in Philadelphia at the age of 84. About 20,000 people attended his funeral — roughly half the city's population. France's National Assembly observed three days of mourning. Franklin's life mirrored the American century: from impoverished Boston youth to Philadelphia printer, scientist, diplomat, and Founding Father, his trajectory became the earliest and most complete embodiment of the 'American Dream.' In his will, he established charitable trusts for Boston and Philadelphia that operated for over 200 years.",
    location: "Philadelphia, Pennsylvania",
    key: true,
    tags: ["逝世", "纪念", "遗产"],
    sources: [{ ...wikipediaFranklinSource }],
    source_hints: null,
  },

  {
    id: "franklin-1743-american-philosophical-society",
    person_id: "franklin",
    date: "1743-01-01",
    date_precision: "year",
    type: "founding",
    title: "\u521b\u7acb\u7f8e\u56fd\u54f2\u5b66\u5b66\u4f1a",
    title_en: "Founds the American Philosophical Society",
    summary:
      "1743 \u5e74\u5bcc\u5170\u514b\u6797\u521b\u7acb\u4e86\u7f8e\u56fd\u54f2\u5b66\u5b66\u4f1a\uff08American Philosophical Society\uff09\uff0c\u8fd9\u662f\u7f8e\u56fd\u6700\u65e9\u7684\u5b66\u672f\u56e2\u4f53\uff0c\u65e8\u5728\u4fc3\u8fdb\u201c\u6709\u7528\u77e5\u8bc6\u201d\u7684\u4ea4\u6d41\u4e0e\u4f20\u64ad\u3002\u5b66\u4f1a\u6c47\u805a\u4e86\u6b96\u6c11\u5730\u65f6\u671f\u6700\u4f18\u79c0\u7684\u79d1\u5b66\u5bb6\u3001\u601d\u60f3\u5bb6\u548c\u53d1\u660e\u5bb6\uff0c\u6210\u4e3a\u7f8e\u56fd\u542f\u8499\u8fd0\u52a8\u7684\u6838\u5fc3\u673a\u6784\u3002\u5bcc\u5170\u514b\u6797\u76f8\u4fe1\uff0c\u77e5\u8bc6\u7684\u81ea\u7531\u6d41\u901a\u662f\u793e\u4f1a\u8fdb\u6b65\u7684\u57fa\u7840\u3002\u7f8e\u56fd\u54f2\u5b66\u5b66\u4f1a\u81f3\u4eca\u4ecd\u5728\u8fd0\u4f5c\uff0c\u662f\u7f8e\u56fd\u6700\u53e4\u8001\u7684\u5b66\u672f\u673a\u6784\u3002",
    summary_en:
      "In 1743 Franklin founded the American Philosophical Society, the first learned society in the American colonies, dedicated to promoting the exchange of 'useful knowledge.' It gathered the finest scientists, thinkers, and inventors of colonial America and became a central institution of the American Enlightenment. Franklin believed the free circulation of knowledge was the foundation of social progress. The American Philosophical Society remains active today as the oldest learned society in the United States.",
    location: "Philadelphia, Pennsylvania",
    key: false,
    tags: ["\u5b66\u672f", "\u54f2\u5b66\u5b66\u4f1a", "\u542f\u8499", "\u521b\u7acb"],
    sources: [{ ...wikipediaFranklinSource }],
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
  `added ${toAdd.length} franklin events (skipped ${skipped}); total now ${merged.length}`
);
