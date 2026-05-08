// Take a screenshot of just the theme toggle area (upper right corner).
// Usage: bun tests/screenshot-crop.ts <url> <theme> <output.png>

import { chromium } from "playwright";

const [url, theme, outPath] = process.argv.slice(2);
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 4,
});
await ctx.addInitScript(t => localStorage.setItem("theme", t), theme);
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.screenshot({
  path: outPath,
  clip: { x: 1140, y: 30, width: 130, height: 40 },
});
await browser.close();
console.log(`saved ${outPath}`);
