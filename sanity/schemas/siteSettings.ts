import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialLinks",
      type: "object",
      fields: [
        { name: "github", type: "url", title: "GitHub" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "email", type: "string", title: "Email" },
      ],
    }),
    defineField({
      name: "heroTexts",
      title: "Hero rotating texts",
      description: "Texts cycled in the hero typewriter animation.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
