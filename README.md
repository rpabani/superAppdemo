# Super App

A simple React web app with sidebar navigation for managing Customers, Accounting, and Planning data.

## Features

- **Customers** - Customer management with table view and forms
- **Accounting** - Transaction tracking with CSV import, categorization, and summaries
- **Planning** - Kanban board for task management with drag-and-drop

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router DOM
- @dnd-kit for drag-and-drop

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/yourusername/super-app.git
cd super-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (Customers, Accounting, Planning)
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── constants/      # Constants and configuration
├── App.jsx         # Main app with routing
└── main.jsx        # Entry point

data/               # JSON data files
```

## Data Storage

Data is stored in JSON files in the `data/` directory:

- `data/customers.json`
- `data/accounting.json`
- `data/planning.json`

## License

MIT License - see [LICENSE](LICENSE) for details.
