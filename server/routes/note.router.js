const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:plantID', (req, res) => {
    const userID = req.user.id;
    const plantID = req.params.plantID; // Extract plantID from request parameters

    const query = `
        SELECT *
        FROM "note"
        WHERE "user_id" = $1
        AND "plant_id" = $2;
    `;

    pool.query(query, [userID, plantID])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error("Error getting notes", error);
            res.sendStatus(500);
        });
});

router.post('/:plantID', (req, res) => {
    const userID = req.user.id;
    const plantID = req.params.plantID;
    const note = req.body;

    const query = `
    INSERT INTO "note" ("user_id", "plant_id", "note")
    VALUES ($1, $2, $3)
    `;

    pool.query(query, [userID, plantID, note])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500);
        console.log("Error posting note", error);
    })
});

router.delete('/:noteID', (req, res) => {

})

module.exports = router;
