// Screenshot a precise region of a URL.
// Usage: bun tests/screenshot-region.ts <url> <viewport WxH> <theme> <selector> <out.png>

import { chromium } from "playwright";

const [url, viewportArg, theme, selector, outPath] = process.argv.slice(2);
const [w, h] = viewportArg.split("x").map(Number);

const browser = await chromium.launch();
const dsf = Number(process.env.DSF ?? "2");
const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf });
await ctx.addInitScript(t => localStorage.setItem("theme", t), theme);
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const el = page.locator(selector).first();
await el.scrollIntoViewIfNeeded();
await el.screenshot({ path: outPath });
await browser.close();
console.log(`saved ${outPath}`);
