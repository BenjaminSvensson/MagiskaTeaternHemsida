# Innehållsinventering från originalet

Senast uppdaterad: 2026-06-30.

Källa: WordPress REST API och publika sidor på `https://www.magiskateatern.se/`.

Syftet med den här filen är att visa vad som har tagits med, vad som har slagits ihop, och vad som sannolikt är gammalt arkiv eller tekniskt skräp. Hellre för mycket än för lite inför ägarens genomgång.

## Aktiva originalsidor

| Original | Ny plats | Status |
| --- | --- | --- |
| `/` | `#/hem` | Inflyttad och omdesignad. |
| `/evenemang/` | `#/evenemang` | Inflyttad. |
| `/evenemang/kommande-evenemang/` | `#/evenemang` | Ersätts av Sanity-event. Fallback länkar till gamla kalendern tills riktiga framtida event finns. |
| `/kalender-2/` | `#/evenemang` | Länkas vidare tills egen kalender byggs. |
| `/bioklubben-varterminen-2026/` | `#/evenemang` | Innehåll sammanfattat. Datum behöver uppdateras av ägare/CMS. |
| `/teatergrupper-pa-magiska-teatern/` | `#/evenemang` | Inflyttad med grupper, tider och terminsavgift. |
| `/teatergrupper-vt2026/` | `#/evenemang` | Sammanfogad med teatergrupper. |
| `/den-magiska-teaterbyggnaden/` | `#/huset` | Inflyttad och mer bildbaserad. |
| `/om-magiska-teatern/` | `#/huset` + `#/engagera` | Undermeny ersatt med riktiga sidor. |
| `/scenkonstforening/` | `#/engagera` | Inflyttad med medlemskap, bankgiro, organisationsnummer och styrelse. |
| `/sponsorer-och-samarbeten/` | `#/engagera` | Inflyttad med sponsortrappa och kända sponsorer. |
| `/sponsorer-och-samarbeten/bli-sponsor/` | `#/engagera` | Sammanfogad. |
| `/sponsorer-och-samarbeten/bli-volontar/` | `#/engagera` | Sammanfogad. Gammal sida hade nästan inget innehåll. |
| `/hyr-lokal-event-eller-rekvisita/` | `#/hyra` | Inflyttad. |
| `/hyr-teaterlokal/` | `#/hyra` | Inflyttad med scenmått, kapacitet, bar, loger och prisexempel. |
| `/hyr-ett-eget-event/` | `#/hyra` | Inflyttad med magishow, barnkalas, ansiktsmålning och teman. |
| `/hyr-kostym-och-rekvisita/` | `#/hyra` | Inflyttad. |
| `/smink-och-kostym/` | `#/hyra` | Inflyttad. |
| `/magiska-barnkalas/` | `#/hyra` | Inflyttad. |
| `/teaterlokalen/` | `#/hyra` | Inflyttad. |
| `/halloween-hos-oss/` | `#/hyra` | Inflyttad som tema/eventmöjlighet. Originalet hade lite synligt textinnehåll. |
| `/hitta-hit/` | `#/hitta` | Inflyttad med karta, parkering, bil och kollektivtrafik. |
| `/kontakta-oss/` | `#/hitta` + mailto-formulär | Inflyttad med kontaktuppgifter. |
| `/foresla-evenemang/` | `#/evenemang` | Sammanfogad i snabbkontakt/ärendeval. |
| `/bild/` | Inte egen sida | Bildmaterial används i designen. Behöver ägarbeslut om komplett galleri önskas. |

## Tekniska eller sannolikt ej publika sidor

| Original | Bedömning |
| --- | --- |
| `/wp-travel-dashboard/` | Teknisk/plugin-sida. Bör inte migreras. |
| `/wp-travel-checkout/` | Teknisk checkout/plugin-sida. Ska ersättas av valt boknings-/betalflöde. |
| `/mitt-konto/` | Gammal kontosida. Behövs bara om ett nytt biljettsystem kräver konto. |

## Gamla inlägg som fortfarande säger något om verksamheten

Dessa ska inte nödvändigtvis bli egna sidor, men de berättar vad huset har gjort och kan göra. Nya sidan har fått en “Tidigare format”-sektion på `#/evenemang` för att fånga bredden.

| Grupp | Exempel från arkivet | Ny plats |
| --- | --- | --- |
| Teatergrupper och kurser | `teatergrupp`, `teatergrupper`, `barnteatergrupp`, `teaterworkshop`, `teatersport`, `dans` | `#/evenemang` |
| Bio och film | `bio`, `filmklubb`, `filmer`, `om-bion`, `filmvisning` | `#/evenemang` |
| Magi | `magishow`, `trollkarlsskola`, `trolleriworkshop`, `minnesteknik` | `#/evenemang` och `#/hyra` |
| Barn och lov | `spokbanor-31-10`, `hostlovsaktiviteter`, `teaterkollo`, `sommarteaterdag`, `sagostig-for-barn-21-8-kl-14-00`, `paskaventyr`, `cirkusskola` | `#/evenemang` eller `#/hyra` |
| Scenprogram | `revy`, `standup`, `dockteater`, `poesiafton`, `illusionistens_assistent`, `maestro`, `den-unge-werthers-lidanden`, `effektiva`, `bamse` | `#/evenemang` |
| Förening och stöd | `arsmote`, `scenkonstforeningens-arsmote`, `bli-medlem-i-magiska-teatern-scenkonstforening`, `stod-magiska-teatern`, `vaffeldagen` | `#/engagera` |
| Husets historia | `magiska-teatern-far-nya-agare`, `aterinvigning`, `magiska-teatern-har-fatt-ny-fasad`, `fasadrenovering`, `solceller-pa-magiska-teaterns-tak`, `magiska-teatern-tillbakablic-k-over-de-senaste-fem-aren` | `#/huset` |
| Lokalt/community | `lan`, `laxhjalp-for-barn-och-tonaringar`, `advent`, `vibydagen`, `nya-vibyboken-presenteras-pa-magiska-teatern-16-12` | Främst arkiv/idébank. |

## Inlägg som sannolikt bara ska leva i arkiv eller redirect

Följande är mycket gamla, inställda, datumbundna, eller tunna poster. De bör inte synas som aktuellt innehåll men gamla länkar kan skickas till närmaste ny sida:

- `alfons`
- `eddan`
- `carling`
- `harry`
- `catwalk`
- `tavla`
- `intresseanmalan`
- `julshow`
- `hyreskontrakt`
- `hyran`
- `vykort`
- `werther`
- `barnteater`
- `filmklubb`
- `halloween-2`

## Beslut för ägaren

- Ska det finnas ett publikt arkiv över tidigare evenemang, eller räcker det med “Tidigare format”-sektionen?
- Ska bildsidan bli ett riktigt galleri?
- Ska gamla inlägg importeras till Sanity som arkivposter, eller bara redirectas till relevanta nya sidor?
- Ska gamla tekniska kontosidor tas bort helt när ny domän går live?
