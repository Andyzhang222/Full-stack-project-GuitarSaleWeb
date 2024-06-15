import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db';

const router = Router();

// Test root route
router.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Test database connection
router.get('/db-test', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Register new user
router.post('/users', async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  console.log('Received request:', { username, password, email });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );
    console.log('Database query result:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    const error = err as Error;
    console.error('Error processing request:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
});

// Get all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;