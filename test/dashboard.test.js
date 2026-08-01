const request = require('supertest');
const path = require('path');
const { resetDatabase } = require('../src/db');
const { initializeApp } = require('../src/server');

let app;

describe('Dashboard API', () => {
  beforeAll(async () => {
    process.env.DB_PATH = path.join(__dirname, '..', 'data', 'test-dashboard.db');
    await resetDatabase();
    app = await initializeApp();
  });

  afterAll(async () => {
    await resetDatabase();
  });

  test('GET /api/dashboard returns summary and task breakdown', async () => {
    const response = await request(app).get('/api/dashboard');

    expect(response.status).toBe(200);
    expect(response.body.summary.users).toBeGreaterThan(0);
    expect(response.body.summary.projects).toBeGreaterThan(0);
    expect(response.body.summary.tasks).toBeGreaterThan(0);
    expect(Array.isArray(response.body.taskStatusBreakdown)).toBe(true);
    expect(Array.isArray(response.body.recentTasks)).toBe(true);
  });

  test('GET /api/tasks returns seeded tasks', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
