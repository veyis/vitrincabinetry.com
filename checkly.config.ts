import { defineConfig } from "checkly";
import { Frequency } from "checkly/constructs";

export default defineConfig({
  projectName: "vitrincabinetry.com",
  logicalId: "vitrincabinetry-com",
  repoUrl: "https://github.com/veyis/vitrincabinetry.com",
  checks: {
    locations: ["us-east-1"],
    tags: ["production", "tier1"],
    checkMatch: "__checks__/**/*.check.ts",
    ignoreDirectoriesMatch: ["node_modules/**"],
    playwrightConfig: {
      use: { baseURL: "https://vitrincabinetry.com" },
    },
    browserChecks: {
      frequency: Frequency.EVERY_12H,
      testMatch: "__checks__/**/*.spec.ts",
    },
  },
  cli: {
    runLocation: "us-east-1",
  },
});
