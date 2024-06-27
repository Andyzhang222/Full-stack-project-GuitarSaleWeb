import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import tokenRoutes from './routes/tokenRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// 使用 /api/tokens 路由
app.use('/api/tokens', tokenRoutes);
// 使用 /login 路由
app.use('/login', tokenRoutes);

// Connect Database
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});