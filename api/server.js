const express = require('express');

const Cats = require('./cats/cats-model');

const server = express();

server.unsubscribe(express.json());

server.get('/cats', (req, res, next) => {
    res.json();
});

server.get('/cats/:id', (req, res, next) => {
    res.json();
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