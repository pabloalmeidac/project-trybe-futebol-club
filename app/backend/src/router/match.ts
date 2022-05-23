import { Router } from 'express';
import MatchController from '../controller/Match';
import MatchService from '../service/Match';
import MatchModel from '../model/Match';
import validateAuth from '../middleware/validateAuth';
import { UserModel } from '../model/User';

const matchModel = new MatchModel();
const matchService = new MatchService(matchModel);
const matchController = new MatchController(matchService);
const userModel = new UserModel();

const matchRouter = Router();

matchRouter.get('/', matchController.list);
matchRouter.post('/',validateAuth(userModel), matchController.create);
matchRouter.patch('/:id/finish', matchController.finish);

export default matchRouter;
