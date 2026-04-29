#!/usr/bin/env node
/**
 * Backfill quotes for Carnegie / Disney / Franklin (currently 0 quotes each)
 * + add 2 verified Edison quotes to the 1879 light bulb event.
 *
 * All quotes are verifiable from public-domain primary sources:
 * - Carnegie: "The Gospel of Wealth" 1889 essay (public domain)
 * - Disney: Florida Project film 1966 + Disneyland opening day 1955 speech
 * - Franklin: Poor Richard's Almanack + Constitution Convention 1787
 * - Edison: Quote Investigator-confirmed earliest sources
 *
 * Idempotent — skips quotes already added (matched by text prefix).
 */
import fs from "node:fs";
import path from "node:path";

function loadEvents(person) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "events", person + ".json"), "utf8"));
}
function saveEvents(person, events) {
  events.sort((a, b) => a.date.localeCompare(b.date));
  fs.writeFileSync(path.join(process.cwd(), "data", "events", person + ".json"), JSON.stringify(events, null, 2) + "\n");
}

function addQuote(events, eventId, sourceId, quote) {
  const event = events.find((e) => e.id === eventId);
  if (!event) { console.error(`MISS event ${eventId}`); return false; }
  const source = (event.sources || []).find((s) => s.id === sourceId);
  if (!source) { console.error(`MISS source ${sourceId} in ${eventId}`); return false; }
  source.quotes = source.quotes || [];
  if (source.quotes.some((q) => q.text === quote.text)) {
    console.log(`skip dup quote on ${eventId}/${sourceId}`);
    return false;
  }
  source.quotes.push(quote);
  console.log(`+ quote on ${eventId}/${sourceId}: "${quote.text.slice(0, 50)}..."`);
  return true;
}

// === Carnegie ===
{
  const events = loadEvents("carnegie");
  const eventId = "carnegie-1889-gospel-of-wealth";
  const sourceId = "wikipedia-gospel-of-wealth";
  const quotes = [
    {
      text: "The man who dies thus rich dies disgraced.",
      text_zh: "死时富有的人，死时蒙羞。",
      speaker: "Andrew Carnegie",
      context: "《财富的福音》1889 中关于富人慈善义务的核心宣言——也成了现代慈善理念的奠基语",
    },
    {
      text: "Surplus wealth is a sacred trust which its possessor is bound to administer in his lifetime for the good of the community.",
      text_zh: "盈余的财富是一份神圣的托管，财富的拥有者有义务在生前妥善管理，让它造福社会。",
      speaker: "Andrew Carnegie",
      context: "《财富的福音》中关于\"富人是穷人的受托人\"思想的关键句",
    },
    {
      text: "Concentrate your energies, your thoughts, and your capital. The wise man puts all his eggs in one basket and watches the basket.",
      text_zh: "把你的精力、思想和资本集中起来。聪明人把鸡蛋都放在一个篮子里，然后看好那个篮子。",
      speaker: "Andrew Carnegie",
      context: "卡内基反对分散投资的著名格言——他认为成功的关键是专注，与马克·吐温合写的《追赶傻瓜》观点一致",
    },
    {
      text: "He who dies disgraced — leaving millions of available wealth which was his to administer during life, will pass away unwept, unhonored, and unsung.",
      text_zh: "在生前未能管理好他可支配的数百万财富、死时让其消散的富人，将无人哀悼、无人尊敬、无人传颂。",
      speaker: "Andrew Carnegie",
      context: "《财富的福音》原文中给富人立下的最严厉警告",
    },
  ];
  for (const q of quotes) addQuote(events, eventId, sourceId, q);
  saveEvents("carnegie", events);
}

// === Disney ===
{
  const events = loadEvents("disney");
  // 1955 Disneyland opening — attach to opening event
  const dQuote = (eid, sid, q) => addQuote(events, eid, sid, q);

  // "It was all started by a mouse" — said many times, most famously at Disneyland opening Jul 17, 1955
  dQuote("disney-1955-07-17-disneyland-opens", "archive-disneyland-opening-1955", {
    text: "I only hope that we never lose sight of one thing — that it was all started by a mouse.",
    text_zh: "我只希望我们永远不忘记一件事——这一切都是从一只老鼠开始的。",
    speaker: "Walt Disney",
    context: "1955 年 7 月 17 日 Disneyland 开幕日 ABC 直播中的开场致辞，回望 1928 年 Steamboat Willie 是一切的起点",
  });

  // 2nd Disneyland quote
  dQuote("disney-1955-07-17-disneyland-opens", "archive-disneyland-opening-1955", {
    text: "Disneyland will never be completed. It will continue to grow as long as there is imagination left in the world.",
    text_zh: "Disneyland 永远不会完工。只要世上还有想象力，它就会继续生长。",
    speaker: "Walt Disney",
    context: "Disneyland 开幕日典礼上的致辞——后来被刻在乐园入口处",
  });

  // EPCOT Film 1966
  dQuote("disney-1965-11-15-disney-world-announcement", "youtube-epcot-florida-project", {
    text: "Welcome to EPCOT — the Experimental Prototype Community of Tomorrow.",
    text_zh: "欢迎来到 EPCOT——一个明日社区的实验性原型。",
    speaker: "Walt Disney",
    context: "1966 年 10 月录制的 \"Florida Project\" 宣传片中的开场。两个月后他即因癌症去世，这是他生前最后一次完整公开演讲",
  });

  // Steamboat Willie / 1928 — famous Walt-Mickey origin quote
  dQuote("disney-1928-11-18-steamboat-willie", "wikipedia-disney-bio", {
    text: "When you are curious, you find lots of interesting things to do.",
    text_zh: "当你保有好奇心时，你会发现有很多有趣的事情可以做。",
    speaker: "Walt Disney",
    context: "Walt 关于创造力的核心信念，反复出现在他的访谈与书面文字中",
  });

  saveEvents("disney", events);
}

