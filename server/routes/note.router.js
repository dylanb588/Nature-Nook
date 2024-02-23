const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const userID = req.user.id;
    const query = `
    SELECT *
    FROM "note"
    WHERE "user_id" = $1
    `;

    pool.query(query, [userID])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.error("Error getting notes", error);
        res.sendStatus(500);
    });
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const userID = req.user.id;
    const note = req.body;

    console.log('Here is user', userID);
    console.log('Here is note', note);

    const query = `
    INSERT INTO "note" ("user_id", "plant_id", "note")
    VALUES ($1, $2, $3)
    `;

    pool.query(query, [userID, note.plantID, note.note])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500);
        console.log("Error posting note", error);
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const noteID = req.params.id;
    const userID = req.user.id;

    const query = `
    DELETE FROM "note"
    WHERE "id" = $1
    AND "user_id" = $2
    `;

    const values = [noteID, userID];

    pool.query(query, values)
    .then(() => {
        res.sendStatus(204);
    }).catch((error) => {
        res.sendStatus(500);
        console.log("Error deleting note", error);
    })
});

module.exports = router;
