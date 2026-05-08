// Inspect computed color of moon/sun icons.
// Usage: bun tests/inspect-icon.ts <url> <theme>

import { chromium } from "playwright";

const [url, theme = "black"] = process.argv.slice(2);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
await ctx.addInitScript(t => localStorage.setItem("theme", t), theme);
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);

const result = await page.evaluate(() => {
  const moon = document.querySelector('svg[data-icon="carbon:moon"]') as SVGElement | null;
  const path = moon?.querySelector('path');
  const computed = moon ? getComputedStyle(moon) : null;
  const pathComputed = path ? getComputedStyle(path) : null;
  const bodyColor = getComputedStyle(document.body).color;
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  return {
    bodyColor,
    bodyBg,
    moonExists: !!moon,
    moonColor: computed?.color,
    moonFill: computed?.fill,
    moonInlineStyle: moon?.getAttribute("style"),
    pathFill: pathComputed?.fill,
    pathColor: pathComputed?.color,
    pathFillAttr: path?.getAttribute("fill"),
    moonOuterHTML: moon?.outerHTML?.slice(0, 400),
    moonBBox: moon ? { w: (moon as SVGGraphicsElement).getBBox().width, h: (moon as SVGGraphicsElement).getBBox().height } : null,
    moonBoundingClientRect: moon?.getBoundingClientRect().toJSON(),
    parentColor: moon?.parentElement ? getComputedStyle(moon.parentElement).color : null,
    parentClass: moon?.parentElement?.className,
    moonViewBox: moon?.querySelector("symbol")?.getAttribute("viewBox"),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
