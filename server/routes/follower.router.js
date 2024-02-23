const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const userID = req.user.id;

    const query = `
    SELECT "user"."username" AS follower_username
    FROM "follower"
    JOIN "user" ON "follower".follower_id = "user_id"
    WHERE "follower".user_id = $1
    `;

    pool.query(query, [userID])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log("Error getting followers", error);
    })
})

module.exports = router;