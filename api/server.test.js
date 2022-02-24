const Cats = require('./cats/cats-model');
const db = require('../data/dbConfig');

const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('cats').truncate();
});

test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});

describe('Test cats model', () => {});

describe('Test server endpoints', () => {});