import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const router = express.Router();

// 定义 /tokens 路由
router.post('/', [
  check('accessToken', 'Access Token is required').not().isEmpty(),
  check('refreshToken', 'Refresh Token is required').not().isEmpty(),
  check('idToken', 'ID Token is required').not().isEmpty()
], (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { accessToken, refreshToken, idToken } = req.body;

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

// 定义 /login 路由
router.post('/login', [
  check('accessToken', 'Access Token is required').not().isEmpty(),
  check('refreshToken', 'Refresh Token is required').not().isEmpty(),
  check('idToken', 'ID Token is required').not().isEmpty()
], (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { accessToken, refreshToken, idToken } = req.body;

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

export default router;