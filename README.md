# Magiska Teatern Hemsida

Interaktiv Vite/Three.js-sida for Magiska Teatern, hostad via GitHub Pages.

## Utveckling

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

GitHub Pages bygger automatiskt vid push till `main`.

## CMS och admin

Admin-studion finns i `studio/` och ar byggd for Sanity. Den ar tankt som agerens enkla baksida:

- skapa nytt evenemang
- fylla i namn, beskrivning, bild, lank, datum och tid
- publicera/avpublicera
- lyfta ett event pa startsidan
- uppdatera grundtexter, adress och kontaktinfo

Publika sajten laser bara publicerat innehall. Den skickar inga hemliga tokens till browsern.

Event forsvinner automatiskt fran publika sajten nar `endDateTime` eller `startDateTime` har passerat. De ligger kvar i Sanity som historik.

Se `studio/README.md` for installation och deploy av admin.

## Publicering

Se `docs/PUBLISHING_READINESS.md` for aktuell lanseringschecklista, gamla URL:er som mappas om, och allt som fortfarande behover agaren/betalning/kontaktmetoder innan sidan ersatter originalet.

Se ocksa `docs/CONTENT_INVENTORY.md` for en mer detaljerad mappning av originalets sidor, inlagg och vad som har slagits ihop.
