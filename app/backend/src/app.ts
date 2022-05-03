import * as express from 'express';
import error from './middleware/error';
import { loginRouter } from './router';
import teamRouter from './router/team';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorMiddleware();
  }
  
  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  private routes() {
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamRouter);

  }

  private errorMiddleware() {
    this.app.use(error);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.warn(`Listening on ${PORT}`));
  }
  
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
