import {defineArrayMember, defineField, defineType} from "sanity";

export const contentPage = defineType({
  name: "contentPage",
  title: "Sidtext",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Sidans titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "route",
      title: "Sida",
      type: "string",
      options: {
        list: [
          {title: "Start", value: "hem"},
          {title: "Evenemang", value: "evenemang"},
          {title: "Huset", value: "huset"},
          {title: "Hyr & event", value: "hyra"},
          {title: "Engagera", value: "engagera"},
          {title: "Hitta hit", value: "hitta"},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Ingress",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Sidbild",
      type: "image",
      options: {hotspot: true},
      fields: [defineField({name: "alt", title: "Alt-text", type: "string"})],
    }),
    defineField({
      name: "sections",
      title: "Sektioner",
      type: "array",
      of: [
        defineArrayMember({
          name: "section",
          title: "Sektion",
          type: "object",
          fields: [
            defineField({name: "eyebrow", title: "Liten etikett", type: "string"}),
            defineField({name: "title", title: "Rubrik", type: "string"}),
            defineField({name: "text", title: "Text", type: "text", rows: 4}),
            defineField({name: "image", title: "Bild", type: "image", options: {hotspot: true}}),
            defineField({name: "linkLabel", title: "Lanktext", type: "string"}),
            defineField({
              name: "linkUrl",
              title: "Lank",
              type: "url",
              validation: (rule) => rule.uri({scheme: ["http", "https", "mailto"]}),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "isPublished",
      title: "Publicerad",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "route",
      media: "heroImage",
    },
  },
});
