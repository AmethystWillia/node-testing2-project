const db = require('../../data/dbConfig');

const getAll = () => {
    return db('cats');
};

const getById = () => {
    return db('cats');
};

const add = (cat) => {
    return db('cats');
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