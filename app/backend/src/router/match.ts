import { Router } from 'express';
import MatchController from '../controller/Match';
import MatchService from '../service/Match';
import MatchModel from '../model/Match';

const matchModel = new MatchModel();
const matchService = new MatchService(matchModel);
const matchController = new MatchController(matchService);

const matchRouter = Router();

matchRouter.get('/', matchController.list);

export default matchRouter;
