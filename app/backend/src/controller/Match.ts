import { Request, Response, NextFunction } from "express"
import MatchService from "../service/Match";

export default class MatchController {
  constructor(private matchService: MatchService) {}

  list = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const matches =  await this.matchService.list();
      return res.status(200).json(matches); 
    } catch (e) {
      next(e)
    }
  }

  /* listById = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const team =  await this.matchService.listById(Number(id));
      return res.status(200).json(team); 
    } catch (e) {
      next(e)
    }
  } */
}