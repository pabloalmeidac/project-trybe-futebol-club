import { Router } from 'express';
import TeamController from '../controller/Team';
import TeamService from '../service/Team';
import { TeamModel } from '../model/Team';

const teamModel = new TeamModel();
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

const teamRouter = Router();

teamRouter.get('/', teamController.list);
teamRouter.get('/:id', teamController.listById);

export default teamRouter;
