const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:plantID', (req, res) => {
    const userID = req.user.id;
    const plantID = req.params.plantID; // Extract plantID from request parameters

    const query = `
        SELECT *
        FROM note
        WHERE user_id = $1
        AND plant_id = $2;
    `;

    pool.query(query, [userID, plantID]) // Correct order of parameters
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error("Error getting notes", error);
            res.sendStatus(500);
        });
});

module.exports = router;
