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
      if(!match) {
        return res.status(401).json({ message: "It is not possible to create a match with two equal teams" })
      }
      return res.status(201).json(match); 
    } catch (e) {
      next(e)
    }
  }

  finish = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.matchService.finish(parseInt(id));
      return res.status(200).json({ message: "Finished" }); 
    } catch (e) {
      next(e)
    }
  }
}