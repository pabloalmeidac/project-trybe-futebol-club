import Teams from '../database/models/Teams';

export class TeamModel {
  constructor() {}

  async findAll() {
    const teams = await Teams.findAll();
    return teams;
  }

  async findById(id: number) {
    const team = await Teams.findOne({ where: { id }});
    return team;
  }
}