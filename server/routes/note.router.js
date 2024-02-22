const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



// router.get('/:plantID', (req, res) => {
//     const userID = req.user.id;
//     const plantID = req.params.plantID; // Extract plantID from request parameters

//     console.log('Get userid', userID);
//     console.log('Get plantId', plantID);

//     const query = `
//         SELECT *
//         FROM "note"
//         WHERE "user_id" = $1
//         AND "plant_id" = $2;
//     `;

//     pool.query(query, [userID, plantID])
//         .then(result => {
//             res.send(result.rows);
//         })
//         .catch(error => {
//             console.error("Error getting notes", error);
//             res.sendStatus(500);
//         });
// });

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
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

router.delete('/', (req, res) => {
    const noteID = req.body;
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
