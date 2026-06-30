import {defineArrayMember, defineField, defineType} from "sanity";

const categories = [
  {title: "Teater / scen", value: "biljetter"},
  {title: "Kurs / grupp", value: "kurser"},
  {title: "Bio", value: "bio"},
  {title: "Barn", value: "barn"},
  {title: "Hyrbart / event", value: "hyrbart"},
];

export const event = defineType({
  name: "event",
  title: "Evenemang",
  type: "document",
  groups: [
    {name: "basics", title: "Basinfo", default: true},
    {name: "booking", title: "Bokning"},
    {name: "publishing", title: "Publicering"},
  ],
  fields: [
    defineField({
      name: "title",
      title: "Namn pa evenemang",
      type: "string",
      group: "basics",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "publishing",
      options: {source: "title", maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isPublished",
      title: "Publicerad pa hemsidan",
      type: "boolean",
      group: "publishing",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Lyft pa startsidan",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      group: "basics",
      options: {
        list: categories,
        layout: "radio",
      },
      initialValue: "biljetter",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kort beskrivning",
      type: "text",
      group: "basics",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "description",
      title: "Lang beskrivning",
      type: "array",
      group: "basics",
      of: [defineArrayMember({type: "block"})],
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      group: "basics",
      options: {hotspot: true},
      fields: [
        defineField({
          name: "alt",
          title: "Alt-text",
          type: "string",
          description: "Kort beskrivning for tillganglighet.",
        }),
      ],
    }),
    defineField({
      name: "startDateTime",
      title: "Datum och starttid",
      type: "datetime",
      group: "basics",
      options: {timeStep: 15},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDateTime",
      title: "Sluttid eller sista datum",
      type: "datetime",
      group: "basics",
      description: "Om tomt doljs evenemanget efter starttiden.",
      options: {timeStep: 15},
    }),
    defineField({
      name: "price",
      title: "Pris",
      type: "string",
      group: "booking",
      placeholder: "250 kr / 100 kr medlem",
    }),
    defineField({
      name: "location",
      title: "Plats",
      type: "string",
      group: "booking",
      initialValue: "Askersundsvagen 32",
    }),
    defineField({
      name: "ctaLabel",
      title: "Knapptext",
      type: "string",
      group: "booking",
      initialValue: "Kop biljett",
    }),
    defineField({
      name: "ctaUrl",
      title: "Lank till biljett eller anmalan",
      type: "url",
      group: "booking",
      validation: (rule) => rule.uri({scheme: ["http", "https", "mailto"]}),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "startDateTime",
      media: "image",
    },
    prepare({title, subtitle, media}) {
      const date = subtitle ? new Date(subtitle).toLocaleString("sv-SE") : "Inget datum";
      return {title, subtitle: date, media};
    },
  },
  orderings: [
    {
      title: "Datum, narmast forst",
      name: "startDateAsc",
      by: [{field: "startDateTime", direction: "asc"}],
    },
  ],
});
