// https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52

const router = require('express').Router();
const bodyParser = require('body-parser');
const env = require('dotenv').load()
const verifyToken = require('../helpers/verify');

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
	const hashedPassword = bcrypt.hashSync(req.body.password, 8);
	const user = {
		id: 7,
		name: req.body.name,
		password: hashedPassword
	};
	const token = jwt.sign({ id: user.id }, env.parsed.secret, {
		expiresIn: 86400
	});

	console.log('Token:', token);
	res.status(200).send({ auth: true, token: token });
});

router.get('/me', verifyToken, (req, res, next) => {
	res.status(200).send({ id: req.userId });
});

module.exports = router;