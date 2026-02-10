import express from 'express'
import type { Request, Response } from 'express'
import * as todoModel from '../models/todoModel.js'

const router = express.Router()

// GET all todos
router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await todoModel.getAllTodos()
    res.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})

// GET todo by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const todo = await todoModel.getTodoById(parseInt(id))

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' })
      return
    }

    res.json(todo)
  } catch (error) {
    console.error('Error fetching todo:', error)
    res.status(500).json({ error: 'Failed to fetch todo' })
  }
})

// POST create new todo
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body

    if (!title || typeof title !== 'string') {
      res.status(400).json({ error: 'Title is required and must be a string' })
      return
    }

    const todo = await todoModel.createTodo(title, description)
    res.status(201).json(todo)
  } catch (error) {
    console.error('Error creating todo:', error)
    res.status(500).json({ error: 'Failed to create todo' })
  }
})

// PUT update todo
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, completed } = req.body

    const todo = await todoModel.updateTodo(parseInt(id), {
      title,
      description,
      completed,
    })

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' })
      return
    }

    res.json(todo)
  } catch (error) {
    console.error('Error updating todo:', error)
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

// DELETE todo
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleted = await todoModel.deleteTodo(parseInt(id))

    if (!deleted) {
      res.status(404).json({ error: 'Todo not found' })
      return
    }

    res.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Error deleting todo:', error)
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

export default router
