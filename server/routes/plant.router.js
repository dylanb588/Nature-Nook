const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const userID = req.user.id
  const query = `
  SELECT * FROM "plant"
  WHERE "user_id" = $1
  `;

  pool.query(query, [userID])
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    res.sendStatus(500);
    console.log('Error getting your plants :(', error);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
