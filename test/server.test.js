const path = require('path');
const request = require('supertest');
const { resetDatabase } = require('../src/db');
const { app, initializeApp } = require('../src/server');

let serverApp;

describe('Express server', () => {
  beforeAll(async () => {
    process.env.DB_PATH = path.join(__dirname, '..', 'data', 'test-server.db');
    await resetDatabase();
    serverApp = await initializeApp();
  });

  afterAll(async () => {
    await resetDatabase();
  });

  test('GET /health returns status ok', async () => {
    const response = await request(serverApp).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('GET / returns welcome message and sum', async () => {
    const response = await request(serverApp).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome to agents-continuar-projeto', sum: 3 });
  });
});
