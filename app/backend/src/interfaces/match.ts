export interface IMatchCreate {
  id?: number,
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchUpdate {
  homeTeamGoals: number;
  awayTeamGoals: number;
}