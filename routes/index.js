const path = require('path');
const routes = require('express').Router();
const data = require('../models/data');

routes.use('/data', data);

routes.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/../index.html'));
});

module.exports = routes;