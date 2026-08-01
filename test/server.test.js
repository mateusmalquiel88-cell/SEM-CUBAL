const request = require('supertest');
const app = require('../src/server');

describe('Express server', () => {
  test('GET /health returns status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('GET / returns welcome message and sum', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome to agents-continuar-projeto', sum: 3 });
  });
});
