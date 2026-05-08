// Compare two extracted snapshots and report parity.
// Usage: bun tests/parity.ts <baseline.json> <candidate.json> [--allow-html-fix]
// Exit code: 0 = parity, 1 = drift detected.
//
// `--allow-html-fix` permits the candidate to have htmlTagCount=1, bodyTagCount=1
// while baseline has the AccordionLayout double-wrap (counts >= 12). This is the
// one structural improvement we ship in the migration.

const [baselinePath, candidatePath, ...flags] = process.argv.slice(2);
if (!baselinePath || !candidatePath) {
  console.error("usage: bun tests/parity.ts <baseline.json> <candidate.json> [--allow-html-fix]");
  process.exit(2);
}
const allowHtmlFix = flags.includes("--allow-html-fix");

type Snap = {
  title: string;
  htmlTagCount: number;
  bodyTagCount: number;
  topAccordionCount: number;
  cardCount: number;
  ids: string[];
  anchorHrefs: string[];
  unresolvedAnchors: string[];
  meta: Record<string, string>;
  ldjson: unknown;
  downloadHrefs: string[];
};

const baseline = JSON.parse(await Bun.file(baselinePath).text()) as Snap;
const candidate = JSON.parse(await Bun.file(candidatePath).text()) as Snap;

const fail: string[] = [];
const note: string[] = [];

const setDiff = (a: string[], b: string[]) => ({
  missing: a.filter(x => !b.includes(x)),
  extra: b.filter(x => !a.includes(x)),
});

if (baseline.title !== candidate.title) fail.push(`title: "${baseline.title}" -> "${candidate.title}"`);

if (allowHtmlFix) {
  if (candidate.htmlTagCount !== 1) fail.push(`htmlTagCount: candidate must be 1 with --allow-html-fix, got ${candidate.htmlTagCount}`);
  if (candidate.bodyTagCount !== 1) fail.push(`bodyTagCount: candidate must be 1 with --allow-html-fix, got ${candidate.bodyTagCount}`);
  note.push(`htmlTagCount: ${baseline.htmlTagCount} -> ${candidate.htmlTagCount} (AccordionLayout double-wrap fixed)`);
} else {
  if (baseline.htmlTagCount !== candidate.htmlTagCount) fail.push(`htmlTagCount: ${baseline.htmlTagCount} -> ${candidate.htmlTagCount}`);
  if (baseline.bodyTagCount !== candidate.bodyTagCount) fail.push(`bodyTagCount: ${baseline.bodyTagCount} -> ${candidate.bodyTagCount}`);
}

if (baseline.topAccordionCount !== candidate.topAccordionCount) fail.push(`topAccordionCount: ${baseline.topAccordionCount} -> ${candidate.topAccordionCount}`);
if (baseline.cardCount !== candidate.cardCount) fail.push(`cardCount: ${baseline.cardCount} -> ${candidate.cardCount}`);

const idDiff = setDiff(baseline.ids, candidate.ids);
if (idDiff.missing.length || idDiff.extra.length) fail.push(`ids drift: missing=${JSON.stringify(idDiff.missing)} extra=${JSON.stringify(idDiff.extra)}`);

const anchorDiff = setDiff(baseline.anchorHrefs, candidate.anchorHrefs);
if (anchorDiff.missing.length || anchorDiff.extra.length) fail.push(`anchorHrefs drift: missing=${JSON.stringify(anchorDiff.missing)} extra=${JSON.stringify(anchorDiff.extra)}`);

const unresDiff = setDiff(baseline.unresolvedAnchors, candidate.unresolvedAnchors);
if (unresDiff.missing.length || unresDiff.extra.length) fail.push(`unresolvedAnchors drift (these are pre-existing v1 content bugs; the set must match exactly): missing=${JSON.stringify(unresDiff.missing)} extra=${JSON.stringify(unresDiff.extra)}`);

const dlDiff = setDiff(baseline.downloadHrefs, candidate.downloadHrefs);
if (dlDiff.missing.length || dlDiff.extra.length) fail.push(`downloadHrefs drift: missing=${JSON.stringify(dlDiff.missing)} extra=${JSON.stringify(dlDiff.extra)}`);

const metaKeys = new Set([...Object.keys(baseline.meta), ...Object.keys(candidate.meta)]);
for (const k of metaKeys) {
  if (baseline.meta[k] !== candidate.meta[k]) fail.push(`meta[${k}]: ${JSON.stringify(baseline.meta[k])} -> ${JSON.stringify(candidate.meta[k])}`);
}

const ldA = JSON.stringify(baseline.ldjson);
const ldB = JSON.stringify(candidate.ldjson);
if (ldA !== ldB) fail.push(`JSON-LD differs (baseline length ${ldA.length}, candidate length ${ldB.length})`);

if (fail.length === 0) {
  for (const n of note) console.log(`note: ${n}`);
  console.log("OK: parity confirmed");
  process.exit(0);
} else {
  for (const n of note) console.log(`note: ${n}`);
  console.error("FAIL: parity drift");
  for (const f of fail) console.error("  - " + f);
  process.exit(1);
}
