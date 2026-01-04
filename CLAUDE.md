# Super App

A simple React web app with sidebar navigation for managing Customers, Accounting, and Planning data.

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router DOM

## Commands
- `npm run dev` - Start dev server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure
- `src/components/` - Reusable components (Sidebar)
- `src/pages/` - Page components (Customers, Accounting, Planning)
- `data/` - JSON data files for each section

## Routes
- `/customers` - Customer management
- `/accounting` - Accounting data
- `/planning` - Planning tools

## Data Storage
No database. Data is stored in JSON files in the `data/` directory:
- `data/customers.json`
- `data/accounting.json`
- `data/planning.json`
