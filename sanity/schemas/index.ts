import type { SchemaTypeDefinition } from "sanity";

import { blockContent } from "./blockContent";
import { project } from "./project";
import { experience } from "./experience";
import { skill } from "./skill";
import { about } from "./about";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  project,
  experience,
  skill,
  about,
  siteSettings,
];
