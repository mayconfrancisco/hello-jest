import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
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
});
