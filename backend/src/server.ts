import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AWS from 'aws-sdk';
import pool from './db';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', async (req: Request, res: Response) => {
  const { idToken, accessToken, refreshToken } = req.body;

  console.log('Received ID Token:', idToken);
  console.log('Received Access Token:', accessToken);
  console.log('Received Refresh Token:', refreshToken);

  try {
    // 验证Token
    const decodedIdToken = jwt.decode(idToken);
    console.log('Decoded ID Token:', decodedIdToken);

    // 在数据库中查找或创建用户
    // const { sub, email } = decodedIdToken;
    // const user = await findOrCreateUser(sub, email);

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});