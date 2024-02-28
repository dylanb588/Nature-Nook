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
    FROM "comment";
    `;

    pool.query(query)
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
    const author = req.user.id;
    console.log(req.body);
    const comment = req.body

    const query = `
    INSERT INTO "comment" ("message_id", "author", "comment", "posted_time")
    VALUES ($1, $2, $3, NOW());
    `;

    pool.query(query, [comment.messageID, author, comment.comment])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500);
        console.log("Error posting comment", error);
    })
});

router.delete('/delete/:commentID', rejectUnauthenticated, (req, res) => {
    const userID = req.user.id;
    const commentID = req.params.commentID;

    const query = `
    DELETE FROM "comment"
    WHERE "id" = $1
    AND "author" = $2;
    `

    pool.query(query, [commentID, userID])
    .then(result => {
        res.sendStatus(204);
    }).catch(error => {
        res.sendStatus(500);
        console.log("Error deleting comment", error);
    })
});

module.exports = router;