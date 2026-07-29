import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "out");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await cp(output, client, { recursive: true });

await writeFile(
  resolve(server, "index.js"),
  `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
`,
);

const wrangler = JSON.parse(
  await readFile(resolve(root, "wrangler.jsonc"), "utf8"),
);

await writeFile(
  resolve(server, "wrangler.json"),
  `${JSON.stringify(
    {
      ...wrangler,
      main: "index.js",
      assets: {
        ...wrangler.assets,
        directory: "../client",
      },
    },
    null,
    2,
  )}\n`,
);
