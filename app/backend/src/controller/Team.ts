import { Request, Response, NextFunction } from "express"
import TeamService from "../service/Team";

export default class TeamController {
  constructor(private teamService: TeamService) {}

  list = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const teams =  await this.teamService.list();
      return res.status(200).json(teams); 
    } catch (e) {
      next(e)
    }
  }

  listById = async (req: Request,res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const team =  await this.teamService.listById(Number(id));
      return res.status(200).json(team); 
    } catch (e) {
      next(e)
    }
  }
}