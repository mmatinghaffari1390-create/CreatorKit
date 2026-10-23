import { readFileSync } from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
assert.ok(scripts.length > 0, "Inline application script exists");
for (const [i, source] of scripts.entries()) new vm.Script(source, { filename: `index.html:inline-script-${i + 1}` });

for (const id of ["titlesOut", "hashtagsOut", "ideasOut", "plannerOut", "descriptionOut", "hooksOut", "outlineOut", "scriptOut", "drafts", "draftList", "saveDraft"]) {
  assert.ok(html.includes(`id="${id}"`), `Required UI element exists: ${id}`);
}
for (const key of ["draftTitle:", "draftSave:", "draftLoad:", "draftDelete:"]) {
  assert.ok(html.includes(key), `Draft library translation exists: ${key}`);
}
assert.ok(html.includes('localStorage.setItem(DRAFT_KEY'), "Drafts use browser-local storage");
assert.ok(html.includes("drafts.length>=20"), "Draft count is capped");
assert.ok(html.includes("lastGeneratedOutput=outputIds[action]"), "Save button tracks the most recent generated output");
const draftKeyPosition = html.indexOf('const DRAFT_KEY="creatorkit-draft-library-v1"');
const initialRenderPosition = html.indexOf("});renderDrafts();document.querySelectorAll(\"[data-copy]\")");
assert.ok(draftKeyPosition >= 0 && initialRenderPosition > draftKeyPosition, "Initial draft rendering happens after draft storage initialization");
assert.ok(html.includes("const outputId=lastGeneratedOutput"), "Draft saving uses the latest output, not a fixed tool order");
assert.ok(html.includes("preview.textContent="), "Saved draft previews use textContent");
assert.ok(html.includes('confirm(copyText[lang].draftConfirm)'), "Deletion asks for confirmation");
assert.ok(html.includes(":focus-visible"), "Keyboard focus indicator exists");
assert.ok(html.includes("class=\"skip-link\" href=\"#main-content\""), "Keyboard users can skip directly to main content");
assert.ok(html.includes("<main id=\"main-content\" tabindex=\"-1\">"), "Main content landmark can receive programmatic focus");
assert.ok(html.includes("property=\"og:title\"") && html.includes("name=\"twitter:card\""), "Social sharing preview metadata exists");
assert.ok(html.includes("skip:\"Skip to main content\""), "Skip-link label is translated to English");
assert.ok(html.includes("prefers-reduced-motion:reduce"), "Reduced-motion preference is respected");
assert.ok(html.includes(".tools{grid-template-columns:minmax(0,1fr)}"), "Tools use a single-column mobile layout");
console.log("CreatorKit smoke checks passed: inline JS syntax, required tools, bilingual draft UI, and local draft safeguards.");
