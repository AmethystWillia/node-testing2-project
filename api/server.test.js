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

    test('Can update a cat', async () => {
        const [id] = await db('cats').insert({ name: 'Eros', pelt: 'Calico', temperment: 'Playful' });
        let result = await Cats.update(id, { temperment: 'Sweetie' });
        
        expect(result).toEqual({ id, name: 'Eros', pelt: 'Calico', temperment: 'Sweetie' });
        result = await Cats.getById(id);
        expect(result).toEqual({ id, name: 'Eros', pelt: 'Calico', temperment: 'Sweetie' });
    });

    test('Delete a cat', async () => {
        let result = await Cats.add({ name: 'Wisteria', pelt: 'Calico', temperment: 'Snuggly' });
        result = await Cats.getById(result.id);
        expect(result).toHaveProperty('name', 'Wisteria');

        result = await Cats.remove(result.id);
        expect(result).toEqual({ id: 1, name: 'Wisteria', pelt: 'Calico', temperment: 'Snuggly' });

        result = await Cats.getById(result.id);
        expect(result).not.toBeDefined();
    });
});

describe('Test server endpoints', () => {
    test('[GET] /cats', async () => {
        let result = await request(server).get('/cats');

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
        expect(result.body).toHaveLength(0);
    });

    test('[GET] /cats/:id', async () => {
        let result = await Cats.add({ name: 'Jinx', pelt: 'Black', temperment: 'Bitch <3' });
        result = await request(server).get(`/cats/${result.id}`);

        expect(result.body.name).toBe('Jinx');
    });

    test('[POST] /cats', async () => {
        let result = await request(server)
            .post('/cats')
            .send({ name: 'Jinx', pelt: 'Black', temperment: 'Bitch <3' });
        expect(result.status).toBe(201);

        result = await Cats.getById(1);
        expect(result.name).toBe('Jinx');
    });
});