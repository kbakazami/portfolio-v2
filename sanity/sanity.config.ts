import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { apiVersion, dataset, projectId } from "./env";

const SINGLETON_TYPES = new Set(["about", "siteSettings"]);

export default defineConfig({
  name: "portfolio-v2",
  title: "Portfolio Kba",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && !["duplicate", "delete"].includes(action),
          )
        : input,
  },
});
