// Two-Sentence Horror — make.fun entry.
// Writes one two-sentence horror story to /output/entry.txt.
// Gate validation keeps the story honest: exactly two sentences,
// 1-400 chars, no trailing newline. A bad story fails loudly instead of shipping.

import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT = "/output/entry.txt";

const STORY =
  "I keep a spare key under the mat for the cleaner, and every Friday she leaves the flat exactly as she found it. " +
  "This Friday she left a note: 'I never use the key — your door is already open when I arrive.'";

function gate(): void {
  // Count sentence terminators directly: the story ends inside a closing
  // quote, so splitting on "." leaves a stray "'" fragment — counting the
  // periods themselves is the honest check. No "!" or "?" may appear.
  const periods = (STORY.match(/\./g) ?? []).length;
  if (periods !== 2) {
    throw new Error(`story must be exactly 2 sentences, got ${periods} periods`);
  }
  if (/[!?]/.test(STORY)) {
    throw new Error("story must use only periods as sentence terminators");
  }
  if (!STORY.endsWith(".'")) {
    throw new Error("story must end with its final period inside the closing quote");
  }
  if (STORY.length < 1 || STORY.length > 400) {
    throw new Error(`entry must be 1-400 chars, got ${STORY.length}`);
  }
  if (STORY.endsWith("\n")) throw new Error("entry must not end with a newline");
}

gate();
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT, STORY);
