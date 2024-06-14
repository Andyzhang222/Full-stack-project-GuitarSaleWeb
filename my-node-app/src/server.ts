import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import indexRouter from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // 确保使用端口 3000

// 使用 body-parser 中间件来解析 JSON 请求体
app.use(bodyParser.json());

// 使用路由
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;