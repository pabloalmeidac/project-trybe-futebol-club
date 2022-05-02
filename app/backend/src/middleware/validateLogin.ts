import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { ILogin } from '../interfaces';

export default (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = schema.validate(req.body as ILogin);
  
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(Number(code)).json({ message });
    }
  
    return next();
  } catch (err) {
    next(err);
  }
};