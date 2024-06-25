import express from 'express';
import protectedRoute from './routes/protectedRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

// 使用受保护的路由
app.use('/api', protectedRoute);

export default app;