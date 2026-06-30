import {defineArrayMember, defineField, defineType} from "sanity";

export const activity = defineType({
  name: "activity",
  title: "Verksamhet och erbjudanden",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Typ",
      type: "string",
      options: {
        list: [
          {title: "Teatergrupp", value: "group"},
          {title: "Bioklubb", value: "cinema"},
          {title: "Hyr lokal", value: "venue"},
          {title: "Kostym och rekvisita", value: "costume"},
          {title: "Barnkalas / event", value: "party"},
          {title: "Sponsor", value: "sponsor"},
          {title: "Volontar", value: "volunteer"},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "route",
      title: "Visas pa sida",
      type: "string",
      options: {
        list: [
          {title: "Evenemang", value: "evenemang"},
          {title: "Hyr & event", value: "hyra"},
          {title: "Engagera", value: "engagera"},
          {title: "Huset", value: "huset"},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kort text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "details",
      title: "Langre text",
      type: "array",
      of: [defineArrayMember({type: "block"})],
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: {hotspot: true},
      fields: [defineField({name: "alt", title: "Alt-text", type: "string"})],
    }),
    defineField({name: "price", title: "Pris", type: "string"}),
    defineField({name: "schedule", title: "Tid/schema", type: "string"}),
    defineField({name: "ctaLabel", title: "Knapptext", type: "string"}),
    defineField({
      name: "ctaUrl",
      title: "Lank",
      type: "url",
      validation: (rule) => rule.uri({scheme: ["http", "https", "mailto"]}),
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
      subtitle: "type",
      media: "image",
    },
  },
});
