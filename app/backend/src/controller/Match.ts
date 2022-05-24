import { Request, Response, NextFunction } from "express"
import { IMatchCreate, IMatchUpdate } from'../interfaces';
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
      const {status, data} =  await this.matchService.create(req.body as IMatchCreate);
      
      return res.status(status).json(data);
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

  update = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      await this.matchService.update(parseInt(id), req.body as IMatchUpdate);
      return res.status(200).json({ message: "updated" });
    } catch (e) {
      next(e)
    }
  }
}