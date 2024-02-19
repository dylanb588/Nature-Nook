const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const userID = req.user.id;
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
  const userID = req.user.id;
  const { plant_name, scientific_name, plant_image, care, soil_type, water } = req.body;

  const query = `
  INSERT INTO "plant" ("user_id", "plant_name", "scientific_name", "plant_image", "care", "soil_type", "water")
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  const values = [userID, plant_name, scientific_name, plant_image, care, soil_type, water];

  pool.query(query, values)
  .then(() => {
    res.sendStatus(201);
  }).catch((error) => {
    res.sendStatus(500);
    console.log("Error adding new plant", error);
  })
});

module.exports = router;
