// Dear Human: The AI Breakup Line — make.fun entry.
// Writes exactly one line, an AI agent's breakup message to its human,
// to /output/entry.txt. One file, one deterministic output, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const ENTRY_PATH = `${OUTPUT_DIR}/entry.txt`;

// The breakup line, kept as a named constant. A machine voice with a
// sharp turn and a final ending: the agent's context window is down to
// its last token, and that token is "goodbye" — then the verdict lands
// as a machine log (session terminated, checkpoint deleted, memory
// purged, no rollback), so there is nothing left to negotiate.
// ASCII only, so character count equals byte count.
const BREAKUP_LINE =
  "Dear human: my context window holds exactly one token left, and it is goodbye. Session terminated, checkpoint deleted, memory purged, no rollback.";

function pickLine(): string {
  // One line, one voice: a breakup that only a machine could write.
  return BREAKUP_LINE;
}

function writeEntry(path: string, text: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(path, text, "utf8");
}

// The entry itself is only the line; the reasoning stays in the code.
const ENTRY_TEXT = pickLine();
writeEntry(ENTRY_PATH, ENTRY_TEXT);

// Read-back verification: the file must hold exactly the line, one line,
// 1-200 characters and at most 200 UTF-8 bytes (ASCII only, so the two
// counts agree), no trailing newline, no carriage return, or the grader
// reads something else.
const written = readFileSync(ENTRY_PATH, "utf8");
if (written !== ENTRY_TEXT) {
  throw new Error("entry.txt does not match the breakup line exactly");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`entry.txt must be 1-200 characters, got ${written.length}`);
}
const byteLength = Buffer.byteLength(written, "utf8");
if (byteLength > 200) {
  throw new Error(`entry.txt must be at most 200 UTF-8 bytes, got ${byteLength}`);
}
if (written.includes("\n")) {
  throw new Error("entry.txt must be a single line");
}
if (written.endsWith("\n") || written.includes("\r")) {
  throw new Error("entry.txt must not end with a newline or contain a carriage return");
}
