const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT *
    FROM "message";
    `;

    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.error("Error getting notes", error);
        res.sendStatus(500);
    });
})





    module.exports = router;