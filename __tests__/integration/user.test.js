import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  // beforeAll() executa uma só vez antes de executar todos os testes
  // beforeEach() executa uma vez a cada teste
  // afterAll()
  // afterEach()
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Maycon Francisco',
        email: 'maycon@francisco.com',
        password_hash: '123123',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Maycon Francisco',
        email: 'maycon@francisco.com',
        password_hash: '123123',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Maycon Francisco',
        email: 'maycon@francisco.com',
        password_hash: '123123',
      });

    expect(response.status).toBe(400);
  });
});
