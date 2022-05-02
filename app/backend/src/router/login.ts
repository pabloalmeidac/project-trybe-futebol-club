import { Router } from 'express';
import validateLogin from '../middleware/validateLogin';
import LoginController from '../controller/login';
import AuthService from '../service/auth';
import { UserModel } from '../model/User';
import loginSchema from '../schema/login';
import validateAuth from '../middleware/validateAuth';

const userModel = new UserModel();
const authService = new AuthService(userModel);
const loginController = new LoginController(authService);

const loginRouter = Router();

loginRouter.post('/', validateLogin(loginSchema), loginController.login);
loginRouter.get('/validate', validateAuth(userModel), loginController.validate);


export default loginRouter;