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

Sanity hanterar login, roller och bildhantering. Ge agaren rollen `Editor` eller en begransad roll, inte nodvandigtvis full admin.

## Sakerhet

- Lagg aldrig Sanity write-token i frontend.
- Den publika hemsidan ska bara anvanda `VITE_SANITY_PROJECT_ID` och `VITE_SANITY_DATASET`.
- Hall datasetet publikt for publicerat innehall, eller bygg senare en server/proxy om innehall maste vara privat.
- Ge agaren `Editor`-roll. Ge bara utvecklare full administrator.
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
