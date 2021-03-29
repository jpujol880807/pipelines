import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

const validationMiddleware = (type: any, value: string | 'body' | 'query' | 'params' = 'body', skipMissingProperties = false): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = 'Validation errors';
        const errorData = errors.map((error: ValidationError) => ({property: error.property, message: Object.values(error.constraints)}));
        next(new HttpException(400, message, errorData));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
