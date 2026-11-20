---
title: Hosting & pull requests
category: Synchroniseren & meerdere repo's
order: 56
summary: Maak overal PR's aan; review en merge ze op GitHub en GitLab.
keywords: pull request PR merge request GitHub GitLab Bitbucket Azure DevOps review goedkeuren approve mergen issues
---

# Hosting & pull requests

## Aanmaken

Maak een pull request (of merge request) aan zonder de app te verlaten:
branchkeuzelijsten, titel en body voorgevuld vanuit de commits van de branch, een
conceptschakelaar, en — op GitHub — reviewers, labels en toegewezen personen die
bij het aanmaken meteen worden toegepast.

![Een pull request aanmaken](../../screenshots/create-pr.webp)

Werkt op **GitHub, GitLab, Bitbucket en Azure DevOps**. Openstaande PR's/MR's
voor alle vier staan in de zijbalk.

Begin er een vanuit branchvergelijking, de grafiek, de `+` in het PR-paneel, of
vanuit een issue (wat `Closes #N` invult).

## Stapels in de lijst

Pull requests die op elkaar staan vouwen samen tot één regel met een
stapelpictogram, de branch waarop de ketting landt en hoeveel het er zijn. Klap
hem uit om de ketting in leesvolgorde te zien — blad eerst, tot aan de basis —
met een pijltje onder elke regel dat noemt waarin hij samengaat, zodat de
richting op het scherm staat in plaats van uit vier bases te volgen.

Twee dingen maken zo'n groep: GitHubs eigen stapelnummer, als de pull requests
bij een [native stapel](stacks.md) horen, en anders de refs zelf — een pull
request wiens basis de head van een andere is, staat erop. Die tweede regel is
waarom dit ook op GitLab, Bitbucket en Azure DevOps werkt.

![Een stapel in de pull-requestlijst](../../screenshots/pr-stack-list.webp)

Elke regel draagt de staat van de **checks** van zijn head — hover voor de
aantallen — en op GitHub ook de niveaus die al gesloten of gemerged zijn, die een
lijst met open PR's zou verbergen. Een niveau boven een **gesloten** niveau wordt
als geblokkeerd gemarkeerd: zijn eigen checks mogen groen zijn, maar de branch
waarop hij mikt gaat nooit landen. De acties van de regel verschijnen bij hover,
zodat de titel de breedte houdt.

De checks lezen kost één verzoek per pull request, en alleen bij het verversen
van de lijst.

## Je pull requests op de bovenliggende repository van een fork

In een fork zijn de pull requests die ertoe doen meestal die je opende op de
repository waarvan je forkte, en die staan daar, niet op je fork. Heeft een
repository dus een remote `upstream` die naar een andere GitHub-repository wijst
dan `origin`, dan vraagt de lijst ook `upstream` om zijn open pull requests en
houdt **alleen die waarvan de branch uit je fork komt**. Ze verschijnen onder die
van je fork, onder een kop met de naam van de bovenliggende repository, **Op
owner/repo**. Een klik opent dezelfde detailweergave, met checks en review, op de
bovenliggende repository.

![De eigen pull request van de fork, daaronder zijn pull requests op de bovenliggende repository onder On example/pr-ready-branch](../../screenshots/fork-upstream-prs.webp)

*Grenzen:* alleen GitHub, en alleen een remote met de naam `upstream`. De andere
pull requests van de bovenliggende repository blijven bewust weg: dat is diens
wachtrij, niet jouw werk. Stapels en branch-zoekacties werken nog steeds alleen
met de lijst van `origin`. De bovenliggende repository opvragen kost één verzoek
meer per verversing.

## Reviewen — GitHub en GitLab

| | |
|---|---|
| **Gesprek** | Opmerkingen en reviewstatus |
| **Checks** | CI-checkruns (GitHub) of pipeline-jobs (GitLab) met geslaagd/mislukt/in behandeling en links naar de logs |
| **Bekeken bestanden** | Een ✓-checklist per bestand met voortgang |
| **Inline threads** | Regelopmerkingen gegroepeerd per `file:line`, en antwoorden |
| **Acties** | Reageren, goedkeuren, wijzigingen vragen, en mergen / squashen |

