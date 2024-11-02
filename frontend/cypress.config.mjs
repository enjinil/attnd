import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/integration/*.spec.{ts,js}",
    supportFile: "cypress/support/e2e.ts",
  },
  chromeWebSecurity: false
});
