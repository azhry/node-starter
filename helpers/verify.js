const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('dotenv').load()

module.exports = (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided' });

	jwt.verify(token, env.parsed.secret, (err, decoded) => {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });

		req.userId = decoded.id;
		next(); // continue to another route
	});
}