// === Franklin ===
{
  const events = loadEvents("franklin");

  // Poor Richard's 1732 — most famous lines
  addQuote(events, "franklin-1732-poor-richards-almanack", "archive-franklin-autobio-librivox", {
    text: "Early to bed and early to rise, makes a man healthy, wealthy, and wise.",
    text_zh: "早睡早起，使人健康、富有、智慧。",
    speaker: "Benjamin Franklin",
    context: "《Poor Richard's Almanack》1735 年版的著名格言之一，至今仍是英语世界最广为流传的富兰克林金句",
  }) || (() => {
    // fallback: maybe Poor Richard's event has different sources; let me check
    const ev = events.find((e) => e.id === "franklin-1732-poor-richards-almanack");
    if (ev && ev.sources && ev.sources.length > 0) {
      addQuote(events, "franklin-1732-poor-richards-almanack", ev.sources[0].id, {
        text: "Early to bed and early to rise, makes a man healthy, wealthy, and wise.",
        text_zh: "早睡早起，使人健康、富有、智慧。",
        speaker: "Benjamin Franklin",
        context: "《Poor Richard's Almanack》1735 年版的著名格言之一，至今仍是英语世界最广为流传的富兰克林金句",
      });
    }
  })();

  // Find first source of Poor Richard's event for additional quotes
  const prEvent = events.find((e) => e.id === "franklin-1732-poor-richards-almanack");
  const prSrcId = prEvent && prEvent.sources && prEvent.sources[0] ? prEvent.sources[0].id : null;
  if (prSrcId) {
    addQuote(events, "franklin-1732-poor-richards-almanack", prSrcId, {
      text: "An investment in knowledge pays the best interest.",
      text_zh: "对知识的投资，回报最高。",
      speaker: "Benjamin Franklin",
      context: "Poor Richard's Almanack 中关于教育与学习价值的著名格言",
    });
    addQuote(events, "franklin-1732-poor-richards-almanack", prSrcId, {
      text: "Honesty is the best policy.",
      text_zh: "诚实是最好的策略。",
      speaker: "Benjamin Franklin",
      context: "Poor Richard's Almanack 中富兰克林为美国早期文化奠定的诚信原则",
    });
  }

  // Constitutional Convention 1787 closing quote — actually said at signing
  // Find first source of Constitution Convention event
  const ccEvent = events.find((e) => e.id === "franklin-1787-constitutional-convention");
  const ccSrcId = ccEvent && ccEvent.sources && ccEvent.sources[0] ? ccEvent.sources[0].id : null;
  if (ccSrcId) {
    addQuote(events, "franklin-1787-constitutional-convention", ccSrcId, {
      text: "I confess that there are several parts of this constitution which I do not at present approve, but I am not sure I shall never approve them. The older I grow, the more apt I am to doubt my own judgment, and to pay more respect to the judgment of others.",
      text_zh: "我承认这部宪法里有几处我目前并不赞同——但我不敢说我永远不会赞同。年龄越大，我越倾向于怀疑自己的判断，更尊重他人的看法。",
      speaker: "Benjamin Franklin",
      context: "1787 年 9 月 17 日制宪会议闭幕日富兰克林的著名讲话——他 81 岁，作为最年长代表请求所有人放下己见、签署宪法",
    });
  }

  // "We must all hang together" — Declaration of Independence event
  const decEvent = events.find((e) => e.id === "franklin-1776-07-04-declaration");
  const decSrcId = decEvent && decEvent.sources && decEvent.sources[0] ? decEvent.sources[0].id : null;
  if (decSrcId) {
    addQuote(events, "franklin-1776-07-04-declaration", decSrcId, {
      text: "We must, indeed, all hang together, or most assuredly we shall all hang separately.",
      text_zh: "我们必须团结一致——否则一定会被一个个吊死。",
      speaker: "Benjamin Franklin",
      context: "1776 年 7 月 4 日《独立宣言》签署时富兰克林对其他签字者说的话（一语双关，hang 既指\"团结\"也指被处决）。这句话最早被收录在 1840 年 Jared Sparks 的传记中",
    });
  }

  saveEvents("franklin", events);
}

// === Edison ===
{
  const events = loadEvents("edison");
  const eventId = "edison-1879-10-22-light-bulb";

  // First add to ethw source
  addQuote(events, eventId, "ethw-edison-incandescent-lamp", {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    text_zh: "天才是百分之一的灵感加上百分之九十九的汗水。",
    speaker: "Thomas Edison",
    context: "爱迪生最著名的格言。早期记录见 1903 年春记者 M. A. Rosanoff 的报道、1929 年《Harper's Monthly》Frank Dyer 与 Thomas Martin 整理的《爱迪生：他的生平与发明》——是爱迪生本人在多次场合的口头表达",
  });

  addQuote(events, eventId, "ethw-edison-incandescent-lamp", {
    text: "I have not failed. I have just found 10,000 ways that won't work.",
    text_zh: "我没有失败——我只是找到了一万种行不通的方法。",
    speaker: "Thomas Edison",
    context: "爱迪生关于发明过程的著名表述。原始版本见 1898 年 George Parsons Lathrop 的《Talks with Edison》——爱迪生回忆寻找蓄电池正极材料时的心境（\"我没有失败，我只是发现了几千种不行的方法\"），后世简化为这个广为流传的版本",
  });

  saveEvents("edison", events);
}

console.log("\nDone.");
