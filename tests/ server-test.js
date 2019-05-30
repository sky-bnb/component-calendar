import React from 'react';
import request from 'supertest';
import server from '../server/index.js';
import { db } from '../database/index.js';
const { getReservations } = require('../database/schema_model.config');

afterAll(() => db.close());

describe('database', () => {
  it('gets all user data id 101-200 from mongo DB', () => {
    return getReservations({}).exec()
      .then(data => expect(data.length).toBe(100))});
});

describe('CRUD Routes', () => {
  it('should respond with index.html', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('should respond to GET /host/:hostid with host data', async () => {
    const res = await request(server).get('/calendar');
    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0]).toHaveProperty('minStay');
    expect(res.body[0]).toHaveProperty('dates_reserved');
  });
});
