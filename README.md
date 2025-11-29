# Elbil med Husvagn

En webbapplikation för att hitta laddstationer som är lämpliga för elbilar med husvagn.

## Projektstruktur

Projektet består av två delar:

- **frontend/** - Angular 21 webbapplikation
- **backend/** - .NET 8 REST API

## Kom igång

### Förutsättningar

- Node.js (för frontend)
- .NET 8 SDK (för backend)

### Starta Backend

```bash
cd backend/ChargeEvWithCaravan.WebApi
dotnet run
```

Backend körs på `http://localhost:5171`

### Starta Frontend

```bash
cd frontend
npm install  # Första gången
npm start
```

Frontend körs på `http://localhost:4200`

## Teknologier

### Frontend
- Angular 21
- Angular Material
- Leaflet (kartor)
- TypeScript

### Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- InMemory Database (för utveckling)

## API Endpoints

- `GET /api/chargingpoints` - Hämta alla laddstationer
- `GET /api/chargingpoints/{id}` - Hämta en specifik laddstation

## Utveckling

### Frontend

Kör `ng serve` för en dev-server. Navigera till `http://localhost:4200/`. Applikationen laddas om automatiskt om du ändrar källfilerna.

### Backend

Kör `dotnet run` i backend-mappen. API:et startar på `http://localhost:5171`.
Swagger UI finns tillgänglig på `http://localhost:5171/swagger` i development-läge.

## Bygga för produktion

### Frontend
```bash
cd frontend
npm run build
```

Build-artefakter lagras i `frontend/dist/` katalogen.

### Backend
```bash
cd backend/ChargeEvWithCaravan.WebApi
dotnet publish -c Release
```

## Mer information

Se respektive README i `frontend/` och `backend/` mapparna för mer detaljerad information.

