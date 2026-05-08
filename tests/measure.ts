import { chromium } from "playwright";

const url = process.argv[2];
const label = process.argv[3] ?? url;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 3840, height: 2160 },
  deviceScaleFactor: 1,
});
await ctx.addInitScript(t => localStorage.setItem("theme", t), "lofi");
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
await page.waitForTimeout(800);
const m = await page.evaluate(() => {
  const collapse = document.querySelector(".collapse.collapse-arrow") as HTMLElement | null;
  const title = collapse?.querySelector(".collapse-title") as HTMLElement | null;
  const innerFlex = title?.querySelector("div.flex") as HTMLElement | null;
  const csCollapse = collapse ? getComputedStyle(collapse) : null;
  const csTitle = title ? getComputedStyle(title) : null;
  const csTitleAfter = title ? getComputedStyle(title, "::after") : null;
  const csTitleBefore = title ? getComputedStyle(title, "::before") : null;
  const csCollapseAfter = collapse ? getComputedStyle(collapse, "::after") : null;
  const csInner = innerFlex ? getComputedStyle(innerFlex) : null;
  return {
    collapseRect: collapse?.getBoundingClientRect().toJSON(),
    collapseDisplay: csCollapse?.display,
    collapseWidth: csCollapse?.width,
    titleRect: title?.getBoundingClientRect().toJSON(),
    titleDisplay: csTitle?.display,
    titleWidth: csTitle?.width,
    titlePosition: csTitle?.position,
    titleGridTemplate: csTitle?.gridTemplateColumns,
    titleAfter: csTitleAfter ? {
      content: csTitleAfter.content,
      position: csTitleAfter.position,
      right: csTitleAfter.right,
      top: csTitleAfter.top,
      width: csTitleAfter.width,
      height: csTitleAfter.height,
      backgroundImage: csTitleAfter.backgroundImage?.slice(0, 80),
      mask: (csTitleAfter as any).mask?.slice(0, 80),
      maskImage: (csTitleAfter as any).maskImage?.slice(0, 80),
      transform: csTitleAfter.transform,
      gridColumnStart: csTitleAfter.gridColumnStart,
    } : null,
    collapseAfter: csCollapseAfter ? {
      content: csCollapseAfter.content,
      position: csCollapseAfter.position,
      right: csCollapseAfter.right,
    } : null,
    innerFlex: csInner ? { width: csInner.width, display: csInner.display, flex: csInner.flex } : null,
  };
});
await browser.close();
console.log(label, JSON.stringify(m, null, 2));
