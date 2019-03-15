const lang = require('../lang.json');

var restify = require('restify');

module.exports.routes = (server) => {
    server.get('/api/lang', (req, res) => {
        res.json(lang)
    })
}