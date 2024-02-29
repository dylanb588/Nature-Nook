import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Card, CardContent, Typography, Stack } from '@mui/material';

function AddPlant() {
  const history = useHistory();
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');
  const [uploadedImg, setUpload] = useState('');
  const [plantInfo, setPlantInfo] = useState({
    plantName: '',
    scientificName: '',
    care: '',
    soilType: '',
    water: ''
    });

  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setImage(reader.result);
    }
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let plantObj = {...plantInfo, image: image}
    const result = await axios.post('/api/plant', plantObj)
    try{
      const uploadedImage = result.data.public_id;
      setUpload(uploadedImage);
    }catch(error){
      console.log(error);
    }
    history.push('/user');
  }

  return (
    <Card sx={{ width: 600, margin: 'auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Add New Plant
        </Typography>
      <form onSubmit={e => handleSubmit(e)}>
      <Stack direction="column" spacing={2}>
        <label htmlFor='fileInput'>Upload plant photo here</label>
          <input type='file' id='fileInput' onChange={e=> handleChange(e)} required
          accept='image/png, image/jpeg, image/jpg, image/jfif, image/webp' />
          <TextField
          id='plantName'
          name="plantName"
          label="Plant Name"
          value={plantInfo.plantName}
          onChange={(event) => setPlantInfo({...plantInfo, plantName: event.target.value})}
          required
          />
        <TextField
          name="scientificName"
          label="Scientific Name"
          value={plantInfo.scientificName}
          onChange={(event) => setPlantInfo({...plantInfo, scientificName: event.target.value})}
          required
          />
        <TextField
          name="care"
          label="Care Details"
          value={plantInfo.care}
          onChange={(event) => setPlantInfo({...plantInfo, care: event.target.value})}
          required
          multiline
          rows={4}
          fullWidth
          />
        <TextField
          name="soilType"
          label="Soil Type"
          value={plantInfo.soilType}
          onChange={(event) => setPlantInfo({...plantInfo, soilType: event.target.value})}
          required
          />
        <TextField
          name="water"
          label="Water every ... days"
          value={plantInfo.water}
          onChange={(event) => setPlantInfo({...plantInfo, water: event.target.value})}
          required
          />
        <Button type="submit">Upload Plant Info</Button>
        </Stack>
      </form>
      </CardContent>
      </Card>
  );
}

export default AddPlant;
