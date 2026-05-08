// Take a screenshot of an absolute rect on a 4K page.
// Usage: bun tests/crop-rect.ts <url> <theme> <x> <y> <w> <h> <out.png>

import { chromium } from "playwright";

const [url, theme, xs, ys, ws, hs, outPath] = process.argv.slice(2);
const x = Number(xs), y = Number(ys), w = Number(ws), h = Number(hs);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 3840, height: 2160 },
  deviceScaleFactor: 1,
});
await ctx.addInitScript(t => localStorage.setItem("theme", t), theme);
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
await page.waitForTimeout(800);
await page.screenshot({ path: outPath, clip: { x, y, width: w, height: h } });
await browser.close();
console.log(`saved ${outPath}`);
