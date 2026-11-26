// The Painfully Honest Out-of-Office — make.fun entry generator.
// Writes one brutally honest but manager-safe out-of-office auto-reply
// (a single sentence, at most 200 characters) to <output>/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm out of office until Monday with 847 unread emails waiting; I'll answer yours first — not because it's urgent, but because you're the only sender who ever asked how I am.";

const outDir = process.argv[2] ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate: the entry must be 1–200 characters, a single sentence, non-blank.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (ENTRY.trim() !== ENTRY || (ENTRY.match(/\./g) ?? []).length !== 1) {
  throw new Error("entry must be one trimmed sentence ending in a period");
}
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
