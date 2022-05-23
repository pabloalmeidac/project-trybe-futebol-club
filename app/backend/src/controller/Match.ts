import { Request, Response, NextFunction } from "express"
import { IMatchCreate } from'../interfaces';
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

  create = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const match =  await this.matchService.create(req.body as IMatchCreate);
      return res.status(201).json(match); 
    } catch (e) {
      next(e)
    }
  }
}