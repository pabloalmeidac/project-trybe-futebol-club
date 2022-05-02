import { IUser } from '../interfaces/login';
import Users from '../database/models/Users';

export class UserModel {
  constructor() {}

  async findUser(email: string) {
    const user = await Users.findOne({ where: { email } });
    
    return user;
  }
}