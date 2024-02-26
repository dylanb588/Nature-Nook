const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // GETS the comments for that message.
  router.get('/:messageID', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT *
    FROM "comment"
    WHERE "message_id" = $1
    `;

    pool.query(query, [id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.error("Error getting comments", error);
        res.sendStatus(500);
    });
});
// POST for adding new comments to a message
router.post('/', rejectUnauthenticated, (req, res) => {
    const userID = req.user.id;
    const comment = req.body;

    const query = `
    INSERT INTO "message" ("message_id", "posted_by", "comment", "posted_at")
    VALUES ($1, $2, $3, NOW());
    `;

    pool.query(query, [userID])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500);
        console.log("Error posting note", error);
    })
});

router.delete('/delete/commentID', rejectUnauthenticated, (req, res) => {

});

module.exports = router;