export interface ILearderboard {
  name: number | string,
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface ILearderboardEntity {
  homeTeamGoals: number;
  awayTeamGoals: number;
  teamHome: { teamName: string}
  teamAway: { teamName: string}
}

export interface ITeams {
  id: number,
  teamName: string;
}