import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Tool-managed directories (see .gitignore) — not part of this app's
    // source, and can contain large generated scripts we don't own.
    ".impeccable/**",
    ".opencode/**",
    ".gemini/**",
    ".cursor/**",
    ".codex/**",
    ".agents/**",
    ".agent/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;
