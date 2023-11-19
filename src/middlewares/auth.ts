import { NextFunction, Request, Response } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['api-key'];

  if (!apiKey || apiKey !== (process.env.API_KEY || '')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing API key.'
    });
    return;
  }

  next();
};

export default auth;