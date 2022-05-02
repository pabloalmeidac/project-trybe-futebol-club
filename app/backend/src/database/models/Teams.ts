import { Model } from 'sequelize';
import db from '.';
import Attributes from './attributes';

class Teams extends Model {
  public id!: number;

  public teamName!: string;
}

Teams.init(Attributes.teams, 
{
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;