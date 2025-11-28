# Project Context: Elbil med Husvagn

## Overview
"Elbil med Husvagn" (Electric Car with Caravan) is a web application designed to assist electric vehicle owners who travel with caravans. The primary feature is likely finding suitable charging stations and planning routes that accommodate the specific needs of towing a caravan (e.g., drive-through charging, extra space).

## Architecture
The project is currently a frontend-only application (or frontend-focused) built with **Angular**.

### Directory Structure
- `frontend/`: The main Angular application directory.
  - `src/app/`: Application source code.
  - `angular.json`: Angular CLI configuration.
  - `package.json`: Dependencies and scripts.

## Key Features (Inferred)
- **Interactive Map**: Uses Leaflet to display charging stations.
- **Station Filtering**: Likely allows filtering by capacity, connector type, and accessibility for caravans.
- **User Interface**: Built with Angular Material for a responsive and modern look.

## Development Setup
- **Package Manager**: npm
- **Build Tool**: Angular CLI
- **Run Dev Server**: `npm start` or `ng serve` (inside `frontend/` directory)
- **Tests**: `npm test` or `ng test`

## Recent Changes
- Project structure refactored to move frontend code to `frontend/` subdirectory.
- Map pins updated to be transparent.
- Capacity type changed to integer.
- Application renamed to "Elbil med Husvagn".
