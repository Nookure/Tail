import Tebex from './tebex/tebex';
// ✨ Import libraries
import express from 'express';
import dotenv from 'dotenv';
import Logger from '@ptkdev/logger';
import loggerMiddleware from '@/middlewares/logger';
import indexRouter from '@/routes/index';
import tebexRouter from '@/routes/tebex';
import auth from './middlewares/auth';
import schedule from 'node-schedule';
import checkIfPayed from './jobs/checkIfPayed';

// ✨ Load environment variables from .env file
dotenv.config();

// ✨ App exports variables
export const app = express();
export const logger = new Logger({
  debug: process.env.TAIL_DEBUG === 'true',
});
export const tebex = new Tebex({
  username: process.env.TEBEX_USERNAME || '',
  password: process.env.TEBEX_PASSWORD || '',
});

// ✨ Import middlewares
app.use(loggerMiddleware);
app.use(express.json());
app.use('/tebex', auth);

// ✨ Import routes
app.use('/', indexRouter);
app.use('/tebex', tebexRouter);

// ✨ Error handler
app.use((err: any, req: express.Request, res: express.Response) => {
  logger.error(err.message);
  logger.error(err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// ✨ Start jobs
logger.debug('Starting jobs...');
schedule.scheduleJob('*/1 * * * *', async () => {
  checkIfPayed();
});

// ✨ Start server
app.listen(process.env.PORT || 2222, () => {
  logger.info(`Server started on port ${process.env.PORT || 2222}`);
  logger.docs('Press CTRL+C to stop server');
});
