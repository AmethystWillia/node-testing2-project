const db = require('../../data/dbConfig');

const getAll = () => {
    return db('cats');
};

const getById = (id) => {
    return db('cats')
        .where('id', id)
        .first();
};

const add = async (cat) => {
    const [id] = await db('cats').insert(cat);

    return getById(id);
};

const update = (id, changes) => {
    return db('cats');
};

const remove = (id) => {
    return db('cats');
};

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove,
};