import { Request, Response, NextFunction } from "express"
import LeaderboardService from "../service/Leaderboard";
// import { IMatchCreate, IMatchUpdate } from'../interfaces';
// import MatchService from "../service/Match";

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  list = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const leaderboard =  await this.leaderboardService.list();
      return res.status(200).json(leaderboard); 
    } catch (e) {
      next(e)
    }
  }
}