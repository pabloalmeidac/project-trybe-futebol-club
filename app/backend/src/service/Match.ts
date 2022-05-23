import MatchModel from '../model/Match';

export default class MatchService {
  constructor(private matchModel: MatchModel) {}

  async list(inProgress: any) {
    let matches;
    
    if ( inProgress === "true" || inProgress === "false") {
      const convertInprogress = inProgress == 'true';
      matches = await this.matchModel.findInProgress(convertInprogress);
    } else {
      matches = await this.matchModel.findAll();
    }
    return matches;
  }
}