# Full Stack Project - Monday

A full-stack application with React frontend, Express backend, and PostgreSQL database.

## Project Structure

```
monday/
├── frontend/       # React + TypeScript frontend
├── backend/        # Node.js + Express backend
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

## Getting Started

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE monday_db;
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## API Documentation

Base URL: `http://localhost:5000/api`

### Endpoints

- `POST /api/todos` - Create a todo
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a todo by ID
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Axios
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **ORM**: Knex.js

## Project Features

This is a simple Todo application to practice full-stack development:
- Create, read, update, and delete todos
- Real-time frontend-backend integration
- TypeScript throughout the stack
- RESTful API design
