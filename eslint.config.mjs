import { createRequire } from "node:module";
import path from "node:path";
import { defineConfig, globalIgnores } from "eslint/config";

const require = createRequire(import.meta.url);

// 1. Side-by-side TS 6 API for typescript-eslint v8
const Module = require("node:module");
const originalLoad = Module._load;
const tsV6 = require("typescript-v6");
Module._load = function (request) {
  if (request === "typescript") {
    return tsV6;
  }
  return originalLoad.apply(this, arguments);
};

// 2. ESLint 10 backwards-compat polyfills for legacy plugin context methods
const eslintPath = require.resolve("eslint");
const { FileContext } = require(
  path.join(path.dirname(eslintPath), "../lib/linter/file-context.js"),
);
FileContext.prototype.getFilename = function () {
  return this.filename;
};
FileContext.prototype.getPhysicalFilename = function () {
  return this.physicalFilename;
};
FileContext.prototype.getSourceCode = function () {
  return this.sourceCode;
};
FileContext.prototype.getCwd = function () {
  return this.cwd;
};

// 3. ESLint 10 SourceCode.finalize compatibility for custom parsers lacking scopeManager.addGlobals
const SourceCode = require(
  path.join(
    path.dirname(eslintPath),
    "../lib/languages/js/source-code/source-code.js",
  ),
);
const origFinalize = SourceCode.prototype.finalize;
SourceCode.prototype.finalize = function () {
  if (this.scopeManager && typeof this.scopeManager.addGlobals !== "function") {
    this.scopeManager.addGlobals = function (names) {
      const gScope = this.scopes ? this.scopes[0] : this.globalScope;
      if (gScope && gScope.set) {
        for (const name of names) {
          if (!gScope.set.has(name)) {
            gScope.set.set(name, {
              name,
              eslintImplicitGlobalSetting: undefined,
              eslintExplicitGlobal: undefined,
              eslintExplicitGlobalComments: undefined,
              writeable: false,
            });
          }
        }
      }
    };
  }
  return origFinalize.apply(this, arguments);
};

// 4. Dynamically import Next.js ESLint configs
const nextVitals = (await import("eslint-config-next/core-web-vitals")).default;
const nextTs = (await import("eslint-config-next/typescript")).default;

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-plugin-react 7.37.5 crashes on ESLint 10 while auto-detecting the
    // React version (context.getFilename() was removed) — pinning skips detection.
    settings: { react: { version: "19.2" } },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
