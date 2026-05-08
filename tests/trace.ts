import { chromium } from "playwright";
const url = process.argv[2];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 3840, height: 2160 }, deviceScaleFactor: 1 });
await ctx.addInitScript(t => localStorage.setItem("theme", t), "lofi");
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
await page.waitForTimeout(800);
const trace = await page.evaluate(() => {
  let el: Element | null = document.querySelector(".collapse.collapse-arrow");
  const chain: any[] = [];
  while (el && el !== document.body && chain.length < 12) {
    const cs = getComputedStyle(el as HTMLElement);
    chain.push({
      tag: el.tagName.toLowerCase(),
      cls: (el as HTMLElement).className,
      width: (el as HTMLElement).offsetWidth,
      display: cs.display,
      maxWidth: cs.maxWidth,
      cssWidth: cs.width,
    });
    el = el.parentElement;
  }
  return chain;
});
await browser.close();
console.log(JSON.stringify(trace, null, 2));
