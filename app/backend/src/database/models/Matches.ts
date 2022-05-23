import { Model } from 'sequelize';
import db from '.';
import Attributes from './attributes';
import Teams from './Teams';

class Matches extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Matches.init(Attributes.matches, 
{
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: Attributes.matches.homeTeam, 
  as: 'teamHome',
});

Matches.belongsTo(Teams, {
  foreignKey: Attributes.matches.awayTeam, 
  as: 'teamAway',
});

export default Matches;