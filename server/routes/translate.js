var restify = require('restify');
var request = require('request');

module.exports.routes = function (server) {

	server.post('/api/translate', function respond(req, res, next) {
		request.post(
			'https://hacking-tigrinya.appspot.com/translate/' + req.params.source_lang + '-' + req.params.target_lang,
			{
				json: {
					"instances": [req.params.phrase]
				}
			},
			function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log('/translate'.green, req.params, body);

					var text = body.predictions.join(' ').replace('. ,', '.').trim().replace(' .', '.');

					res.send({
						source: req.params.source_lang,
						target: req.params.target_lang,
						translations: [
							{
								text: text
							}
						]
					});
				} else {
					console.error('/translate'.red, req.params, response);
				}
			}
		);


		// 	res.send({
		// 	source: req.params.source_lang,
		// 	target: req.params.target_lang,
		// 	translations: [
		// 		{
		// 			text: "ንሕና ንሰባት ክንርድኦም ደሊና ።"
		// 		}
		// 	]
		// });
		return next();
	});
};
