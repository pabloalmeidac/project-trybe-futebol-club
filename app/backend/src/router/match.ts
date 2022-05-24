import { Router } from 'express';
import MatchController from '../controller/Match';
import MatchService from '../service/Match';
import MatchModel from '../model/Match';
import validateAuth from '../middleware/validateAuth';
import { UserModel } from '../model/User';
import { TeamModel } from '../model/Team';

const matchModel = new MatchModel();
const teamModel = new TeamModel();
const matchService = new MatchService(matchModel, teamModel);
const matchController = new MatchController(matchService);
const userModel = new UserModel();

const matchRouter = Router();

matchRouter.get('/', matchController.list);
matchRouter.post('/',validateAuth(userModel), matchController.create);
matchRouter.patch('/:id/finish', matchController.finish);
matchRouter.patch('/:id', matchController.update);


export default matchRouter;
