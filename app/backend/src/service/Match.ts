import { IMatchCreate } from '../interfaces';
import MatchModel from '../model/Match';

export default class MatchService {
  constructor(private matchModel: MatchModel) {}

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
      return undefined;
    }
    const matchCreated = await this.matchModel.create(match);
    return matchCreated;
  }

  async finish(id: number) { 
    await this.matchModel.finish(id);
  }
}