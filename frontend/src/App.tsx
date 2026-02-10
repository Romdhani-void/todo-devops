import { useState, useEffect } from 'react'
import axios from 'axios'

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  created_at: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_URL = 'http://localhost:5000/api'

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${API_URL}/todos`)
      setTodos(response.data)
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title cannot be empty')
      return
    }

    try {
      const response = await axios.post(`${API_URL}/todos`, {
        title: title.trim(),
        description: description.trim()
      })
      setTodos([...todos, response.data])
      setTitle('')
      setDescription('')
      setError('')
    } catch (err) {
      setError('Failed to add todo')
      console.error(err)
    }
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, {
        completed: !completed
      })
      setTodos(todos.map(todo => todo.id === id ? response.data : todo))
    } catch (err) {
      setError('Failed to update todo')
      console.error(err)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError('Failed to delete todo')
      console.error(err)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>📝 My Day - Todo App</h1>
        <p className="subtitle">Organize your tasks with our full-stack application</p>
      </header>

      {error && <div className="error">{error}</div>}

      <form onSubmit={addTodo} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input textarea"
            rows={2}
          />
        </div>
        <button type="submit" className="button button-primary">
          Add Todo
        </button>
      </form>

      <div className="todos-section">
        <h2>Your Todos ({todos.length})</h2>
        {loading && <p className="loading">Loading...</p>}
        {todos.length === 0 && !loading && <p className="empty">No todos yet. Add one above!</p>}

        <ul className="todos-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="checkbox"
                />
                <div className="todo-text">
                  <p className="todo-title">{todo.title}</p>
                  {todo.description && <p className="todo-description">{todo.description}</p>}
                  <small className="todo-date">
                    {new Date(todo.created_at).toLocaleDateString()}
                  </small>
                </div>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="button button-danger"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
