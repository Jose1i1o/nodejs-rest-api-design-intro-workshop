const db = require('../models');
const encryptPassword = require('../utils/encrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function signUp(req, res, next) {
    const {
        userName,
        email,
        password,
        isAdmin
    } = req.body;

    try {
        const encryptedPassword = await encryptPassword(password);

        const newUser = await db.User.create({
            userName: userName,
            email: email,
            password: encryptedPassword,
            isAdmin: isAdmin
        });

        const token = jwt.sign({
            id: newUser._id
        }, config.encrypt.token, {
            expiresIn: 90000,
        });

        res.status(200).send({
            data: newUser,
            token: token,
        });
    } catch (err) {
        next(err);
    }
}