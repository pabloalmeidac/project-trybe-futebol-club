import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import * as bcrypt from 'bcryptjs';
import { UserModel } from '../model/User';
import { ILogin } from '../interfaces';
import { IUser } from '../interfaces/login';

export default class AuthService {
  private _SECRET: string;

  private _jwtConfig;

  constructor(private userModel: UserModel) {
    this._SECRET = readFileSync('./jwt.evaluation.key', 'utf-8');
    this._jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  }

  async genToken(payload: ILogin) {
    const user = await this.userModel.findUser(payload.email);

    if (!user) return null;

    const passwordAuthenticated = bcrypt.compareSync(payload.password, user.password);
    if (!passwordAuthenticated) return null;

    const { id, username, role, email } = user;

    const data: IUser = { id, username, role, email };

    const token = jwt.sign(data, this._SECRET, this._jwtConfig as jwt.SignOptions);

    return { user: data, token };
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
