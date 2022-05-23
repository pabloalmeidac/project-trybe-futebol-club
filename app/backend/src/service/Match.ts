import MatchModel from '../model/Match';

export default class MatchService {
  constructor(private matchModel: MatchModel) {}

  async list() {
    const matches = await this.matchModel.findAll();
    return matches;
  }

  /* async listById(id: number) {
    const team = await this.teamModel.findById(id);
    return team;
  } */
}