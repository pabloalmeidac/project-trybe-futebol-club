import { Model } from 'sequelize';
import db from '.';
import Attributes from './attributes';

class Users extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

Users.init(Attributes.users, 
{
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});


export default Users;