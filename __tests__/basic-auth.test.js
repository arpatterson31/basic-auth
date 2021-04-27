'use strict';

const supergoose = require('@code-fellows/supergoose');
const base64 = require('base-64');
const { server } = require('../src/server.js');
const basicAuth = require('../src/auth/middleware/basicAuth.js');

const mockRequest = supergoose(server);

describe('AUTH TESTS:', () => {

  it('should POST to /signup to create a new user', async () => {
    const response = await mockRequest.post('/signup').send({ username: 'testUsername', password: 'testPassword' });
    expect(response.status).toEqual(201);
  });

  it('should POST to /signin to login as a user (use basic auth)', async () => {
    await mockRequest.post('/signup').send({ username: 'testUser2', password: 'testPassword' });

    const encoded = base64.encode('testUser2:testPassword');
    const response = await mockRequest.post('/signin').set('authorization', `Basic ${encoded}`);

    expect(response.status).toEqual(200);
  });

});

describe('MIDDLEWARE TESTS:', () => {
  const encoded =  base64.encode('testUser2:testPassword');
  const req = {
    headers: {
      authorization: encoded
    }
  }

  let res = {};
  let next = jest.fn();


  it('should test middleware, does it send a basic header?', async () => {
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});