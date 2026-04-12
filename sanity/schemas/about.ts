import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "funFacts",
      title: "Fun facts",
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
    prepare: () => ({ title: "About" }),
  },
});
