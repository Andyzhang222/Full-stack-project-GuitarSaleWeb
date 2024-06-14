import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// 测试根路径
router.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// 测试数据库连接
router.get('/db-test', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 插入用户数据
router.post('/users', async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, password, email]
    );
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 获取所有用户数据
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