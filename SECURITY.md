# Säkerhet

## Säkerhetskontroller

Detta projekt använder npm för att hantera beroenden och säkerhet.

### Regelbundna säkerhetskontroller

Kör följande kommandon regelbundet för att hålla projektet säkert:

```bash
# Kontrollera efter kända sårbarheter
npm audit

# Kontrollera efter föråldrade paket
npm outdated

# Uppdatera alla paket till senaste kompatibla versioner
npm update

# Uppdatera alla paket till senaste versioner (kan orsaka breaking changes)
npm update --latest
```

### Automatiska säkerhetskontroller

Projektet har följande npm-scripts för säkerhet:

```bash
# Kör säkerhetsaudit
npm run security:audit

# Kör säkerhetsaudit och försök fixa automatiskt
npm run security:fix

# Kontrollera föråldrade paket
npm run security:outdated

# Kör alla säkerhetskontroller
npm run security:check
```

## Kända sårbarheter

### CVE-2025-66414 - @modelcontextprotocol/sdk (Åtgärdad)
- **Status**: Ingen åtgärd krävs
- **Datum**: 2025-12-04
- **Beskrivning**: DNS rebinding protection saknas i MCP TypeScript SDK
- **Påverkan**: Ingen - paketet är ett transitivt beroende via @angular/cli och används inte i produktionskod
- **Åtgärd**: Ingen åtgärd krävs. Paketet bundlas inte med produktionsbygget.

## Rapportera säkerhetsproblem

Om du hittar en säkerhetssårbarhet i detta projekt, vänligen kontakta projektägaren direkt istället för att skapa en publik issue.

## Säkerhetsriktlinjer

### Frontend
- Använd alltid HTTPS i produktion
- Validera all användarinput
- Använd Angular's inbyggda XSS-skydd
- Håll alla beroenden uppdaterade
- Kör regelbundna säkerhetsaudits

### Backend
- Använd HTTPS
- Implementera rate limiting
- Validera all input på serversidan
- Använd prepared statements för databasfrågor
- Håll API-nycklar säkra (använd miljövariabler)
- Implementera CORS korrekt

## Säkerhetsuppdateringar

Projektet följer dessa riktlinjer för säkerhetsuppdateringar:

1. **Kritiska sårbarheter**: Åtgärdas omedelbart
2. **Höga sårbarheter**: Åtgärdas inom 7 dagar
3. **Medelstora sårbarheter**: Åtgärdas inom 30 dagar
4. **Låga sårbarheter**: Åtgärdas i nästa planerade release

## Senaste säkerhetskontroll

- **Datum**: 2025-12-04
- **Resultat**: Inga sårbarheter hittade
- **npm audit**: 0 vulnerabilities
- **Kontrollerat av**: Automatisk säkerhetskontroll
