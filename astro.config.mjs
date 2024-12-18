import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.byran.tech',
  integrations: [mdx(), sitemap(), tailwind(), react(), partytown()],
  redirects: {
    "/html/[...slug]": "/blog/[...slug]",
    "/techblogs/MakeRosetta2Terminal": "/blog/how-to-make-a-rosetta-2-emulated-x86-terminal-on-arm-apple-silicon-chips"
  },
});