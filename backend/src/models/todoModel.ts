import { query } from '../database.js'

export interface Todo {
  id: number
  title: string
  description?: string
  completed: boolean
  created_at: string
  updated_at: string
}

export const getAllTodos = async (): Promise<Todo[]> => {
  const result = await query('SELECT * FROM todos ORDER BY created_at DESC')
  return result.rows
}

export const getTodoById = async (id: number): Promise<Todo | null> => {
  const result = await query('SELECT * FROM todos WHERE id = $1', [id])
  return result.rows[0] || null
}

export const createTodo = async (
  title: string,
  description?: string
): Promise<Todo> => {
  const result = await query(
    'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
    [title, description || null]
  )
  return result.rows[0]
}

export const updateTodo = async (
  id: number,
  updates: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>
): Promise<Todo | null> => {
  const fields = []
  const values = []
  let paramCount = 1

  if (updates.title !== undefined) {
    fields.push(`title = $${paramCount++}`)
    values.push(updates.title)
  }
  if (updates.description !== undefined) {
    fields.push(`description = $${paramCount++}`)
    values.push(updates.description)
  }
  if (updates.completed !== undefined) {
    fields.push(`completed = $${paramCount++}`)
    values.push(updates.completed)
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`)

  if (fields.length === 1) {
    return getTodoById(id)
  }

  values.push(id)

  const result = await query(
    `UPDATE todos SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  )

  return result.rows[0] || null
}

export const deleteTodo = async (id: number): Promise<boolean> => {
  const result = await query('DELETE FROM todos WHERE id = $1', [id])
  return (result.rowCount ?? 0) > 0
}
