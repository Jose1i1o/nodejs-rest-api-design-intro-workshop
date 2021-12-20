const db = require('../models');

async function getPersons(req, res, next) {
    try {
        const persons = await db.Person.find().limit();

        res.status(200).send({
            data: persons
        });
    } catch (err) {
        next(err);
    }
}

async function createPerson(req, res, next) {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            placeOfBirth,
            roles
        } = req.body;

        const newPerson = await db.Person.create({
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            placeOfBirth: placeOfBirth,
            roles: roles
        });

        res.status(201).send({
            data: newPerson,
        });
    } catch (err) {
        next(err);
    }
}

async function updatePerson(req, res, next) {
    const {
        id: personId
    } = req.params;

    try {
        const updatedPerson = await db.Person.findByIdAndUpdate(
            personId, req.body, {
                new: true
            }
        )
    }
}