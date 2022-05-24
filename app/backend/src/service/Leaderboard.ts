import { TeamModel } from "../model/Team";
import { ILearderboard} from "../interfaces";
import LeaderboardModel from "../model/Leaderboard";
import { ILearderboardEntity} from "../interfaces/leaderboard";

export default class LeaderboardService {
  constructor(private leaderboardModel: LeaderboardModel) {}

  async list() {
    const response = await this.leaderboardModel.findAll()
    const matches = this.dataFormat(response)
    const matchesOrdered = this.orderMatches(matches);
    
    return matchesOrdered;
  }

  orderMatches(matches: ILearderboard[]) {
    matches.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories 
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor 
      || b.goalsOwn - a.goalsOwn);
    return matches;
  }

  dataFormat(matches: ILearderboardEntity[]) {
    let matchesArray: Array<ILearderboard> = [];
  
    matches.map((m) => {
      const index = matchesArray.findIndex((match) => match.name === m.teamHome.teamName);
      const { homeTeamGoals, awayTeamGoals, teamHome } = m;
      const points = this.calcPoints(homeTeamGoals, awayTeamGoals);
      const result = this.calcResultMatch(homeTeamGoals, awayTeamGoals);
      const {v, l, d} = result;

      if(index=== -1) {
        matchesArray.push(
          {
            name: teamHome.teamName, 
            totalPoints: points, 
            totalGames: 1,
            totalVictories: v,
            totalLosses: l,
            totalDraws: d,
            goalsFavor: homeTeamGoals,
            goalsOwn: awayTeamGoals,
            goalsBalance: homeTeamGoals - awayTeamGoals,
            efficiency: (points/(1* 3)*100),
          })
      } else {
        matchesArray[index].totalPoints+= points;
        matchesArray[index].totalGames+= 1;
        matchesArray[index].totalVictories+= v;
        matchesArray[index].totalLosses+= l;
        matchesArray[index].totalDraws+= d;
        matchesArray[index].goalsFavor+= homeTeamGoals;
        matchesArray[index].goalsOwn+= awayTeamGoals;
        matchesArray[index].goalsBalance+= homeTeamGoals - awayTeamGoals;
        const j = matchesArray[index].totalGames;
        const p = matchesArray[index].totalPoints;
        const efficiency = Number(( p / (j* 3) * 100).toFixed(2));
        matchesArray[index].efficiency = efficiency;
      }
    })
    return matchesArray;
  }

  calcPoints(goalsFavor: number, goalsOwn: number) {
    let points: number = 0;
    if(goalsFavor > goalsOwn) return points = 3;
    if(goalsFavor === goalsOwn) return points = 1;
    return points;
  }

  calcResultMatch(goalsFavor: number, goalsOwn: number) {
    const result = { v: 0, l: 0, d: 0}
    
    if(goalsFavor > goalsOwn) {
      result.v = 1;
      return result;
    }
    
    if(goalsFavor === goalsOwn) {
       result.d = 1;
       return result;
    }
    result.l = 1
    return result;
  }
}