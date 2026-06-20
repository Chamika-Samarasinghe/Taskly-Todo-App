# Taskly - Full Stack TODO App

A clean, full stack TODO application built with **React**, **Node.js/Express**, and **MongoDB**.

## Project Structure

```
Taskly-Todo-App/
├── client/          # React frontend (Vite)
├── server/          # Express backend
└── README.md        # This file
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally **or** a MongoDB Atlas connection string

### 1. Clone & install

```bash
git clone <your-repo-url>
cd Taskly Todo App

# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install
```


### 2. Run

Open two terminals:

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Visit **http://localhost:5173**

## Features

- View, create, edit, and delete TODO items
- Toggle done/undone with a checkbox
- Completed tasks shown with strikethrough and green tint
- Filter by All / Active / Done
- Optimistic UI updates (no waiting for the server)
- Form validation with helpful error messages
- Loading skeletons and error banners
- Fully responsive layout

## Tech Stack

| Layer    | Technology             |
|----------|------------------------|
| Frontend | React 18, Vite, CSS Modules |
| Backend  | Node.js, Express 4     |
| Database | MongoDB + Mongoose     |
| HTTP     | Axios                  |
