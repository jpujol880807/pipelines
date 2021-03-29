import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { logger } from '../utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const data = error.data;

    logger.error(`StatusCode : ${status}, Message : ${message}`);
    res.status(status).json({ message, data });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
