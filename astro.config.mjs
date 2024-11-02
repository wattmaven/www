// @ts-check
import partyTown from "@astrojs/partytown";
import sentry from "@sentry/astro";
import { defineConfig } from "astro/config";

import { loadEnv } from "vite";

import tailwind from "@astrojs/tailwind";

// See https://docs.astro.build/en/guides/configuring-astro/#environment-variables.
const { SENTRY_AUTH_TOKEN } = loadEnv(
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV ?? "development",
  // eslint-disable-next-line no-undef
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  site: "https://wattmaven.com",
  integrations: [
    tailwind(),
    partyTown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sentry({
      dsn: "https://03e18cbd360b6a882ce12bc687d4584c@o4508094123278336.ingest.us.sentry.io/4508225732542464",
      sourceMapsUploadOptions: {
        project: "www",
        authToken: SENTRY_AUTH_TOKEN,
      },
    }),
  ],
});
