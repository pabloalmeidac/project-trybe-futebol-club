import { Request, Response, NextFunction } from "express"
import MatchService from "../service/Match";

export default class MatchController {
  constructor(private matchService: MatchService) {}

  list = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;

      const matches =  await this.matchService.list(inProgress);
      return res.status(200).json(matches); 
    } catch (e) {
      next(e)
    }
  }
}