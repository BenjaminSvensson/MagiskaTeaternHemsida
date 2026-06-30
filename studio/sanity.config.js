import {visionTool} from "@sanity/vision";
import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {schemaTypes} from "./schemaTypes/index.js";

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET || "production";

const singleton = (S, type, title) =>
  S.listItem()
    .title(title)
    .id(type)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type));

export default defineConfig({
  name: "magiska-teatern",
  title: "Magiska Teatern Admin",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Innehall")
          .items([
            singleton(S, "siteSettings", "Grundinstallningar"),
            S.divider(),
            S.documentTypeListItem("event").title("Evenemang"),
            S.documentTypeListItem("activity").title("Verksamhet och erbjudanden"),
            S.documentTypeListItem("contentPage").title("Sidtexter"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
