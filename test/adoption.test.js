import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

describe('Adoption Endpoints', () => {
  let app;
  let adoptionId;
  let server;

  beforeEach(async () => {
    const { default: serverInstance, PORT } = await import('../src/server.js');
    server = serverInstance;

    await new Promise((resolve) => {
      server.on('listening', () => {
        app = supertest(`http://localhost:${PORT}`);
        resolve();
      });
    });
  });

  it('should create a new adoption', async () => {
    const newAdoption = {
      petId: new mongoose.Types.ObjectId('674668404b32dde2c98b347d'),
      userId: new mongoose.Types.ObjectId('674668404b32dde2c98b3477'),
      adoptionDate: '2024-01-03'
    };

    const res = await app.post('/api/adoptions').send(newAdoption);

    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.have.property('_id');
    adoptionId = res.body.data._id;
  });

  it('should get all adoptions', async () => {
    const res = await app.get('/api/adoptions');

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('array');
  });

  it('should get an adoption by ID', async () => {
    const res = await app.get(`/api/adoptions/${adoptionId}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('data');
    expect(res.body.data._id).to.equal(adoptionId);
  });

  it('should update an adoption', async () => {
    const updatedAdoption = {
      adoptionDate: '2024-01-04'
    };

    const res = await app.put(`/api/adoptions/${adoptionId}`).send(updatedAdoption);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('data');
    expect(res.body.data.adoptionDate).to.equal(updatedAdoption.adoptionDate);
  });

  it('should delete an adoption', async () => {
    const res = await app.delete(`/api/adoptions/${adoptionId}`);

    expect(res.statusCode).to.equal(200);
  });

  afterEach(async () => {
    await new Promise((resolve) => server.close(resolve));
  });
});