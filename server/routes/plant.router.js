const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET for getting the plants associated with that logged in user
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

// POST for adding a new plant
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


router.put('/:plantID', (req, res) => {
  const plantID = req.params.plantID;
  const userID = req.user.id;
  const { plant_name, scientific_name, plant_image, care, soil_type, water } = req.body;

  const query = `
  UPDATE "plant"
  SET "plant_name" = $1, "scientific_name" = $2, "plant_image" = $3, "care" = $4, "soil_type" = $5, "water" = $6
  WHERE "id" = $7 AND "user_id" = $8
  `;

  const values = [plant_name, scientific_name, plant_image, care, soil_type, water, plantID, userID];

  pool.query(query, values)
  .then(() => {
    res.sendStatus(200);
  }).catch((error) => {
    res.sendStatus(500);
    console.log("Error updating plant", error);
  })
});

module.exports = router;
