import securityHeadersJson from "@/config/security-headers.json";

/**
 * Static Next.js exports contain a small inline React hydration payload, so
 * script-src cannot use a request nonce. SRI protects emitted script files;
 * the hosted Worker adds frame-ancestors, which is not supported in a meta CSP.
 */
export const securityHeaders = securityHeadersJson;

export const contentSecurityPolicyHeader =
  securityHeaders["Content-Security-Policy"];

const metaPolicy = contentSecurityPolicyHeader
  .replace("; frame-ancestors 'none'", "")
  .trim();

export const contentSecurityPolicyMeta =
  process.env.NODE_ENV === "development"
    ? metaPolicy.replace(
        "script-src 'self' 'unsafe-inline'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      )
    : metaPolicy;
