#!/usr/bin/env node
import fs from "node:fs";

function addQuotes(file, quotesMap) {
  const events = JSON.parse(fs.readFileSync(file, "utf8"));
  let added = 0;
  for (const e of events) {
    const quotes = quotesMap[e.id];
    if (!quotes) continue;
    const target =
      e.sources.find((s) => !s.quotes || s.quotes.length === 0) ||
      e.sources[0];
    if (!target) continue;
    if (target.quotes && target.quotes.length > 0) continue;
    target.quotes = quotes;
    added += quotes.length;
    console.log(`+ ${e.id} (${quotes.length} quotes)`);
  }
  if (added) fs.writeFileSync(file, JSON.stringify(events, null, 2) + "\n");
  return added;
}

// Musk quotes
const muskAdded = addQuotes("data/events/musk.json", {
  "musk-2002-03-14-spacex-founding": [
    {
      text: "When something is important enough, you do it even if the odds are not in your favor.",
      text_zh: "当一件事足够重要时，即使胜算不在你这边，你也要去做。",
      speaker: "Elon Musk",
      context: "Frequently cited on why he founded SpaceX despite near-certain failure",
    },
  ],
  "musk-2008-09-28-falcon-1-orbit": [
    {
      text: "I messed up the first three launches. The fourth launch \u2014 if that had failed, SpaceX would have been done.",
      text_zh: "前三次发射我都搞砸了。第四次\u2014\u2014如果还失败，SpaceX 就完了。",
      speaker: "Elon Musk",
      context: "Recounting the existential stakes of Falcon 1 Flight 4",
    },
  ],
  "musk-2015-12-21-falcon-9-landing": [
    {
      text: "The falcon has landed.",
      text_zh: "猎鹰着陆了。",
      speaker: "SpaceX Mission Control",
      context:
        "The call from SpaceX mission control as Falcon 9 first stage touched down at LZ-1, echoing Apollo 11's \"the Eagle has landed\"",
    },
  ],
  "musk-2022-10-27-twitter-close": [
    {
      text: "The bird is freed.",
      text_zh: "鸟被释放了。",
      speaker: "Elon Musk",
      context: "His first tweet after closing the $44B Twitter acquisition, October 28, 2022",
    },
  ],
  "musk-2018-09-06-joe-rogan": [
    {
      text: "Nobody ever changed the world on 40 hours a week.",
      text_zh: "没有人靠每周 40 小时工作改变过世界。",
      speaker: "Elon Musk",
      context: "On work ethic during Joe Rogan Experience #1169",
    },
  ],
});

// Munger quotes
const mungerAdded = addQuotes("data/events/munger.json", {
  "munger-1959-meets-buffett": [
    {
      text: "In my whole life, I have known no wise people who didn't read all the time \u2014 none, zero.",
      text_zh: "在我这一生中，我认识的所有聪明人没有一个不是一直在阅读的\u2014\u2014一个也没有。",
      speaker: "Charlie Munger",
      context: "One of his most famous maxims on lifelong learning",
    },
  ],
  "munger-1978-berkshire-vice-chairman": [
    {
      text: "It's not supposed to be easy. Anyone who finds it easy is stupid.",
      text_zh: "这本来就不应该容易。任何觉得容易的人都是愚蠢的。",
      speaker: "Charlie Munger",
      context: "At a Berkshire Hathaway annual meeting on the difficulty of investing",
    },
  ],
  "munger-2007-05-13-usc-law-speech": [
    {
      text: "To get what you want, you have to deserve what you want. The world is not yet a crazy enough place to reward a whole bunch of undeserving people.",
      text_zh: "要得到你想要的东西，你必须配得上它。这个世界还没有疯狂到会奖励一大堆不配的人。",
      speaker: "Charlie Munger",
      context: "Opening of his 2007 USC Law commencement address",
    },
    {
      text: "Spend each day trying to be a little wiser than you were when you woke up.",
      text_zh: "每天醒来时，试着比睡前聪明一点点。",
      speaker: "Charlie Munger",
      context: "USC Law 2007, on the compounding of wisdom",
    },
  ],
  "munger-1995-06-13-harvard-school-speech": [
    {
      text: "Invert, always invert.",
      text_zh: "反过来想，永远反过来想。",
      speaker: "Charlie Munger (quoting Jacobi)",
      context: "His signature intellectual method, attributed to mathematician Carl Jacobi",
    },
  ],
  "munger-2023-11-28-death": [
    {
      text: "Berkshire Hathaway could not have been built to its present status without Charlie's inspiration, wisdom and participation.",
      text_zh: "如果没有查理的灵感、智慧和参与，伯克希尔不可能达到今天的地位。",
      speaker: "Warren Buffett",
      context: "Berkshire Hathaway press release on the day of Munger's death",
    },
  ],
});

// Rockefeller quotes
const rockAdded = addQuotes("data/events/rockefeller.json", {
  "rockefeller-1870-01-10-standard-oil-founded": [
    {
      text: "I believe the power to make money is a gift of God.",
      text_zh: "我相信赚钱的能力是上帝赐予的礼物。",
      speaker: "John D. Rockefeller",
      context: "His Calvinist conviction that wealth was divinely ordained",
    },
  ],
  "rockefeller-1855-09-26-first-job": [
    {
      text: "I was not an easy boss. I looked after every detail.",
      text_zh: "我不是一个好说话的老板。我关注每一个细节。",
      speaker: "John D. Rockefeller",
      context: "Reflecting on his early years as a bookkeeper at Hewitt & Tuttle",
    },
  ],
  "rockefeller-1897-retires-standard-oil": [
    {
      text: "I always tried to turn every disaster into an opportunity.",
      text_zh: "我总是试图把每一次灾难变成机会。",
      speaker: "John D. Rockefeller",
      context: "A guiding principle throughout his business career",
    },
  ],
  "rockefeller-1913-05-14-rockefeller-foundation": [
    {
      text: "The best philanthropy is constantly in search of the finalities \u2014 a search for cause, an attempt to cure evils at their source.",
      text_zh: "最好的慈善事业是不断追寻根源\u2014\u2014寻找原因，试图从源头治愈弊病。",
      speaker: "John D. Rockefeller",
      context: "On the founding philosophy of the Rockefeller Foundation",
    },
  ],
});

console.log(`\nTotal: Musk ${muskAdded}, Munger ${mungerAdded}, Rockefeller ${rockAdded}`);
