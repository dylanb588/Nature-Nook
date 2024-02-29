const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinary = require('../cloudinary/cloudinary');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
// Makes unquie string for file upload.
const { Guid } = require('js-guid');


// GET for getting the plants associated with that logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
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

// GETS the user page of a different user
router.get('/:userID', rejectUnauthenticated, (req, res) => {
  const { userID } = req.params;
  
  const query = `
    SELECT * FROM "plant"
    WHERE "user_id" = $1
  `;

  pool.query(query, [userID])
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('Error getting plants:', error);
    });
});

// GET for just a single plant's care info
router.get('/details/:plantID', rejectUnauthenticated, (req, res) => {
  const userID = req.user.id;
  const plantID = req.params.plantID;

  const query = `
  SELECT * FROM "plant"
  WHERE "id" = $1
  AND "user_id" = $2
  `;

  pool.query(query, [plantID, userID])
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    res.sendStatus(500);
    console.log("Error getting plant details", error);
  })
});

// POST for new plant's allows user to upload a file of their plant and plant info
router.post('/', rejectUnauthenticated, async (req, res) => {
  const { image, plantName, scientificName, care, soilType, water } = req.body;
  const username = req.user.username;

  // Upload the plant image to Cloudinary
  try {
      const result = await cloudinary.uploader.upload(image, {
          upload_preset: 'ml_default',
          public_id: `${username}plant${Guid.newGuid()}`,
          allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
      });

      const justThePlantUrl = result.url;

      const currentDate = new Date();
      const nextWaterDate = new Date(currentDate.getTime() + water * 24 * 60 * 60 * 1000); // Assuming water represents the number of days between waterings

      // Insert the plant information into the database, including the calculated next watering date
      const plantQuery = `
          INSERT INTO "plant" ("user_id", "plant_name", "scientific_name", "plant_image", "care", "soil_type", "water", "next_water_date")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      const values = [req.user.id, plantName, scientificName, justThePlantUrl, care, soilType, water, nextWaterDate];
      await pool.query(plantQuery, values);

      res.sendStatus(201);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});



// PUT for allowing users to update their plant's info
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const plantID = req.params.id;
  const userID = req.user.id;
  const { plant_name, scientific_name, care, soil_type, water } = req.body;

  const currentDate = new Date();
  const nextWaterDate = new Date(currentDate.getTime() + water * 24 * 60 * 60 * 1000);

  const query = `
  UPDATE "plant"
  SET "plant_name" = $1, "scientific_name" = $2, "care" = $3, "soil_type" = $4, "water" = $5, "next_water_date" = $6
  WHERE "id" = $7 AND "user_id" = $8
  `;

  const values = [plant_name, scientific_name, care, soil_type, water, nextWaterDate, plantID, userID];

  pool.query(query, values)
  .then(() => {
    res.sendStatus(200);
  }).catch((error) => {
    res.sendStatus(500);
    console.log("Error updating plant", error);
  })
});

// DELETE allows users to delete plant they post
router.delete('/:plantID', rejectUnauthenticated, (req, res) => {
  const plantID = req.params.plantID;
  const userID = req.user.id;

  const query = `
  DELETE FROM "plant"
  WHERE id = $1
  AND user_id = $2;
  `;

  const values = [plantID, userID];

  pool.query(query, values)
  .then(() => {
    res.sendStatus(204);
  }).catch((error) => {
    res.sendStatus(500);
    console.log("Error deleting plant", error);
  })
});

module.exports = router;
