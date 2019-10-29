import bcrypt from 'bcryptjs';
import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
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
    // o factory vai gerar todos os atributos do usuario automaticamente
    // estamos sobreescrevendo o password para que consigamos comparar o hash
    const user = await factory.create('User', {
      password: '123123',
    });

    const compareHash = await bcrypt.compare('123123', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    // factory.attrs gera um objeto do model mas sem cria-lo na base de dados
    // como so estamos testando a rota ela mesma vai criar
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