Force-pusht iemand midden in de review, dan laat
[wat er veranderd is sinds](range-diff.md) je precies zien wat er verschoof.

De GitLab-verschillen, in duidelijke taal: GitLab kent geen enkele
"review indienen"-aanroep, dus **goedkeuren** gebruikt zijn approval-endpoint
en **wijzigingen vragen** trekt je goedkeuring in en plaatst je opmerking.
**Rebase-mergen** wordt niet aangeboden — GitLab bepaalt merge-commit versus
fast-forward aan de hand van de projectinstellingen, dus het mergemenu toont
alleen mergen en squashen. Inline threads tonen het bestand en de regel, maar
niet de omliggende diff-hunk, die de API van GitLab niet teruggeeft.
Reviewen/mergen werkt voor projecten op **gitlab.com**; zelf gehoste instanties
worden nog niet ondersteund. Bitbucket en Azure DevOps openen voor review nog
steeds in de browser.

## Zelf beheerde GitLab

Een bedrijfs-GitLab heeft een eigen adres. Geef een profiel dat adres in
**Instellingen → Integraties → GitLab → GitLab-adres**, bijvoorbeeld
`git.example.org` of `https://example.net/gitlab` voor een instantie onder een
pad. Vanaf dan zijn remotes op die host GitLab: merge requests worden getoond,
geopend, gereviewd en gemerged, de kloonbrowser en *Repository aanmaken* praten
ermee, en push en fetch melden zich aan met het token van dat profiel.

**Een GitLab-token hoort bij één instantie.** Het token van een profiel wordt
alleen naar het adres gestuurd dat dat profiel noemt. Een leeg adres betekent
gitlab.com. Een gitlab.com-token bereikt nooit de bedrijfsserver, en een
bedrijfstoken nooit gitlab.com. Staan je werk- en privéaccount op verschillende
instanties, geef elk dan een eigen profiel. Een repository die aan een profiel
gekoppeld is, gebruikt de instantie van dat profiel.

**Token aanmaken** opent de tokenpagina van je instantie met `api` en
`write_repository` vooraf geselecteerd. Een alleen-lezen-token verbindt zonder
problemen en faalt dan bij de eerste push.

Grenzen:

- **Alleen https.** Een `http://`-adres wordt geweigerd, omdat het token anders
  onversleuteld over het netwerk zou gaan.
- **Eén GitLab-instantie per profiel.** Voeg een tweede profiel toe voor een
  tweede instantie.
- Via ssh wordt de host vergeleken, niet het pad, dus twee instanties op één host
  onder verschillende paden zijn bij een ssh-remote niet uit elkaar te houden.
- Remote-avatars worden alleen getekend voor gitlab.com en github.com. Een zelf
  beheerde remote krijgt het eenvoudige pictogram, zodat zijn groepsnamen nooit
  naar een publieke host gaan.

## Forgejo

Stel het adres van de instantie in voordat je het token invoert. Het adres wijzigen wist de vorige aanmelding.

![Instellingen voor de Forgejo-integratie](../../screenshots/forgejo-integration.webp)

Forgejo — en Gitea, dat dezelfde API deelt — draait altijd op een adres dat de
eigenaar koos: je eigen server, of een publieke zoals codeberg.org. Geef een
profiel dat adres in **Instellingen → Integraties → Forgejo**, samen met een
toegangstoken. **Token aanmaken** opent de tokenpagina van die server. Geef het
token lees- en schrijfrechten op *repository* en leesrechten op *user* en
*organization*.

Vanaf dan zijn remotes op die server Forgejo:

