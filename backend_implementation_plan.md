# Backend Implementation Plan

This plan outlines the steps to introduce a .NET REST API backend with Entity Framework (EF) to the project. The goal is to move the charging point data source from the frontend to the backend.

## Phase 1: Project Initialization ✅ COMPLETED

1.  **Create Backend Directory** ✅
    - Create a `backend` directory in the root of the repository (sibling to `frontend`).

2.  **Create Solution** ✅
    - Create a .NET Solution file (`.sln`) in the root to manage both backend and potentially frontend build scripts later.

3.  **Scaffold Web API** ✅
    - Create a new ASP.NET Core Web API project named `ChargeEvWithCaravan.WebApi` inside the `backend` directory.
    - Use .NET 8.

## Phase 2: Data & Entity Framework Setup ✅ COMPLETED

4.  **Install EF Core Packages** ✅
    - Install `Microsoft.EntityFrameworkCore`, `Microsoft.EntityFrameworkCore.Design`, and a provider (e.g., `Microsoft.EntityFrameworkCore.InMemory` for initial dev or `Microsoft.EntityFrameworkCore.SqlServer`/`Sqlite` if a real DB is preferred immediately). *Decision: Start with InMemory or just a hardcoded list in a Service as requested, but setup the DbContext structure.*

5.  **Define Models** ✅
    - Create a `ChargingPoint` model class in the backend matching the structure needed by the frontend (Latitude, Longitude, Name, ConnectorType, etc.).

6.  **Setup DbContext** ✅
    - Create `AppDbContext` inheriting from `DbContext`.
    - Add `DbSet<ChargingPoint> ChargingPoints`.

7.  **Seed Data** ✅
    - In `OnModelCreating` or a seeding service, populate the `ChargingPoints` with the currently hardcoded data from the frontend.

## Phase 3: API Development ✅ COMPLETED

8.  **Create Controller** ✅
    - Create `ChargingPointsController`.
    - Implement `GET /api/chargingpoints` to return the list of charging points.

9.  **Configure CORS** ✅
    - Allow requests from the Angular frontend (usually `http://localhost:4200`).

10. **Register Services** ✅
    - Register DbContext and other services in `Program.cs`.

## Phase 4: Frontend Integration ✅ COMPLETED

11. **Create Data Service** ✅
    - Generate an Angular service (e.g., `ChargingStationService`) to fetch data from the backend.
    - Define TypeScript interfaces matching the backend models.

12. **Update Map Component** ✅
    - Replace the hardcoded array in `map.component.ts` with a call to the `ChargingStationService`.

13. **Environment Configuration** ✅
    - Add the backend API URL to `environment.ts` (and `environment.development.ts`).

## Phase 5: Verification ✅ COMPLETED

14. **Run Backend** ✅
    - Start the .NET API.
15. **Run Frontend** ✅
    - Start the Angular app.
16. **Verify** ✅
    - Ensure map pins load correctly from the API.

## Next Steps (Future)
- Connect to a real database (SQL Server/PostgreSQL).
- Add CRUD operations.

