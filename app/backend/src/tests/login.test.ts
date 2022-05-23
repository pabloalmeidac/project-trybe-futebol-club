import * as sinon from 'sinon';
import * as chai from 'chai';
import { login } from './mocks/login';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /login', () => {
  describe('Quando não é informado email e/ou senha', () => {
    let response: any;
    before(async () => {
      response = await chai.request(app).post('/login').send({});
    });

    it('Retorna um status 400', () => {
      expect(response).to.have.status(400);
    })
  });
});
