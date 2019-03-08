// import lang from './lang.json';
const express = require('express');

const Router = express.Router();
const axios = require('axios');
const lang = require('./lang.json');

axios.defaults.withCredentials = true;

Router.get('/lang', (req, res) => {
    res.json(lang);
});

module.exports = Router;
