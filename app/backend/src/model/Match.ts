import { IMatchCreate, IMatchUpdate } from '../interfaces';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchModel {
  constructor() {}

  async findAll() {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async findInProgress(inProgress: boolean) {
    const matches = await Matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
  async create(match: IMatchCreate) {
    const matchCreated = await Matches.create(match)
    return matchCreated;
  }

  async finish(id: number) {
    const finished = await Matches.update(
      { inProgress: false },
      { where: { id }},
    )
    return finished;
  }

  async update(id: number, data: IMatchUpdate) {
    const {awayTeamGoals, homeTeamGoals} = data;
    const updated = await Matches.update(
      { awayTeamGoals, homeTeamGoals },
      { where: { id }},
    )
    return updated;
  }
}
