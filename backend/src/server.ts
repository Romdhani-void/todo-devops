import express from 'express'
import cors from 'cors'
import { config } from './config.js'
import { initializeDatabase } from './database/migrations/init.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize database
console.log('Initializing database...')
try {
  await initializeDatabase()
  console.log('✓ Database ready')
} catch (error) {
  console.error('✗ Failed to initialize database:', error)
  console.error(
    'Make sure PostgreSQL is running and your .env file is configured correctly.'
  )
  process.exit(1)
}

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.use('/api/todos', todoRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(config.port, () => {
  console.log(`✓ Server running on http://localhost:${config.port}`)
  console.log(`✓ Health check: http://localhost:${config.port}/health`)
  console.log(`✓ API: http://localhost:${config.port}/api/todos`)
})
