import { Request, Response, NextFunction } from "express"
import LeaderboardAwayService from "../service/LeaderboardAway";
import LeaderboardService from "../service/Leaderboard";
// import { IMatchCreate, IMatchUpdate } from'../interfaces';
// import MatchService from "../service/Match";

export default class LeaderboardController {
  constructor(private leaderboardHomeService: LeaderboardService, private leaderboardAwayServuce: LeaderboardAwayService) {}

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