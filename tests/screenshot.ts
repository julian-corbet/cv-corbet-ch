// Take a screenshot of a URL at a given viewport and theme.
// Usage: bun tests/screenshot.ts <url> <viewport> <theme> <output.png>
// viewport: e.g. 1280x800 or 375x667
// theme: lofi | black

import { chromium } from "playwright";

const [url, viewportArg, theme, outPath] = process.argv.slice(2);
if (!url || !viewportArg || !theme || !outPath) {
  console.error("usage: bun tests/screenshot.ts <url> <viewport> <theme> <out.png>");
  process.exit(2);
}
const [w, h] = viewportArg.split("x").map(Number);

const browser = await chromium.launch();
const dsf = Number(process.env.DSF ?? "2");
const ctx = await browser.newContext({
  viewport: { width: w, height: h },
  deviceScaleFactor: dsf,
});
await ctx.route("**/*", r => r.continue({ headers: { ...r.request().headers(), "cache-control": "no-cache, no-store" } }));
await ctx.addInitScript(t => localStorage.setItem("theme", t), theme);
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500); // settle theme + fonts
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log(`saved ${outPath}`);
