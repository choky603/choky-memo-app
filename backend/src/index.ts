import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app: express.Express = express();

app.use(bodyParser.json()); // 요청의 본문을 해석하고 파싱

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = 3000;
const STATUS_CODE_OK = 200;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Hello Typescript node server!!!');
    res.statusCode = STATUS_CODE_OK;
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
