import { NextFunction, Request, Response } from 'express';
import { logger as l} from '@/index';
import chalk from 'chalk';

const logger = (req: Request, res: Response, next: NextFunction) => {
  let start = new Date().getTime();
  
  next();

  res.on('finish', () => {
    let end = new Date().getTime();
    l.info(chalk.magenta(`${req.method}`) + chalk.green(` ${req.originalUrl}`) + chalk.gray(` ${res.statusCode}`) + chalk.cyan(` ${end - start}ms`));
  });
};

export default logger;
