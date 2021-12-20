const db = require('../models');

async function authenticate(req, res, next) {
    console.log('authenticate');
}

module.exports = {
    authenticate: authenticate
}