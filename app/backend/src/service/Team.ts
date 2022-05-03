import { TeamModel } from '../model/Team';

export default class TeamService {
  constructor(private teamModel: TeamModel) {}

  async list() {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  async listById(id: number) {
    const team = await this.teamModel.findById(id);
    return team;
  }
}