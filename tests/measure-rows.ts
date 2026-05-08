import { chromium } from "playwright";
const url = process.argv[2];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 3840, height: 2160 }, deviceScaleFactor: 1 });
await ctx.addInitScript(t => localStorage.setItem("theme", t), "lofi");
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
await page.waitForTimeout(800);
const m = await page.evaluate(() => {
  const join = document.querySelector(".join.join-vertical") as HTMLElement | null;
  const csJoin = join ? getComputedStyle(join) : null;
  const collapses = Array.from(document.querySelectorAll(".collapse.collapse-arrow")) as HTMLElement[];
  return {
    joinGap: csJoin?.gap,
    joinFlexDirection: csJoin?.flexDirection,
    joinAlignItems: csJoin?.alignItems,
    rows: collapses.slice(0, 5).map(c => {
      const r = c.getBoundingClientRect();
      const cs = getComputedStyle(c);
      return { y: r.y, h: r.height, marginTop: cs.marginTop, marginBottom: cs.marginBottom, borderRadius: cs.borderRadius, position: cs.position };
    }),
  };
});
await browser.close();
console.log(JSON.stringify(m, null, 2));
