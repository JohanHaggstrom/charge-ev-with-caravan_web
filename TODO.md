# TODO - Elbil-husvagn-ladda (EHL)

## Varumärke & Allmänt
- [x] **Byta namn**: Ändra applikationens namn till "Elbil-husvagn-ladda" (EHL).
- [ ] **Reklam**: Lägga till reklam på huvudsidan. Så att man kan få in pengar?
- [ ] **Patreon-ish**: Lägga till en Patreon-ish funktion där man kan stödja utvecklingen.


## Infrastruktur & DevOps
- [x] **Taskar**: Skapa task(ar) för att förenkla utvecklingen.
- [ ] **Hosting**: Utreda hur applikationen ska hostas.
- [ ] **HTTPS Strategi**: Planera för reverse proxy (t.ex. Nginx/Traefik) för SSL-terminering i produktion.
- [ ] **Docker**: Skapa Dockerfiles för frontend och backend, samt en docker-compose för att köra allt lokalt.
- [ ] **CI/CD**: Implementera CI/CD-pipeline för automatisk deployment.

## Backend (.NET)
- [ ] **Databas**: Byta ut InMemory-databasen mot en riktig databas (t.ex. PostgreSQL eller SQL Server).
- [ ] **Data-modell**: Utöka modellen för laddstationer (fler fält, riktiga koordinater).
- [ ] **API-säkerhet (Läs)**: Implementera API-nyckel för att läsa laddstationer (konfigureras via miljövariabler).
- [ ] **Autentisering (Skriv)**: Implementera Login-funktionalitet för administrativa åtgärder.
- [ ] **CRUD-operationer**:
    - [ ] Möjlighet att lägga till en punkt.
    - [ ] Möjlighet att editera en punkt.
    - [ ] Möjlighet att ta bort en punkt.
- [ ] **Sociala funktioner**:
    - [ ] Möjlighet att lägga till kommentarer på en punkt.
    - [ ] Möjlighet att ge tumme upp/ner på en punkt.

## Frontend (Angular)
- [ ] **Karta - Sök**: Implementera sökfält för att hitta platser på kartan.
- [ ] **Karta - Styling**: Göra pins transparenta/snyggare.
- [ ] **API-koppling**: Koppla ihop frontend med backend på riktigt (ersätta hårdkodad data).
- [ ] **Säkerhet**: Hantera API-nyckel i anrop och Login-flöde i UI.
- [ ] **Admin UI**: Gränssnitt för att lägga till, redigera och ta bort punkter.
- [ ] **Social UI**: Gränssnitt för kommentarer och betyg.
- [ ] **Felhantering**: Hantera om backend är nere eller API-anrop misslyckas.
- [ ] **Lista/karta**: Lägg till möjlighet att visa en lista eller en karta.

## Dokumentation
- [ ] **Uppdatera README**: Dokumentera nya funktioner och Docker-setup.
