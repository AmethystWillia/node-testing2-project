const express = require('express');

const Cats = require('./cats/cats-model');

const server = express();

server.use(express.json());

server.get('/cats', (req, res, next) => {
    Cats.getAll()
        .then(all => {
            res.status(200).json(all);
        })
        .catch(next);
});

server.get('/cats/:id', (req, res, next) => {
    Cats.getById(req.params.id)
        .then(cat => {
            res.status(200).json(cat);
        })
        .catch(next);
});

server.post('/cats', (req, res, next) => {
    res.json();
});

server.put('/cats/:id', (req, res, next) => {
    res.json();
});

server.delete('/cats/:id', (req, res, next) => {
    res.json();
});

module.exports = server;