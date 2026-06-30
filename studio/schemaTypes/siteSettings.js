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
      name: "contact",
      title: "Kontaktuppgifter",
      type: "object",
      fields: [
        defineField({name: "name", title: "Kontaktperson", type: "string", initialValue: "Emma Ols\u00e9n"}),
        defineField({name: "phone", title: "Telefon", type: "string", initialValue: "070-496 50 53"}),
        defineField({name: "primaryEmail", title: "Prim\u00e4r e-post", type: "email", initialValue: "emma@magiskateatern.se"}),
        defineField({name: "backupEmail", title: "Reservmail", type: "email", initialValue: "magiskateatern.se@gmail.com"}),
      ],
    }),
    defineField({
      name: "importantLinks",
      title: "Viktiga l\u00e4nkar",
      type: "object",
      fields: [
        defineField({
          name: "calendarUrl",
          title: "Kalender / kommande evenemang",
          type: "url",
          initialValue: "https://www.magiskateatern.se/kalender-2/",
          validation: (rule) => rule.uri({scheme: ["http", "https"]}),
        }),
        defineField({
          name: "groupSignupUrl",
          title: "Anm\u00e4lan teatergrupper",
          type: "url",
          initialValue: "https://www.magiskateatern.se/teatergrupper-pa-magiska-teatern/",
          validation: (rule) => rule.uri({scheme: ["http", "https"]}),
        }),
        defineField({
          name: "cinemaSignupUrl",
          title: "Bioklubben",
          type: "url",
          initialValue: "https://www.magiskateatern.se/bioklubben-varterminen-2026/",
          validation: (rule) => rule.uri({scheme: ["http", "https"]}),
        }),
        defineField({
          name: "facebookUrl",
          title: "Facebook eller social l\u00e4nk",
          type: "url",
          validation: (rule) => rule.uri({scheme: ["http", "https"]}),
        }),
      ],
    }),
    defineField({
      name: "association",
      title: "Scenkonstf\u00f6reningen",
      type: "object",
      fields: [
        defineField({name: "bankgiro", title: "Bankgiro", type: "string", initialValue: "5520-4424"}),
        defineField({name: "organizationNumber", title: "Organisationsnummer", type: "string", initialValue: "802490-0089"}),
        defineField({name: "memberPrice", title: "Medlemsavgift", type: "string", initialValue: "100 kr per \u00e5r"}),
        defineField({name: "familyPrice", title: "Familjeavgift", type: "string", initialValue: "Max 250 kr per \u00e5r"}),
        defineField({name: "companySupportPrice", title: "F\u00f6retag st\u00f6dmedlem", type: "string", initialValue: "250 kr per \u00e5r"}),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "SEO-beskrivning",
      type: "text",
      rows: 2,
    }),
  ],
});
