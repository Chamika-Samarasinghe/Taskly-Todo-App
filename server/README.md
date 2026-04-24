# Taskly — Backend (Express)

Node.js + Express REST API backed by MongoDB.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables


Edit `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
CLIENT_URL=http://localhost:5173
```

**MongoDB Atlas:** Replace `MONGODB_URI` with your Atlas connection string, e.g.
`mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/todo-app`

### 3. Run

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server starts on `http://localhost:5000`.

## API Reference

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/todos            | Get all todos            |
| POST   | /api/todos            | Create a todo            |
| PUT    | /api/todos/:id        | Update title/description |
| PATCH  | /api/todos/:id/done   | Toggle done status       |
| DELETE | /api/todos/:id        | Delete a todo            |

### Example - Create a TODO

```http
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

### Response shape

```json
{
  "_id": "665abc123...",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "done": false,
  "createdAt": "2024-06-01T10:00:00.000Z",
  "updatedAt": "2024-06-01T10:00:00.000Z"
}
```

## Architecture

```
src/
├── config/db.js       # Mongoose connection
├── models/Todo.js     # Mongoose schema
├── routes/todos.js    # Route handlers
└── index.js           # Express app entry point
```

## Error handling

All routes use a centralised error handler. Validation errors return `400`, missing resources return `404`, and unexpected failures return `500` - all with a JSON `{ "error": "..." }` body.

## Assumptions & Limitations

- No authentication - all todos are global (single user app).
- `description` field is optional and defaults to an empty string.
- Title max length: 200 characters. Description max: 1 000 characters.
- Todos are returned sorted by `createdAt` descending (newest first).
