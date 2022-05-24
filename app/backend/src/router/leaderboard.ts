import { Router } from 'express';
import LeaderboardController from '../controller/Leaderboard';
import LeaderboardModel from '../model/Leaderboard';
import LeaderboardService from '../service/Leaderboard';

const leaderboardModel = new LeaderboardModel();
const leaderboardService = new LeaderboardService(leaderboardModel);
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.list);

export default leaderboardRouter;
