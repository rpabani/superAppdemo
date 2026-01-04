# Web App Plan: Sidebar + Main Body Layout

## Overview
Create a simple React web app with Vite and Tailwind CSS featuring a sidebar navigation with three sections: Customers, Accounting, and Planning.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Data**: Local JSON/CSV files (no database)
- **Auth**: None (local only)

## Project Structure
```
superApp/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   └── Sidebar.jsx
│   └── pages/
│       ├── Customers.jsx
│       ├── Accounting.jsx
│       └── Planning.jsx
└── data/
    ├── customers.json
    ├── accounting.json
    └── planning.json
```

## Implementation Steps

### Step 1: Initialize Project
- Run `npm create vite@latest . -- --template react`
- Install dependencies: `npm install`
- Install Tailwind: `npm install -D tailwindcss postcss autoprefixer`
- Install React Router: `npm install react-router-dom`

### Step 2: Configure Tailwind
- Initialize Tailwind config
- Update `tailwind.config.js` with content paths
- Add Tailwind directives to `index.css`

### Step 3: Create Layout Components
- **Sidebar.jsx**: Fixed left sidebar with three navigation buttons
- **App.jsx**: Main layout wrapper with sidebar + content area

### Step 4: Create Page Components
- **Customers.jsx**: Placeholder page for customer data
- **Accounting.jsx**: Placeholder page for accounting data
- **Planning.jsx**: Placeholder page for planning data

### Step 5: Set Up Routing
- Configure React Router in App.jsx
- Link sidebar buttons to routes: `/customers`, `/accounting`, `/planning`

### Step 6: Create Empty Data Files
- Create `data/` folder with empty JSON files for future use

## Layout Design
```
┌─────────────┬────────────────────────────────┐
│             │                                │
│  Sidebar    │         Main Content           │
│  (fixed)    │         (scrollable)           │
│             │                                │
│ [Customers] │                                │
│ [Accounting]│                                │
│ [Planning]  │                                │
│             │                                │
└─────────────┴────────────────────────────────┘
```

## Files to Create/Modify
1. `package.json` - Project dependencies
2. `vite.config.js` - Vite configuration
3. `tailwind.config.js` - Tailwind configuration
4. `postcss.config.js` - PostCSS configuration
5. `index.html` - HTML entry point
6. `src/main.jsx` - React entry point
7. `src/App.jsx` - Main app with routing
8. `src/index.css` - Tailwind imports
9. `src/components/Sidebar.jsx` - Sidebar navigation
10. `src/pages/Customers.jsx` - Customers page
11. `src/pages/Accounting.jsx` - Accounting page
12. `src/pages/Planning.jsx` - Planning page
13. `data/*.json` - Empty data files
