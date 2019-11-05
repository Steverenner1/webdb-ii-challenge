const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {res.json(cars);
    })
    .catch (err => {res.status(500).json({ message: "Could not retrieve information"})
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cars')
    .where({ id })
    .first()
    .then(car => {res.json(car);
    })
    .catch (err => {res.status(500).json({ message: "Could not retrieve ID"}) 
    });
});

router.post('/', (req, res) =>{
    const change = req.body;
    !change
        ? res.status(400).json({ error: "Please enter valid credentials" })
        : db('cars')
        .insert(change)
        .then(ids => {
            db('cars').where({ id: ids[0] })
            .then(newCar => {
                res.status(201).json(newCar);
            });
        })
        .catch (err => {
            res.status(500).json({ message: "Unable to add credentials" });
        });
});


module.exports = router;