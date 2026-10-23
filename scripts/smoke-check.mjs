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
assert.ok(html.includes(".filter(Boolean).map(t=>t.replace(/[^\\p{L}\\p{N}_]/gu,\"\")).filter(Boolean).slice(0,5).map(t=>\"#\"+t)"), "Hashtag generation drops punctuation-only tokens before adding prefixes");
assert.ok(html.includes("draftStorageError:\"Browser storage is unavailable."), "Draft storage failures have a clear English message");
assert.ok(html.includes("draftStorageError:\"ذخیره‌سازی مرورگر در دسترس نیست"), "Draft storage failures have a clear Persian message");
assert.ok(html.includes("lastGeneratedOutput=outputIds[action]"), "Save button tracks the most recent generated output");
const draftKeyPosition = html.indexOf('const DRAFT_KEY="creatorkit-draft-library-v1"');
const initialRenderPosition = html.indexOf("});renderDrafts();document.querySelectorAll(\"[data-copy]\")");
assert.ok(draftKeyPosition >= 0 && initialRenderPosition > draftKeyPosition, "Initial draft rendering happens after draft storage initialization");
assert.ok(html.includes("const outputId=lastGeneratedOutput"), "Draft saving uses the latest output, not a fixed tool order");
assert.ok(html.includes("preview.textContent="), "Saved draft previews use textContent");
assert.ok(html.includes("let copied=false"), "Clipboard fallback checks whether copying succeeded");
assert.ok(html.includes('copyFailed:"Copy failed.'), "Clipboard failures have a clear English message");
assert.ok(html.includes('copyFailed:"کپی خودکار ممکن نشد'), "Clipboard failures have a clear Persian message");
assert.ok(html.includes("if(!out){draftStatus(\"draftLoadError\");return}"), "Draft loading rejects invalid output targets");
assert.ok(html.includes('["titlesOut","hashtagsOut","ideasOut","plannerOut","descriptionOut","hooksOut","outlineOut","scriptOut"].includes(x.output)'), "Saved drafts only target known tool output elements");
assert.ok(html.includes("lastGeneratedOutput=d.output"), "Loading a draft restores the active output target");
assert.ok(html.includes("draftLoaded:\"Draft loaded."), "Successful draft loading has clear English feedback");
assert.ok(html.includes("draftLoadError:\"این پیش‌نویس"), "Invalid draft loading has clear Persian feedback");
assert.ok(html.includes('confirm(copyText[lang].draftConfirm)'), "Deletion asks for confirmation");
assert.ok(html.includes(":focus-visible"), "Keyboard focus indicator exists");
assert.ok(html.includes("class=\"skip-link\" href=\"#main-content\""), "Keyboard users can skip directly to main content");
assert.ok(html.includes("<main id=\"main-content\" tabindex=\"-1\">"), "Main content landmark can receive programmatic focus");
assert.ok(html.includes("property=\"og:title\"") && html.includes("name=\"twitter:card\""), "Social sharing preview metadata exists");
assert.ok(html.includes("skip:\"Skip to main content\""), "Skip-link label is translated to English");
assert.ok(html.includes("prefers-reduced-motion:reduce"), "Reduced-motion preference is respected");
assert.ok(html.includes(".tools{grid-template-columns:minmax(0,1fr)}"), "Tools use a single-column mobile layout");

assert.ok(html.includes('aria-live="polite"'), "Generated results and status messages are announced to assistive technology");
assert.ok(html.includes('id="lang"'), "Language switch control exists");
assert.ok(html.includes('document.documentElement.dir=lang==="fa"?"rtl":"ltr"'), "Language switch updates page direction");
assert.ok(html.includes('const outputIds={script:"scriptOut",titles:"titlesOut",hashtags:"hashtagsOut",ideas:"ideasOut",planner:"plannerOut",description:"descriptionOut",hooks:"hooksOut",outline:"outlineOut"}'), "Every generator action maps to a known output target");
assert.ok(!/fetch\s*\(|XMLHttpRequest|WebSocket/.test(scripts.join("\n")), "Static tools do not make unconfigured network requests");

assert.ok(html.includes("document.getElementById(outputIds[action]).textContent=out"), "Generated content is rendered as text, not parsed as HTML");
assert.ok(html.includes("title.textContent=d.name") && html.includes("preview.textContent=d.content.slice(0,180)"), "Draft names and previews are rendered safely as text");
assert.ok(html.includes("name:name.slice(0,60)"), "Saved draft names are length-limited");
assert.ok(html.includes('el.setAttribute("readonly","")'), "Clipboard fallback uses a read-only temporary field");

assert.ok(html.includes('class="button-link" href="#tools" data-i="explore"'), "Hero navigation uses a direct accessible link");
assert.ok(!/<a[^>]*>\s*<button\b/i.test(html), "Links do not nest interactive buttons");


const actions = [...html.matchAll(/data-action="([^"]+)"/g)].map(m => m[1]);
assert.deepEqual([...new Set(actions)].sort(), ["description","hashtags","hooks","ideas","outline","planner","script","titles"].sort(), "All eight expected generator actions are present");
for (const action of actions) {
  assert.ok(html.includes(`document.getElementById(outputIds[action]).textContent=out`), `Action ${action} renders generated content as text`);
}
const translationKeys = [...html.matchAll(/data-i="([^"]+)"/g)].map(m => m[1]);
for (const key of translationKeys) {
  assert.ok(html.includes(`${key}:`), `A translation entry exists for visible key: ${key}`);
}
assert.ok(html.includes('document.documentElement.lang=lang'), "Language switch updates document language for assistive technology");
assert.ok(html.includes('list.replaceChildren()'), "Draft list is cleared safely before rerendering");
assert.ok(!/\.innerHTML\s*=\s*(?:out|d\.|output|topic|t\b)/.test(scripts.join("\\n")), "User-generated tool and draft content is not assigned to innerHTML");


const ids = [...html.matchAll(/\\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, "HTML ids are unique");
const idSet = new Set(ids);
for (const [, target] of html.matchAll(/\\bhref="#([^"]+)"/g)) {
  assert.ok(idSet.has(target), `In-page link target exists: #${target}`);
}
for (const id of ["titlesOut", "hashtagsOut", "ideasOut", "plannerOut", "descriptionOut", "hooksOut", "outlineOut", "scriptOut"]) {
  assert.ok(idSet.has(id), `Generator output target exists: ${id}`);
}
assert.ok(html.includes('aria-label="') || html.includes("aria-label='"), "At least one explicit accessible label exists");
assert.ok(html.includes('name="description"'), "Search description metadata exists");

console.log("CreatorKit smoke checks passed: inline JS syntax, required tools, bilingual draft UI, and local draft safeguards.");
