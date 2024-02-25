const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT message.*, "user".username
    FROM "message"
    INNER JOIN "user" ON message.posted_by = "user".id;
    `;

    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.error("Error getting notes", error);
        res.sendStatus(500);
    });
});

  router.post('/', rejectUnauthenticated, (req, res) => {
    const userID = req.user.id;
    const message = req.body;

    const query = `
    INSERT INTO "message" ("posted_by", "message", "posted_at")
    VALUES ($1, $2, NOW());
    `;

    pool.query(query, [userID, message])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error posting message', error);
        res.sendStatus(500);
    });
  });





    module.exports = router;