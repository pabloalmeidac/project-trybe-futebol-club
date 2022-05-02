import  * as jwt from 'jsonwebtoken';
import { UserModel } from '../model/User';
import { ILogin } from '../interfaces';
import { readFileSync } from 'fs';
import { IUser } from '../interfaces/login';
import * as bcrypt  from 'bcrypt';


export default class AuthService {
  private _SECRET: string;
  private _jwtConfig;

  constructor(private userModel: UserModel) {
    this._SECRET = readFileSync('./jwt.evaluation.key', 'utf-8');
    this._jwtConfig = { expiresIn: `7d`, algorithm: `HS256` };
  }

  async genToken(payload: ILogin) {
    const user = await this.userModel.findUser(payload.email)
    
    if (!user || !(await bcrypt.compare(user.password, payload.password))) return null;

    let { id, username, role, email } = user;

    const userData: IUser = { id, username, role, email };
    const token = jwt.sign(userData, this._SECRET , this._jwtConfig as jwt.SignOptions);

    return { user: userData, token };
  }

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this._SECRET);
      return decoded;
    } catch (error: any) {
      if (error.name.includes('Token')) {
        return false;
      }
    }
  }
}