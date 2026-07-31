import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const html = await readFile(resolve(root, "out/index.html"), "utf8");
const worker = await readFile(resolve(root, "dist/server/index.js"), "utf8");
const securityText = await readFile(
  resolve(root, "out/.well-known/security.txt"),
  "utf8",
);

assert.match(
  html,
  /http-equiv="Content-Security-Policy"/i,
  "The static export must include a fallback CSP meta policy.",
);
assert.match(
  html,
  /integrity="sha384-[^"]+"/,
  "Next.js script assets must include SHA-384 integrity metadata.",
);

for (const header of [
  "Content-Security-Policy",
  "Strict-Transport-Security",
  "Permissions-Policy",
  "Referrer-Policy",
  "X-Content-Type-Options",
  "X-Frame-Options",
]) {
  assert.ok(
    worker.includes(`"${header}"`),
    `The hosted Worker is missing ${header}.`,
  );
}

assert.match(
  worker,
  /request\.method !== "GET" && request\.method !== "HEAD"/,
  "The static Worker must reject unsupported request methods.",
);
assert.match(
  securityText,
  /^Contact: mailto:/m,
  "security.txt must include a private reporting contact.",
);
assert.match(
  securityText,
  /^Expires: \d{4}-\d{2}-\d{2}T/m,
  "security.txt must include an expiry date.",
);

async function findSourceMaps(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const matches = [];

  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      matches.push(...(await findSourceMaps(path)));
    } else if (entry.name.endsWith(".map")) {
      matches.push(path);
    }
  }
  return matches;
}

assert.deepEqual(
  await findSourceMaps(resolve(root, "out/_next/static")),
  [],
  "Production browser source maps must not be publicly emitted.",
);

console.log("Security build checks passed.");
