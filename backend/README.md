# Monday Backend

Express + TypeScript + PostgreSQL Todo API

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your PostgreSQL credentials:

```bash
cp .env.example .env
```

### 3. Create Database

```sql
CREATE DATABASE monday_db;
```

### 4. Run Migrations

```bash
npm run db:migrate
```

Or the database will be automatically initialized on first server start.

### 5. Start Development Server

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

## API Endpoints

All endpoints are prefixed with `/api/todos`

### GET /api/todos
Fetch all todos.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Learn TypeScript",
    "description": "Master TypeScript for better code quality",
    "completed": false,
    "created_at": "2024-02-09T10:00:00.000Z",
    "updated_at": "2024-02-09T10:00:00.000Z"
  }
]
```

### GET /api/todos/:id
Fetch a specific todo by ID.

**Response:** Single todo object

### POST /api/todos
Create a new todo.

**Request Body:**
```json
{
  "title": "Learn React",
  "description": "Master React hooks and components"
}
```

**Response:** Created todo object with ID

### PUT /api/todos/:id
Update a todo (title, description, or completed status).

**Request Body:**
```json
{
  "completed": true
}
```

**Response:** Updated todo object

### DELETE /api/todos/:id
Delete a todo.

**Response:**
```json
{
  "message": "Todo deleted successfully"
}
```

## Database Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USER` - PostgreSQL user
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - PostgreSQL database name
