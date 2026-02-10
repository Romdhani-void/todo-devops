import pkg from 'pg'
import { config } from './config.js'

const { Pool } = pkg

const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
})

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err)
})

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params)
}

export const getClient = async () => {
  return pool.connect()
}

export default pool
