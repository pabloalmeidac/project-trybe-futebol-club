import { Request, Response, NextFunction } from "express"
import LeaderboardAwayService from "../service/LeaderboardAway";
import LeaderboardService from "../service/Leaderboard";

export default class LeaderboardController {
  constructor(private leaderboardHomeService: LeaderboardService, private leaderboardAwayServuce: LeaderboardAwayService) {}

  list = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const home =  await this.leaderboardHomeService.list();
      const away =  await this.leaderboardAwayServuce.list();
      const leaderboard = this.leaderboardHomeService.classification(home, away);
      return res.status(200).json(leaderboard); 
    } catch (e) {
      next(e)
    }
  }

  listHome = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const leaderboard =  await this.leaderboardHomeService.list();
      return res.status(200).json(leaderboard); 
    } catch (e) {
      next(e)
    }
  }

  listAway = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const leaderboard =  await this.leaderboardAwayServuce.list();
      return res.status(200).json(leaderboard); 
    } catch (e) {
      next(e)
    }
  }
}