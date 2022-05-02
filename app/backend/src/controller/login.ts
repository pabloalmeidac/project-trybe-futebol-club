import { Request, Response, NextFunction } from "express"
import { ILogin } from "../interfaces";
import AuthService from "../service/auth";

export default class LoginController {
  constructor(private authService: AuthService) {}

  login = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const user =  await this.authService.genToken(req.body as ILogin);
      if (!user) res.status(404).json({ message: 'user not found'});
      
      
      return res.status(200).json(user); 
    } catch (e) {
      next(e)
    }
  }
}