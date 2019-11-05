const express = require('express');

const CarRoutes = require('./CarRoutes.js');

const server = express();

server.use(express.json());

server.use('/api/cars', CarRoutes);

module.exports = server;