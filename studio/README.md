# Magiska Teatern Admin

Sanity Studio ar baksidan dar agaren kan uppdatera innehall utan att roda i kod.

## Kom igang

1. Skapa ett Sanity-projekt pa https://www.sanity.io/manage.
2. Kopiera `studio/.env.example` till `studio/.env`.
3. Fyll i:

```bash
SANITY_STUDIO_PROJECT_ID=din-project-id
SANITY_STUDIO_DATASET=production
```

4. Installera och starta admin:

```bash
cd studio
npm install
npm run dev
```

5. Deploya admin nar projektet ar kopplat:

```bash
npm run deploy
```

Sanity hanterar login, roller och bildhantering. Lat helst agaren aga Sanity-organisationen/projektet och bjud in utvecklaren som collaborator. Pa Sanity Free kan rollutbudet vara begransat; mer finmaskiga roller kan krava uppgradering.

## Sakerhet

- Lagg aldrig Sanity write-token i frontend.
- Den publika hemsidan ska bara anvanda `VITE_SANITY_PROJECT_ID` och `VITE_SANITY_DATASET`.
- Hall datasetet publikt for publicerat innehall, eller bygg senare en server/proxy om innehall maste vara privat.
- Ge agaren en roll som kan uppdatera innehall. Ge bara utvecklare full administrator om det verkligen behovs.
- Lagg aldrig privata nycklar, API tokens eller bankuppgifter i Sanity-falt som visas publikt.
- Aktivera CORS origins i Sanity Manage:
  - `http://127.0.0.1:5173`
  - `https://benjaminsvensson.github.io`
  - eventuell framtida egen domain
  - Sanity Studio-domainen efter `npm run deploy`

## Koppla publika sajten

Kopiera `.env.example` i repo-roten till `.env.local` och fyll i samma projekt:

```bash
VITE_SANITY_PROJECT_ID=din-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-06-30
```

For GitHub Pages: lagg samma vardena som repository variables:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`

Inga tokens ska laggas i frontend. Den publika sidan laser bara publicerat innehall.

## Event som forsvinner automatiskt

Frontend visar bara event dar `endDateTime` eller `startDateTime` ligger i framtiden. Ett event behover alltsa inte raderas manuellt: nar datumet passerat slutar det visas publikt men finns kvar i admin som historik.

## Grundinstallningar som agaren bor fylla i

I dokumentet `Grundinstallningar` kan agaren uppdatera:

- hero-rubrik, tagline och startsidetext
- hero-bild
- adress
- kontaktperson, telefon, primar e-post och reservmail
- kalenderlank, teatergruppsanmalan och bioklubben-lank
- bankgiro, organisationsnummer och medlemsavgifter
- SEO-beskrivning

Se aven `../docs/OWNER_HANDOFF.md` och `../docs/PUBLISHING_READINESS.md` innan skarp lansering.
