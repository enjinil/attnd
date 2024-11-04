import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/integration/*.spec.{ts,js}",
    supportFile: "cypress/support/e2e.ts",
  },
  env: {
    API_URL: "http://127.0.0.1:4000/api/graphql",
    TEST_API_URL: "http://127.0.0.1:4000/test",
  },
  chromeWebSecurity: false
});
