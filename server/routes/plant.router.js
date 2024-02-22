const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinary = require('../cloudinary/cloudinary')


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

// GET for just a single plant's care info
router.get('/:plantID', (req, res) => {
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

// router.post('/', async (req, res) => {
//   try {
//     const { image, plant_name, scientific_name, care, soil_type, water } = req.body;
//     const username = req.user.username;

//     // Upload image to Cloudinary
//     const uploadedImage = await cloudinary.uploader.upload(image, {
//       upload_preset: 'ml_default',
//       public_id: `${username}plant`,
//       allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
//     });

//     // Store plant information in the PostgreSQL database
//     const query = `
//       INSERT INTO "plant" ("user_id", "plant_name", "scientific_name", "plant_image", "care", "soil_type", "water")
//       VALUES ($1, $2, $3, $4, $5, $6, $7)
//     `;
//     const values = [req.user.id, plant_name, scientific_name, uploadedImage.public_id, care, soil_type, water];
//     await pool.query(query, values);

//     // Send back the image URL in the response
//     res.status(200).json({ 
//       message: 'Plant and image uploaded successfully',
//       imageUrl: uploadedImage.public_id
//     });
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// POST for adding a new plant
// router.post('/', (req, res) => {
//   const userID = req.user.id;
//   const { plant_name, scientific_name, plant_image, care, soil_type, water } = req.body;

//   const query = `
//   INSERT INTO "plant" ("user_id", "plant_name", "scientific_name", "plant_image", "care", "soil_type", "water")
//   VALUES ($1, $2, $3, $4, $5, $6, $7)
//   `;

//   const values = [userID, plant_name, scientific_name, plant_image, care, soil_type, water];

//   pool.query(query, values)
//   .then(() => {
//     res.sendStatus(201);
//   }).catch((error) => {
//     res.sendStatus(500);
//     console.log("Error adding new plant", error);
//   })
// });

router.post('/', async(req, res) => {
  const {image, plantName, scientificName, care, soilType, water } = req.body;
  const username = req.user.username
  
  await cloudinary.uploader.upload(image,
    {
      upload_preset: 'ml_default',
      public_id: `${username}plant`,
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
    },
      function(error, result) {
        if(error){
          console.log(error);
        } 
        console.log('Here is result', result);
      
        const justThePlantUrl = result.url;
        const plantQuery = `
          INSERT INTO "plant" ("user_id", "plant_name", "scientific_name", "plant_image", "care", "soil_type", "water")
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          `;
  
          const values = [req.user.id, plantName, scientificName, justThePlantUrl, care, soilType, water]
          pool.query(plantQuery, values)
          .then(()=> {
            res.sendStatus(201)
          }).catch(error => {
            console.log(error);
            res.sendStatus(500);
          })
      });
        // we need to POST the result.url to the 'plant' table
        // we will make a new insert statement

          
      // try{
      //   res.status(200).json(uploadedImage)
      // }catch(err){
      //   console.log(err);
      // }
})



// PUT for allowing users to update their plant's info
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

// DELETE allows users to delete plant they post
router.delete('/:plantID', (req, res) => {
  const plantID = req.params.plantID;
  const userID = req.user.id;

  const query = `
  DELETE FROM "plant"
  WHERE "id" = $1
  AND "user_id" = $2
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
