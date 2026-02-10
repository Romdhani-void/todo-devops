# Monday Frontend

React + TypeScript + Vite Todo App

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

The app will automatically proxy API calls to `http://localhost:5000/api`

### 3. Build for Production

```bash
npm run build
```

Output in `dist/` folder

## Project Structure

```
src/
├── App.tsx          # Main component with todo logic
├── App.css          # Styling
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Features

- ✅ Create todos with title and description
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Real-time updates from backend
- ✅ Responsive design
- ✅ Error handling

## Technologies

- React 18
- TypeScript
- Vite (fast build tool)
- Axios (HTTP client)
- CSS3

## API Integration

The app communicates with the backend at `http://localhost:5000/api`.

**Endpoints used:**
- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Prerequisites

- Backend must be running on `http://localhost:5000`
- Node.js v16 or higher
