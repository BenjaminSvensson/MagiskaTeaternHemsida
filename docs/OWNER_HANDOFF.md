# Ägarhandoff och lanseringsbeslut

Senast uppdaterad: 2026-06-30.

Det här är listan som kan användas med ägaren innan nya sidan tar över `magiskateatern.se`.

## Konton och ägarskap

### GitHub

Nuvarande repo ligger under utvecklarens GitHub-konto. För skarp drift bör ägaren antingen:

- skapa en egen GitHub-organisation och ta över repo:t, eller
- äga ett eget GitHub-konto där repo:t ligger, med utvecklare som collaborator.

GitHub Pages kan hosta från publika repositories på GitHub Free och GitHub Free för organisationer enligt GitHubs egna docs: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

Viktigt:

- Repo:t måste vara publikt om man vill använda GitHub Free utan Pro/Team.
- Använd inte utvecklarens privata konto som långsiktig ägare av kundens verksamhetssida.
- Ge minst två personer access, så sidan inte blir låst till en person.

### Sanity

Sanity-projektet ska helst ligga i ägarens Sanity-organisation. Sanity beskriver att projekt ligger på en plan och att projekt som standard kan ligga på en free plan med inkluderade quotas: https://www.sanity.io/docs/platform-management/plans-and-payments

Sanitys prissida ska alltid kontrolleras precis innan skarp lansering: https://www.sanity.io/pricing

Viktigt:

- Håll dig på free plan om quotas räcker.
- Bankkort/billing behövs normalt först om man uppgraderar eller behöver högre quota/roller/funktioner.
- Ge ägaren rätt roll för att skapa och ändra event, kontaktinfo, länkar, bilder och grundtexter.
- Lägg aldrig Sanity write-token i frontend eller GitHub Pages.

## Vad ägaren ska kunna uppdatera i admin

Admin i Sanity bör användas för:

- evenemang: titel, beskrivning, bild, datum/tid, pris, kategori, biljett-/anmälningslänk
- startsidans hero: tagline, rubrik, text, bild
- adress och karta
- kontaktperson, telefon, primär e-post och reservmail
- kalenderlänk, teatergruppsanmälan och bioklubbslänk
- föreningsinfo: bankgiro, organisationsnummer och medlemsavgifter
- SEO-beskrivning

Det som fortfarande är statiskt i koden kan senare lyftas in i `contentPage` eller `activity` om ägaren vill kunna ändra precis varje textblock själv.

## Beslut som måste tas innan domänflytt

- Officiell adress: originalet säger ofta `Askersundsvägen 30`, användaren har valt `Askersundsvägen 32`.
- Vilken e-post ska formulär och mailto gå till?
- Ska reservmail visas publikt?
- Ska telefonnummer visas publikt?
- Ska sidan fortsätta länka till gamla biljett-/anmälningssidor, eller ska ett nytt bokningssystem väljas?
- Ska betalning ske via externt system, Swish manuellt, Stripe Checkout, biljettplattform eller inte alls?
- Ska gamla WordPress finnas kvar ett tag för riktiga 301 redirects, eller räcker GitHub Pages `404.html`?
- Ska det finnas komplett bildgalleri eller bara utvalda bilder i designen?
- Ska tidigare evenemang importeras som arkiv i Sanity eller bara sammanfattas?
- Ska analytics/cookies användas? I så fall behövs integritets-/cookie-text.

## Rekommenderad lanseringsordning

1. Ägaren skapar eller bekräftar GitHub-ägarskap.
2. Ägaren skapar eller tar över Sanity-projektet.
3. Deploya Sanity Studio.
4. Lägg in skarpa framtida event i Sanity.
5. Lägg in GitHub repository variables för Sanity.
6. Verifiera att live-sidan hämtar Sanity på GitHub Pages.
7. Bekräfta kontakt, adress, priser och sponsorer.
8. Välj boknings-/betalflöde.
9. Testa gamla URL:er mot `public/404.html`.
10. Koppla custom domain i GitHub Pages.
11. Ändra DNS hos domänleverantör.
12. Verifiera HTTPS, mobil, karta, formulär, event och gamla länkar.
13. Behåll gamla WordPress i standby tills nya sidan är kontrollerad.

## Rollback-plan

Om något går fel vid domänflytt:

- peka DNS tillbaka till gamla WordPress-hostingen
- behåll GitHub Pages aktivt under `benjaminsvensson.github.io/MagiskaTeaternHemsida/`
- felsök Sanity/CORS/domän i lugn takt
- gör inte större innehållsändringar samtidigt som DNS flyttas

## Efter lansering

Ägaren bör ha en enkel månatlig rutin:

- ta bort eller arkivera felaktiga event
- lägga in nya event innan de marknadsförs
- kontrollera kontaktformulär/mail
- kontrollera att externa biljett-/anmälningslänkar fungerar
- kontrollera sponsorlista och priser inför ny termin
