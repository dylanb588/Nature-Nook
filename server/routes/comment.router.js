const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // GETS the comments for that message.
  router.get('/:messageID', rejectUnauthenticated, (req, res) => {
    const messageID = req.params.messageID;
    console.log(messageID);
    const query = `
    SELECT 
    comment.*, 
    message.message AS associated_message,
    "user".username AS commenter_username
    FROM 
    comment
    JOIN 
    message ON comment.message_id = message.id
    JOIN 
    "user" ON comment.author = "user".id
    WHERE 
    comment.message_id = $1;
    `;

    pool.query(query, [messageID])
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
    const comment = req.body;

    const query = `
    INSERT INTO "comment" ("message_id", "author", "comment", "posted_time")
    VALUES ($1, $2, $3, NOW());
    `;

    pool.query(query, [comment.message_id, author, comment.comment])
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
    AND "posted_by" = $2;
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