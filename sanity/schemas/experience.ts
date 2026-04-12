import { defineType, defineField } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "company",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "startDate",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      type: "date",
      description: "Leave empty for current position.",
    }),
    defineField({
      name: "description",
      type: "blockContent",
    }),
    defineField({ name: "order", type: "number", hidden: true }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Start date (newest first)",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "company" },
  },
});
