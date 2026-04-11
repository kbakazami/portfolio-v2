import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["about", "siteSettings"] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.listItem()
        .title("About")
        .id("about")
        .child(
          S.document()
            .schemaType("about")
            .documentId("about")
            .title("About"),
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("experience").title("Experiences"),
      S.documentTypeListItem("skill").title("Skills"),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== undefined &&
          !["project", "experience", "skill", ...SINGLETONS].includes(
            item.getId() as string,
          ),
      ),
    ]);
