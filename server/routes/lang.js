let restify = require('restify');
const lang = require('../lang.json');


module.exports.routes = (server) => {
    server.get('/api/lang', (req, res) => {
        res.json(lang)
    })
}