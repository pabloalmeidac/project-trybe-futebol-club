import { TeamModel } from '../model/Team';
import { IMatchCreate, IMatchUpdate } from '../interfaces';
import MatchModel from '../model/Match';

export default class MatchService {
  constructor(private matchModel: MatchModel, private teamModel: TeamModel) {}

  async list(inProgress: any) {
    let matches;
    
    if ( inProgress === "true" || inProgress === "false") {
      const convertInprogress = inProgress == 'true';
      matches = await this.matchModel.findInProgress(convertInprogress);
    } else {
      matches = await this.matchModel.findAll();
    }
    return matches;
  }

  async create(match: IMatchCreate) {
    if (match.homeTeam === match.awayTeam) {
      const response = 
      { 
        data: { message: "It is not possible to create a match with two equal teams" }, 
        status: 401
      }
      return response;
    }

    const searchHomeTeam = await this.teamModel.findById(match.homeTeam);
    const searchAwayTeam = await this.teamModel.findById(match.awayTeam);

    if(!searchHomeTeam || !searchAwayTeam) {
      const response = 
      {
        data: { message: "There is no team with such id!"}, 
        status: 404
      }
      return response;
    }
    
    const matchCreated = await this.matchModel.create(match);
    return { status: 201, data: matchCreated };
  }

  async finish(id: number) { 
    await this.matchModel.finish(id);
  }

  async update(id: number, data: IMatchUpdate) { 
    await this.matchModel.update(id, data);
  }
}