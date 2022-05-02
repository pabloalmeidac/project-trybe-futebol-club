
export default interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

export interface IUserEntity {
  dataValues: IUser;
}