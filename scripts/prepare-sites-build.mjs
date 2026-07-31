import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "out");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");
const securityHeaders = JSON.parse(
  await readFile(resolve(root, "config/security-headers.json"), "utf8"),
);

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await cp(output, client, { recursive: true });

await writeFile(
  resolve(server, "index.js"),
  `const securityHeaders = ${JSON.stringify(securityHeaders, null, 2)};

function cacheControlFor(url, contentType) {
  if (url.pathname.includes("/_next/static/")) {
    return "public, max-age=31536000, immutable";
  }
  if (contentType.includes("text/html")) {
    return "public, max-age=0, must-revalidate";
  }
  return "public, max-age=86400, stale-while-revalidate=604800";
}

export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: {
          Allow: "GET, HEAD",
          ...securityHeaders,
        },
      });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    const contentType = headers.get("Content-Type") ?? "";

    for (const [name, value] of Object.entries(securityHeaders)) {
      headers.set(name, value);
    }
    headers.set(
      "Cache-Control",
      cacheControlFor(new URL(request.url), contentType),
    );

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
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
