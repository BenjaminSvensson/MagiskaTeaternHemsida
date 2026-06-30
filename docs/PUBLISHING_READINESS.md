# Publiceringsstatus - Magiska Teatern

Senast uppdaterad: 2026-06-30.

Det här dokumentet är en ärlig lanseringslista för nya sidan. Målet är att den ska vara lätt att visa för ägaren och använda som checklista innan den ersätter den gamla WordPress-sidan.

För mer detaljerad mappning av gamla sidor och inlägg, se `docs/CONTENT_INVENTORY.md`.

## Nuvarande status

Sidan är en statisk Vite/Three.js-sajt hostad via GitHub Pages. Den har hash-routes för:

- `#/hem`
- `#/evenemang`
- `#/huset`
- `#/hyra`
- `#/engagera`
- `#/hitta`

Admin är scaffoldad i Sanity Studio under `studio/`. Publika sidan kan läsa publicerat Sanity-innehåll och sorterar bort passerade evenemang automatiskt när `startDateTime` eller `endDateTime` har passerat.

## Innehåll som är inflyttat eller omorganiserat

- Startsida: verksamhetens huvudvägar, hero, snabbvägar, aktuellt, hitta hit.
- Evenemang: kommande evenemang/kalender, teatergrupper, bioklubb och snabb kontakt.
- Teatergrupper: Dansdramalek, lilla teatergruppen, stora teatergruppen, vuxengrupp, terminsavgift och försäkringsnotis.
- Bioklubben: startinformation, prisnivåer och koppling till gammal biograf.
- Huset: hotell, branden 1923, Vretstorps biografteater 1925, bank/länsman/arrestcell, Bio-Johan, illusionisterna, föreningen, fasadrenovering och solel.
- Hyra: lokal, scenmått, max 150 personer, bar/läktare/loger, prisexempel, magishow, barnkalas, ansiktsmålning, Halloween, kostym, rekvisita och smink.
- Engagera: medlemskap, volontär, stödmedlem, sponsortrappa, bankgiro, organisationsnummer, styrelse och nuvarande sponsorer/samarbeten.
- Hitta hit: karta, parkering, bilväg, kollektivtrafik, telefon och e-post.

## Gamla sidor som har slagits ihop

Flera gamla småsidor är nu samlade i färre tydliga destinationer:

- Evenemang: `/evenemang/`, `/evenemang/kommande-evenemang/`, `/kalender-2/`, `/bioklubben-varterminen-2026/`, `/teatergrupper-pa-magiska-teatern/`, `/teatergrupper-vt2026/`.
- Huset/om: `/den-magiska-teaterbyggnaden/`, `/om-magiska-teatern/`.
- Hyra/event: `/hyr-lokal-event-eller-rekvisita/`, `/hyr-teaterlokal/`, `/hyr-ett-eget-event/`, `/hyr-kostym-och-rekvisita/`, `/smink-och-kostym/`, `/magiska-barnkalas/`, `/teaterlokalen/`, `/halloween-hos-oss/`.
- Engagera: `/scenkonstforening/`, `/sponsorer-och-samarbeten/`, `/sponsorer-och-samarbeten/bli-sponsor/`, `/sponsorer-och-samarbeten/bli-volontar/`.
- Hitta/kontakt: `/hitta-hit/`, `/kontakta-oss/`.

`public/404.html` mappar dessa gamla WordPress-vägar till rätt ny hash-route på GitHub Pages. Det är en klientredirect, inte en riktig server-301.

## Saker som fortfarande inte är full funktion

### Bokning och betalning

- Det finns inget eget betalflöde ännu.
- Biljett-/anmälanknappar går fortfarande till gamla originalsidans kalender/anmälningssidor eller till mail.
- Om ägaren vill sälja biljetter direkt på nya sidan behövs ett beslut om leverantör, till exempel Billetto, Tickster, Stripe Checkout, Swish-hantering via separat system eller fortsatt extern bokning.

### Kontaktformulär

- Formulären öppnar ett färdigifyllt mail till `emma@magiskateatern.se`.
- Det skickas inget formulär i bakgrunden och inget sparas i databas.
- För riktig produktion kan man behålla mailto om enkelhet räcker, eller koppla Formspree, Basin, Sanity server action, serverless function eller annat formulärsystem.

### Admin/CMS

- Sanity Studio finns i repo:t men måste deployas och ägas av rätt person/organisation.
- Ägaren bör vara ägare eller admin i Sanity-projektet innan sidan blir skarp.
- Lägg in roller så ägaren kan skapa/uppdatera event och grundtexter utan att ha onödigt bred adminåtkomst.
- GitHub Pages måste få repo variables:
  - `VITE_SANITY_PROJECT_ID`
  - `VITE_SANITY_DATASET`
  - `VITE_SANITY_API_VERSION`
- Sanity CORS måste tillåta:
  - lokal dev-URL
  - GitHub Pages-URL
  - framtida egen domän
  - Sanity Studio-domänen

### Kalender

