import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../model/User';
import AuthService from '../service/auth';

export default (userModel: UserModel) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ error: 'Token not found' });
  
    const auth = new AuthService(userModel);

    const decoded = auth.verifyToken(token);
    // console.log(decoded);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });
    
    req.body.user = decoded;
    return next();
  } catch (err) {
    next(err);
  }
};