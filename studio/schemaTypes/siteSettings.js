import {defineField, defineType} from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Grundinstallningar",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Sajtens namn",
      type: "string",
      initialValue: "Magiska Teatern",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "noticeBar",
      title: "Topprad",
      type: "string",
      initialValue: "Teater, bio, barnkalas och magiska event i Vretstorp",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Dar drommar blir verklighet",
    }),
    defineField({
      name: "heroTitle",
      title: "Startsiderubrik",
      type: "string",
      initialValue: "En plats for scen, saga och skratt.",
    }),
    defineField({
      name: "heroText",
      title: "Startsidetext",
      type: "text",
      rows: 3,
      initialValue:
        "Norra Europas enda Magiska Teater, mitt i Vretstorp. Har ryms teatergrupper, bioklubb, forestallningar, barnkalas, lokalhyra, kostym, rekvisita och egna event.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero-bild",
      type: "image",
      options: {hotspot: true},
      fields: [
        defineField({
          name: "alt",
          title: "Alt-text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "address",
      title: "Adress",
      type: "object",
      fields: [
        defineField({name: "street", title: "Gata", type: "string", initialValue: "Askersundsvagen 32"}),
        defineField({name: "postalCode", title: "Postnummer", type: "string", initialValue: "694 50"}),
        defineField({name: "city", title: "Ort", type: "string", initialValue: "Vretstorp"}),
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Kontaktmail",
      type: "email",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO-beskrivning",
      type: "text",
      rows: 2,
    }),
  ],
});