| Werkt | Hoe |
|-------|-----|
| Push en fetch | Aangemeld met het token van het profiel |
| Open pull requests | Getoond in de zijbalk en geopend in de [pull-requestpagina](#reviewen--github-en-gitlab): gesprek, diff van elk bestand, checks (commitstatussen, inclusief Forgejo Actions), reageren, goedkeuren, wijzigingen vragen, en merge / squash / rebase |
| Een pull request aanmaken | Vanuit de app; een concept krijgt het voorvoegsel `WIP:` dat Forgejo gebruikt |
| Kloonbrowser, repository aanmaken | Op die server, onder je account of een organisatie |

Net als bij GitLab gaat **een Forgejo-token alleen naar de server die het
uitgaf**. Een profiel zonder Forgejo-adres heeft helemaal geen
Forgejo-aanmelding. Er is geen standaardserver om op terug te vallen.

Grenzen:

- Draden met regelopmerkingen worden getoond, maar je kunt er vanuit de app niet
  op antwoorden: Forgejo heeft geen API voor een antwoord binnen een bestaande
  draad. Antwoord op de server.
- Alleen https, één Forgejo-server per profiel.
- Lijsten tonen de eerste 50 pull requests en repositories.

## Issues, milestones, releases — GitHub

Blader door issues en open een volledig issue-tabblad: body, opmerkingen, labels,
toegewezen personen, milestone, Projects v2-velden, sluiten/heropenen, en **maak
een branch voor dit issue** (met AI-naamgeving). Milestones tonen voortgang en
hun issues. Releases zijn doorbladerbaar met een changelogpagina.

## Wacht op jouw review

In de pull-requestlijst van de zijbalk markeert een 👁 de PR's waarbij **jij**
reviewer bent en nog niet hebt gereageerd — op GitHub, GitLab en Forgejo. Wie
„jij” bent, wordt met de aanmelding van het profiel aan de host gevraagd en tien
minuten onthouden. Een token dat zijn eigen gebruiker niet mag lezen (zonder
`read:user` op Forgejo, bijvoorbeeld) markeert niets.

## Meldingen — GitHub

Je hele inbox — reviewverzoeken, vermeldingen, CI-activiteit — over elke
repository heen, met filters voor ongelezen/alles en markeren als gelezen. De bel
in de werkbalk draagt een badge voor ongelezen items, en optionele
bureaubladmeldingen gaan af wanneer er om een review gevraagd wordt of CI klaar
is.

## Tokens

Tokens per profiel voor meerdere accounts of organisaties, bewaard in de
sleutelhanger van je besturingssysteem. Gitcito kan ook lenen wat je **git
credential helper** al bevat, dus een organisatie waarvoor je al geauthenticeerd
bent vergt vaak helemaal geen instelwerk. Zie
[Beveiliging & geheimen](security.md).

Elk profiel **koppelt zijn eigen account**. In Instellingen → Integraties zoekt
**Inloggen met git** een login die al op de machine staat — in de credential
helper van git, dan het actieve account van de **GitHub CLI**, dan het
aanmeldvenster van de helper — en koppelt dat account aan het profiel. Niets
wordt stilzwijgend gedeeld: een nieuw profiel begint ontkoppeld, en een account
dat een ander profiel al koppelde, wordt geweigerd. Voor een tweede
GitHub-account voeg je het toe aan gh (`gh auth login`), maak je het actief
(`gh auth switch`) en meld je aan vanuit het andere profiel — of plak je het
token van dat account. Git vraagt nooit in een terminal om gebruikersnaam en
wachtwoord.

De pagina toont of de verbinding het token van het profiel is, de koppeling met
de helper van git of met de GitHub CLI, en **Ontkoppelen** maakt dat alleen voor
dit profiel ongedaan: een token wordt gewist (bij de host blijft het geldig tot
je het daar intrekt), een koppeling verwijderd (de login blijft in gh of de helper).

De API van de host — pull requests, issues, CI — en fetch, pull en push van git
zelf over https gebruiken allebei het token of het gekoppelde account van het
profiel. De inloggegevens bereiken git alleen voor dat ene commando, beperkt tot
de host van de remote, en worden nooit in `.git/config` geschreven. Een profiel
zonder beide laat git aan zijn eigen credential helper over. Azure DevOps,
GitLab en Bitbucket koppelen via de credential helper van git — Git Credential
Manager bewaart meerdere accounts per host — of gebruiken een token per
profiel. Een koppeling noemt één account per host, dus organisaties die
verschillende accounts nodig hebben, krijgen elk een profiel.

**Zie ook:** [Gestapelde branches](stacks.md) · [AI-functies](ai.md)
