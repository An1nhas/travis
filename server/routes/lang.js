const lang = require('../lang.json');

module.exports.routes = function (server) {
    server.get('/api/lang', (req, res) => {
        console.log("DICTIONARY");

        res.json(lang);
    })
}