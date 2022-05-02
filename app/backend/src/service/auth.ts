import  * as jwt from 'jsonwebtoken';
import { UserModel } from '../model/User';
import { ILogin } from '../interfaces';
import { readFileSync } from 'fs';
import { IUser } from '../interfaces/login';


export default class AuthService {
  private _SECRET: string;
  private _jwtConfig;

  constructor(private userModel: UserModel) {
    this._SECRET = readFileSync('./jwt.evaluation.key', 'utf-8');
    this._jwtConfig = { expiresIn: `7`, algorithm: `HS256` };
  }

  async genToken(payload: ILogin) {
    const user = await this.userModel.findUser(payload.email)
    
    if (!user || user.password !== payload.password) return null;
    
    let { id, username, role, email } = user;

    const userData: IUser = { id, username, role, email };
    const token = jwt.sign(userData, this._SECRET , this._jwtConfig as jwt.SignOptions);

    return { user: userData, token };
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this._SECRET);
    } catch (error) {
      return false;
    }
    return true;
  }
}