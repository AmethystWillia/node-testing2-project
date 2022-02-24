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

describe('Test cats model', () => {
    test('Table starts empty', async () => {
        const kitties = await db('cats');

        expect(kitties).toHaveLength(0);
    });

    test('Can insert cats into table', async () => {
        let result = await Cats.add({ name: 'Venus', pelt: 'Calico', temperment: 'Timid' });
        expect(result).toEqual({ id: 1, name: 'Venus', pelt: 'Calico', temperment: 'Timid' });

        let kitties = await db('cats');
        expect(kitties).toHaveLength(1);

        await Cats.add({ name: 'Little bit', pelt: 'Grey tabby', temperment: 'Blank' });
        kitties = await db('cats');
        expect(kitties).toHaveLength(2);
    });

    test('Can retrieve cat by id', async () => {
        const { id } = await Cats.add({ name: 'Hades', pelt: 'Black', temperment: 'Glutton' });
        const result = await Cats.getById(id);

        expect(result).toHaveProperty('name', 'Hades');
    });
});

describe('Test server endpoints', () => {});