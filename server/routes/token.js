const restify = require('restify');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const merge = require('merge-descriptors');
const config = require('../config/server');

module.exports.routes = function (server) {
	server.get({
		path: '/token'
	}, function respond(req, res, next) {

		const profile = {
			id: '8638441b-f3a8-4224-9fdb-b6ac1c7f2b99',
			email: 'hello@travis.foundation',
			full_name: 'Travis Foundation',
			role: 'api-client'
		};

		const options = merge({
			jwtid: uuid.v4()
		}, config.jwt);

		const token = jwt.sign(profile, config.secret, options);

		console.log("/token".green, token);

		res.setHeader('Authorization', `Bearer ${token}`);
		res.send({ status: "OK" });

		return next();
	});
};
