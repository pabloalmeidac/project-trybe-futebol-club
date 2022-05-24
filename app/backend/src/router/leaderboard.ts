import { Router } from 'express';
import LeaderboardAwayService from '../service/LeaderboardAway';
import LeaderboardController from '../controller/Leaderboard';
import LeaderboardModel from '../model/Leaderboard';
import LeaderboardService from '../service/Leaderboard';

const leaderboardModel = new LeaderboardModel();
const leaderboardService = new LeaderboardService(leaderboardModel);
const leaderboardAwayService = new LeaderboardAwayService(leaderboardModel)
const leaderboardController = new LeaderboardController(leaderboardService, leaderboardAwayService);

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardController.list);
leaderboardRouter.get('/home', leaderboardController.listHome);
leaderboardRouter.get('/away', leaderboardController.listAway);

export default leaderboardRouter;
