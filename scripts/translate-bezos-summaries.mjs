#!/usr/bin/env node
/**
 * Add summary_en for the 29 pre-existing Bezos events that were missing
 * English translations. Faithful translations of the Chinese summaries
 * (not literal — written for English-flow readability).
 */
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "events", "bezos.json");
const events = JSON.parse(fs.readFileSync(FILE, "utf8"));

const TRANSLATIONS = {
  "bezos-1964-01-12-birth":
    "Jeffrey Preston Jorgensen was born in Albuquerque, New Mexico. His mother Jacklyn Gise was just 17. His biological father Ted Jorgensen was a circus performer, and the marriage soon fell apart. When Jeff was 4, his mother remarried Cuban immigrant Miguel \"Mike\" Bezos, who formally adopted him and gave him the Bezos name. Jeff grew up in Houston and Miami, spending summers on his grandfather Lawrence Preston Gise's Texas ranch (Gise had been a regional director at DARPA) — an experience that built his hands-on independence.",

  "bezos-1982-high-school-valedictorian":
    "Graduated as valedictorian from Miami Palmetto Senior High School. Already showed strong academic and leadership chops in high school — National Merit Scholar and Silver Knight Award winner. His valedictory speech laid out his dream of space colonization: he wanted to build space hotels, amusement parks, and colonies for 2-3 million people to live in space.",

  "bezos-1986-princeton-graduation":
    "Graduated summa cum laude from Princeton with a dual degree in Computer Science and Electrical Engineering. He had originally planned to study physics but quickly realized he wasn't going to be a top-50 theoretical physicist and decisively switched to CS. At Princeton he was elected to Phi Beta Kappa and Tau Beta Pi (engineering honor society).",

  "bezos-1988-de-shaw":
    "After graduation, Bezos worked successively at Fitel (financial telecom), Bankers Trust, and D.E. Shaw — a quant hedge fund founded by Columbia CS professor David Shaw. He climbed quickly: at 30 he was the firm's youngest senior vice president. At D.E. Shaw he was tasked with exploring internet business opportunities, and there he found one number that would change his life: internet usage was growing 2,300% per year. That number directly birthed Amazon.",

  "bezos-1994-07-05-amazon-founding":
    "Quit his lucrative D.E. Shaw position and drove cross-country from New York to Seattle with his wife MacKenzie (he wrote the business plan in the passenger seat along the way). Founded \"Cadabra, Inc.\" (later renamed Amazon.com) in the garage of a rented house in Bellevue, WA. He chose books from a list of 20 candidate categories — books had 3 million in-print titles, more than any physical bookstore could possibly carry. He used his \"Regret Minimization Framework\" to make the decision: \"At 80, will I regret not having tried to participate in this thing called the internet? Yes.\"",

  "bezos-1995-07-16-amazon-launches":
    "Amazon.com launched to the public, billed as \"Earth's Biggest Bookstore.\" In its first month it received orders from all 50 US states and 45 countries. The site initially ran on servers in Bezos's garage. The first non-employee customer, John Wainwright, bought *Fluid Concepts & Creative Analogies*. First-30-day sales reached $20K/week. Bezos kept a bell in the office that rang on every order — soon it rang too constantly to keep on.",

  "bezos-1997-shareholder-letter-day1":
    "Bezos wrote his first annual shareholder letter — later considered one of the most important CEO letters in business history. The letter laid out Amazon's core principles: always treat today as Day 1, long-term thinking over short-term profit, customer obsession over competitor obsession, fast decisions (most decisions should be made with about 70% of the information you'd want), and \"your margin is my opportunity.\" Every subsequent annual letter has included this 1997 letter as an appendix. He even named his Amazon office building \"Day 1.\"",

  "bezos-1997-05-15-amazon-ipo":
    "Amazon went public on NASDAQ at $18 per share under ticker AMZN, with a market cap of about $438M. At the time Amazon's annual revenue was just $15.8M with deep losses. The stock closed opening day at $23.50. Many Wall Street analysts mocked the valuation since the company had no profits. With hindsight, the $18 IPO price (split-adjusted) corresponds to a 100,000%+ return.",

  "bezos-1999-time-person-of-year":
    "At 35, Bezos was named *TIME* magazine's Person of the Year for 1999, with the headline \"E-Commerce Is Changing the Way the World Shops.\" Amazon's stock had risen nearly 10x that year at the dot-com peak. *TIME* praised him for \"helping build the foundation of e-commerce.\" Less than a year later, the bubble burst — Amazon's stock crashed from $107 to under $6.",

  "bezos-2000-blue-origin-founding":
    "Even as the dot-com bubble was bursting, Bezos quietly founded space company Blue Origin, with the motto *Gradatim Ferociter* (step by step, ferociously). The decision traced back to his high-school valedictory dream of space colonization. His long-term vision was building large rotating space stations (referencing physicist Gerard O'Neill's designs), so millions could live and work in space and ease industrial pressure on Earth. Blue Origin stayed extremely quiet for its first few years, only being discovered by media in 2003.",

  "bezos-2001-dotcom-bust-survival":
    "After the dot-com bust, Amazon's stock crashed from $107 (Dec 1999) to under $6 (Sep 2001) — a 94%+ drop. Wall Street analyst Ravi Suria published a report predicting Amazon would run out of cash in months. At an all-hands meeting, Bezos pointed at the stock price on the big screen and said: \"When the stock is up 30%, you're not 30% smarter. When the stock is down 30%, you're not 30% dumber.\" He cut unprofitable lines, closed several warehouses, and laid off about 1,300 — but kept investing in infrastructure and customer experience. Amazon turned its first quarterly profit (a $5M net) in Q4 2001, validating the business model.",

  "bezos-2002-aws-concept":
    "Bezos realized that the massive compute and storage infrastructure Amazon had built internally to support e-commerce could be productized as standardized services for outside developers. He issued a famous internal memo (the \"API Mandate\") requiring every Amazon team to communicate via service interfaces (APIs), and that every interface had to be designed as if it would be exposed externally. This decision planted the seed that would turn Amazon from a retailer into the world's largest cloud computing platform.",

  "bezos-2005-02-02-amazon-prime":
    "Amazon launched its Prime membership: $79/year for unlimited free 2-day shipping in the US. The CFO and finance team opposed the program — they calculated free shipping costs would be a money pit. Bezos overruled them. His logic: once customers built the habit of buying everything on Amazon (since shipping was no longer friction), their lifetime spend would dwarf the shipping subsidy. He was completely right. Prime later evolved into a 200M+ global member ecosystem covering streaming video, music, reading, gaming and more.",

  "bezos-2006-03-14-aws-s3-launch":
    "AWS launched its first core product: Simple Storage Service (S3), letting developers store and retrieve any amount of data over the internet at very low cost. Three months later Elastic Compute Cloud (EC2) followed. AWS fundamentally reshaped global tech infrastructure — startups no longer needed to buy servers, just pay by usage. By 2024, AWS revenue exceeded $90B annually and became Amazon's largest profit driver. The business made countless startups possible at near-zero capital cost, and was a critical enabler of Netflix, Airbnb, Slack, and many others.",

  "bezos-2007-11-19-kindle-launch":
    "Amazon released the Kindle e-reader, priced at $399; it sold out in 5.5 hours. Kindle's revolutionary feature was built-in free 3G wireless (Whispernet), letting users buy and download books directly from the device — no PC required. Bezos's drive to build Kindle came from a deep understanding of the innovator's dilemma: he'd rather disrupt the print book business himself than let someone else do it. Kindle later defined the e-book market and turned Amazon from \"the bookseller\" into \"the platform that controlled reading.\"",

  "bezos-2010-05-30-princeton-speech":
    "Delivered the commencement address at his alma mater, Princeton. He told the story of calculating his grandmother's smoking-related life-expectancy reduction as a child, which made her cry. His grandfather pulled him aside and said, \"Jeff, one day you'll understand that it's harder to be kind than clever.\" The speech's central message: \"In the end, we are our choices, not our gifts.\" One of his most-quoted lines.",

  "bezos-2013-08-05-washington-post":
    "Personally (not via Amazon) acquired *The Washington Post* from the Graham family for $250M. Newspapers were being decimated by digital disruption — the Post's circulation and revenue were falling fast. Bezos infused Amazon's tech and customer-first culture into the Post: rebuilt the website, invested in digital subscriptions, introduced data-driven editorial workflows. Under his ownership traffic surged and digital subscriptions multiplied within two years. His repeated message to the newsroom: \"Ask yourselves what readers want.\"",

  "bezos-2015-07-amazon-surpasses-walmart":
    "Amazon surpassed Walmart in market cap for the first time, becoming the world's most valuable retailer. Amazon was at ~$248B vs. Walmart's ~$233B. Considering Walmart's revenue was about 4x Amazon's and it had 6x more employees, the gap was Wall Street's verdict that the future belonged to e-commerce. Bezos later said in an interview: \"You don't win customers by your competitors. You win customers by serving customers better.\"",

  "bezos-2017-06-16-whole-foods":
    "Amazon announced a $13.7B all-cash acquisition of premium organic grocer Whole Foods Market — Amazon's largest acquisition ever. The news crashed retail stocks: Walmart, Kroger, Target all fell sharply. Overnight Amazon owned 470+ physical stores and a powerful fresh-food supply chain. Bezos's strategy with Whole Foods was textbook Amazon: cut prices (across-the-board on day 1 of the deal), integrate Prime, build a unified online-offline shopping experience.",

  "bezos-2018-01-worlds-richest":
    "Amazon's surging stock pushed Bezos's net worth past $105B, overtaking Bill Gates as the world's richest person — and the highest net worth (in dollars) measured since Forbes started tracking in 1999. The Bloomberg Billionaires Index showed his wealth swinging by billions in a single day. He repeatedly traded the top spot, especially after 2019 when his divorce from MacKenzie distributed about $38B in stock to her.",

  "bezos-2018-09-bezos-day-one-fund":
    "Announced a $2B Bezos Day One Fund, with two arms: the Day 1 Families Fund (funding nonprofits serving homeless families) and the Day 1 Academies Fund (creating free Montessori-inspired preschools in low-income communities). After years of being criticized for \"not doing philanthropy,\" this was Bezos's first large-scale charitable commitment. He deliberately named it after Amazon's core \"Day 1\" idea.",

  "bezos-2020-02-17-earth-fund":
    "Announced the $10B Bezos Earth Fund on Instagram, dedicated to fighting climate change — at the time the largest individual climate philanthropy commitment in history. He wrote: \"Climate change is the biggest threat to our planet. I want to work alongside others both to amplify known ways and to explore new ways of fighting the devastating impact of climate change.\" The fund subsequently funded conservation, clean energy, and environmental justice projects.",

  "bezos-2021-02-02-steps-down-announcement":
    "In a letter to employees, Bezos announced he would step down as Amazon CEO in Q3 and transition to executive chairman, with AWS lead Andy Jassy succeeding him as CEO. He wrote: \"As Exec Chair I will stay engaged in important Amazon initiatives but also have the time and energy I need to focus on the Day 1 Fund, the Bezos Earth Fund, Blue Origin, The Washington Post, and my other passions. Andy is well known inside the company and has been at Amazon almost as long as I have. He will be an outstanding leader.\" The end of Amazon's founder era.",

  "bezos-2021-07-05-steps-down-ceo":
    "Officially stepped down as Amazon CEO on the company's 27th anniversary, transitioning to executive chairman. Andy Jassy formally became Amazon's second CEO. Over 27 years Bezos had grown Amazon from a garage bookstore into a $1.7T+ company that was the world's largest e-commerce and cloud computing player, with $400B+ annual revenue and 1.5M+ employees globally.",

  "bezos-1999-11-charlie-rose-interview":
    "Bezos sat for a long-form interview on Charlie Rose. At 35, he explained why Amazon wasn't rushing to profitability: \"What we're doing is building a brand customers trust — that takes time.\" He also discussed how the internet's nature was about lowering search costs and expanding choice, and why \"customer experience\" is the only sustainable moat in the e-commerce era. The interview became a classic primary source for studying early Amazon strategy and Bezos's mindset.",

  "bezos-2015-11-23-new-shepard-landing":
    "Blue Origin's New Shepard suborbital rocket reached 100.5km altitude (above the Kármán line) and the booster successfully landed vertically at the West Texas launch site. The first-ever vertical landing of a rocket after reaching space — about a month before SpaceX's Falcon 9 first sea landing (though New Shepard is suborbital, a different difficulty class). Bezos personally tweeted: \"The rarest of beasts — a used rocket.\"",

  "bezos-2019-06-remars-conference":
    "Delivered the keynote at Amazon's re:MARS (Machine learning, Automation, Robotics, Space) conference. He showcased Blue Origin's Blue Moon lunar lander, shared his vision for O'Neill space colonies, and discussed AI and robotics applications across Amazon's supply chain. re:MARS was Bezos's personally-driven cross-domain technology summit, reflecting his comprehensive thinking about the future of technology. In the talk he said: \"We go to space to save Earth.\"",

  "bezos-2021-07-20-space-flight":
    "Just 15 days after stepping down as Amazon CEO, Bezos rode Blue Origin's New Shepard rocket into space. Joining him: his brother Mark Bezos, 82-year-old female aviation pioneer Wally Funk (becoming the oldest person ever to reach space), and 18-year-old Dutch student Oliver Daemen (becoming the youngest). The flight lasted about 10 minutes 10 seconds, peaking at ~107km altitude. He chose July 20 to mark the 52nd anniversary of Apollo 11. After landing, he said: \"Best day ever.\"",

  "bezos-2023-12-lex-fridman-podcast":
    "Bezos sat for a near-2-hour deep-dive on Lex Fridman Podcast #405. Topics included: how the Regret Minimization Framework guides major life decisions; why Amazon's core principle is \"customer-obsessed\" rather than \"competitor-obsessed\"; the difference between Day 1 and Day 2 mentalities (Day 2 is stasis followed by painful slow death); the space-colonization vision behind Blue Origin; and how he thinks about long-term investing. He also rarely-heard discussed his childhood and the influence of his stepfather Miguel Bezos. His deepest and most personal public conversation in years.",
};

let updated = 0;
for (const e of events) {
  if (!e.summary_en && TRANSLATIONS[e.id]) {
    e.summary_en = TRANSLATIONS[e.id];
    updated++;
    console.log(`+ summary_en for ${e.id}`);
  }
}

events.sort((a, b) => a.date.localeCompare(b.date));
fs.writeFileSync(FILE, JSON.stringify(events, null, 2) + "\n");
console.log(`\nDone. Added summary_en to ${updated} events.`);
