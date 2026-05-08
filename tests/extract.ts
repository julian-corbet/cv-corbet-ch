// Extract structural invariants from rendered HTML.
// Usage: bun tests/extract.ts <url-or-file>
// Output: JSON on stdout.

const src = process.argv[2];
if (!src) {
  console.error("usage: bun tests/extract.ts <url-or-file>");
  process.exit(2);
}

const html = src.startsWith("http")
  ? await (await fetch(src)).text()
  : await Bun.file(src).text();

const idSet = new Set<string>();
const idRe = /\sid=("([^"]+)"|([A-Za-z][\w-]*))/g;
for (const m of html.matchAll(idRe)) idSet.add(m[2] ?? m[3]);

const anchorHrefSet = new Set<string>();
const hrefRe = /href=("#([^"]+)"|#([A-Za-z][\w-]*))/g;
for (const m of html.matchAll(hrefRe)) anchorHrefSet.add(m[2] ?? m[3]);

const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
const title = titleM ? titleM[1].trim() : null;

const ldM = html.match(/<script[^>]*type=("application\/ld\+json"|application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/i);
let ldjson: unknown = null;
if (ldM) {
  try { ldjson = JSON.parse(ldM[2].trim()); } catch (e) { ldjson = { _parseError: String(e) }; }
}

const meta: Record<string, string> = {};
const metaRe = /<meta\s+([^>]+?)\/?>/gi;
for (const m of html.matchAll(metaRe)) {
  const attrs = m[1];
  const k = attrs.match(/(?:property|name)=("([^"]+)"|([A-Za-z:][\w:.-]*))/);
  const v = attrs.match(/content=("([^"]*)"|([^\s/>]*))/);
  if (k && v) meta[k[2] ?? k[3]] = v[2] ?? v[3];
}

const downloadHrefs = new Set<string>();
const dlRe = /href=("(\/downloads\/[^"]+\.pdf)"|(\/downloads\/\S+?\.pdf))/gi;
for (const m of html.matchAll(dlRe)) downloadHrefs.add(m[2] ?? m[3]);

const objectDataRe = /<object\s+[^>]*data=("(\/[^"]+\.pdf)"|(\/\S+?\.pdf))/gi;
for (const m of html.matchAll(objectDataRe)) downloadHrefs.add(m[2] ?? m[3]);

const topAccordionRe = /class="[^"]*\bcollapse\s+collapse-arrow\b[^"]*"/g;
const topAccordionCount = [...html.matchAll(topAccordionRe)]
  .filter(m => !m[0].includes("folder-collapse"))
  .length;

const cardRe = /class="[^"]*\bcard-compact\b[^"]*"/g;
const cardCount = [...html.matchAll(cardRe)].length;

const htmlTagCount = [...html.matchAll(/<html\b/gi)].length;
const bodyTagCount = [...html.matchAll(/<body\b/gi)].length;

const out = {
  title,
  htmlTagCount,
  bodyTagCount,
  topAccordionCount,
  cardCount,
  ids: [...idSet].sort(),
  anchorHrefs: [...anchorHrefSet].sort(),
  unresolvedAnchors: [...anchorHrefSet].filter(a => !idSet.has(a)).sort(),
  meta,
  ldjson,
  downloadHrefs: [...downloadHrefs].sort(),
};

console.log(JSON.stringify(out, null, 2));
