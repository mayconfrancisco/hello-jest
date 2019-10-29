import bcrypt from 'bcryptjs';
import request from 'supertest';
import app from '../../src/app';

import User from '../../src/app/models/User';
import truncate from '../util/truncate';

describe('User', () => {
  // beforeAll() executa uma só vez antes de executar todos os testes
  // beforeEach() executa uma vez a cada teste
  // afterAll()
  // afterEach()
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'Maycon Francisco',
      email: 'maycon@francisco.com',
      password: '123123',
    });

    const compareHash = await bcrypt.compare('123123', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Maycon Francisco',
        email: 'maycon@francisco.com',
        password: '123123',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Maycon Francisco',
        email: 'maycon@francisco.com',
        password: '123123',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Maycon Francisco',
        email: 'maycon@francisco.com',
        password: '123123',
      });

    expect(response.status).toBe(400);
  });
});
