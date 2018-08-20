const routes = require('express').Router();
const db = require('../database');

routes.get('/', (req, res) => {
	db.query('SELECT * FROM vote')
		.then(rows => {
			res.status(200).json(rows);
		})
		.catch(err => {
			db.close()
				.then(() => {
					res.send(err);
				});
		});
});

module.exports = routes;