- Kalenderkort länkar just nu till gamla `/kalender-2/`.
- En riktig kalender på nya sidan kan byggas från Sanity-eventen eller kopplas till Google Calendar/iCal senare.

### Domän och flytt från WordPress

- För att nya sidan ska ta över `magiskateatern.se` behöver ägaren eller domänadministratören ändra DNS.
- GitHub Pages behöver custom domain-inställning och HTTPS.
- Om gamla WordPress-sidan stängs ner försvinner serverbaserade redirects. Nu finns bara GitHub Pages `404.html` som fångar gamla länkar efter att domänen pekar mot GitHub Pages.
- Vill man ha riktiga 301 redirects bör man använda WordPress under övergången, Cloudflare, Netlify, Vercel eller annan hosting med redirect-regler.

### Adress måste bekräftas

- Användaren har instruerat att kartan ska visa `Askersundsvägen 32`.
- Originalsidans text anger ofta `Askersundsvägen 30`.
- Innan publicering måste ägaren bekräfta officiell adress, Google Maps-plats och vad som ska stå i SEO/schema.

### Kontaktuppgifter måste bekräftas

Nuvarande publika uppgifter från originalet:

- Emma Olsén
- Telefon: `070-496 50 53`
- E-post: `emma@magiskateatern.se`
- Reservmail: `magiskateatern.se@gmail.com`

Ägaren bör bekräfta om telefon, primär mail och reservmail ska visas publikt.

## Innehåll som bör dubbelkollas med ägaren

- Vårterminen 2026-data är historiskt/fallback. Skarpa framtida event ska in i Sanity.
- Pris för bioklubben: originalet anger 200 kr/år eller 500 kr/familj/år.
- Terminsavgift teatergrupper: originalet anger 750 kr.
- Hyrespriser:
  - vardag dag 1500 kr
  - helg dag 1800 kr
  - vardag kväll 1500 kr
  - fredag/lördag kväll 1800 kr
- Magishow: originalet anger 1500 kr.
- Ansiktsmålning: originalet anger 1500 kr.
- Kostym, rekvisita och smink: originalet anger pris enligt överenskommelse.
- Sponsortrappa och motprestationer.
- Sponsorlista:
  - Länsförsäkringar Bergslagen
  - K. Engströms bygg
  - Solkraft i Viby AB
  - ICA Sojas och lokala samarbeten
- Styrelse:
  - Emma Olsén, ordförande
  - Ulf Olsén, kassör
  - Diana Westman, ledamot
  - Natali Svensson, ledamot
  - Benjamin Svensson, ledamot

## Originalsidor som inventerats

- https://www.magiskateatern.se/
- https://www.magiskateatern.se/evenemang/
- https://www.magiskateatern.se/evenemang/kommande-evenemang/
- https://www.magiskateatern.se/kalender-2/
- https://www.magiskateatern.se/bioklubben-varterminen-2026/
- https://www.magiskateatern.se/teatergrupper-pa-magiska-teatern/
- https://www.magiskateatern.se/teatergrupper-vt2026/
- https://www.magiskateatern.se/den-magiska-teaterbyggnaden/
- https://www.magiskateatern.se/om-magiska-teatern/
- https://www.magiskateatern.se/scenkonstforening/
- https://www.magiskateatern.se/hyr-lokal-event-eller-rekvisita/
- https://www.magiskateatern.se/hyr-teaterlokal/
- https://www.magiskateatern.se/hyr-ett-eget-event/
- https://www.magiskateatern.se/hyr-kostym-och-rekvisita/
- https://www.magiskateatern.se/smink-och-kostym/
- https://www.magiskateatern.se/magiska-barnkalas/
- https://www.magiskateatern.se/teaterlokalen/
- https://www.magiskateatern.se/halloween-hos-oss/
- https://www.magiskateatern.se/hitta-hit/
- https://www.magiskateatern.se/kontakta-oss/
- https://www.magiskateatern.se/foresla-evenemang/
- https://www.magiskateatern.se/sponsorer-och-samarbeten/
- https://www.magiskateatern.se/sponsorer-och-samarbeten/bli-sponsor/
- https://www.magiskateatern.se/sponsorer-och-samarbeten/bli-volontar/

## Rekommenderad nästa lanseringsordning

1. Ägaren bekräftar adress, kontaktuppgifter, prislistor och vilka gamla texter som får användas rakt av.
2. Ägaren eller du skapar/övertar Sanity-organisationen och ger ägaren rätt roll.
3. Deploya Sanity Studio och lägg in minst 3 riktiga framtida event.
4. Lägg in GitHub repository variables för Sanity och verifiera att live-sidan hämtar CMS.
5. Bestäm boknings-/betalflöde.
6. Bestäm om mailto-formulär räcker eller om ett riktigt formulärsystem ska kopplas.
7. Koppla custom domain och HTTPS.
8. Kontrollera gamla URL:er, mobilvy, SEO-title/meta och kartan.
9. När allt är grönt: peka domänen från gamla WordPress till nya hostingen.
