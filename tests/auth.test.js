const request = require('supertest');
const app = require('../server');

describe('Auth endpoints', () => {
  test('GET /api/users/me without token should 401', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.statusCode).toBe(401);
  });
});
