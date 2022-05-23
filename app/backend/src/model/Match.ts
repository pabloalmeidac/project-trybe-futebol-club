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
}
