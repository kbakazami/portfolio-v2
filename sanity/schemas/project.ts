import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "Short description (2 lines max) shown on project cards.",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Pro", value: "pro" },
          { title: "Perso", value: "perso" },
          { title: "Lab", value: "lab" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "visibility",
      type: "string",
      options: {
        list: [
          { title: "Public", value: "public" },
          { title: "Private", value: "private" },
        ],
        layout: "radio",
      },
      initialValue: "public",
    }),
    defineField({
      name: "technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "blockContent",
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "blockContent",
    }),
    defineField({
      name: "highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "githubUrl", type: "url" }),
    defineField({ name: "liveUrl", type: "url" }),
    defineField({ name: "demoVideoUrl", type: "url" }),
    defineField({ name: "docsUrl", type: "url" }),
    defineField({ name: "order", type: "number", hidden: true }),
  ],
  orderings: [
    {
      title: "Order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
