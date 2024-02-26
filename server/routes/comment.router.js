const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // GETS the comments for that message.
  router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT *
    FROM "comment"
    WHERE "message_id" = $1
    `;

    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.error("Error getting comments", error);
        res.sendStatus(500);
    });
})

module.exports = router;