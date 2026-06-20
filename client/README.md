# Taskly — Frontend (React + Vite)

React 18 powered by Vite with a warm editorial design.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run

```bash
npm run dev
```

Opens at **http://localhost:5173**.

### 3. Build for production

```bash
npm run build   # outputs to dist/
npm run preview # preview the build locally
```

## Project structure

```
src/
├── components/
│   ├── TodoForm.jsx        # Add-task form with validation
│   ├── TodoForm.module.css
│   ├── TodoItem.jsx        # Single todo row (view + inline edit)
│   ├── TodoItem.module.css
│   ├── ErrorBanner.jsx     # Dismissable error notification
│   └── ErrorBanner.module.css
├── hooks/
│   └── useTodos.js         # State management + API calls with optimistic updates
├── services/
│   └── api.js              # Axios instance + todoService helpers
├── App.jsx                 # Root component, filter tabs, layout
├── App.module.css
├── index.css               # CSS variables, global resets, keyframes
└── main.jsx                # React entry point
```

## Key design decisions

- **Optimistic updates** — UI reflects changes instantly while the API call runs in the background. On failure, state is automatically reverted.
- **CSS Modules** — Scoped styles per component; no global class name collisions.
- **Custom hook** (`useTodos`) — Separates all server state logic from UI components.
- **Vite proxy** — Avoids CORS issues in development without changing the API base URL.

## Assumptions & Limitations

- No routing - single page app, no URL based navigation.
- No authentication - all todos are shared (matches backend).
- Internet connection required for Google Fonts (DM Serif Display, DM Sans). Falls back to Georgia / system-ui without them.
