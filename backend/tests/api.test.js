const request = require('supertest');
const { createTestApp } = require('./testApp');

describe('API smoke', () => {
  it('GET / returns running message', async () => {
    const app = createTestApp();
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('UARP-AI Backend Running');
  });
});
