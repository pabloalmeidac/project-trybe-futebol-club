import Teams from "../database/models/Teams";
import Matches from "../database/models/Matches";
import { ILearderboardEntity } from "../interfaces/leaderboard";

export default class LeaderboardModel {
  constructor() {}

  async findAll(): Promise<ILearderboardEntity[]> {
    const matches = await Matches.findAll(
      { 
        where: { inProgress: false }, 
        attributes: {exclude: ['inProgress', 'id', 'homeTeam', 'awayTeam']}, 
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
    });
    return matches as any as ILearderboardEntity[];
  }
}
