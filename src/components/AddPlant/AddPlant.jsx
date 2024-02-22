import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

function AddPlant() {
  const history = useHistory();
  // const [file, setFile] = useState('');
  const [image, setImage] = useState('');
  // const [uploadedImg, setUpload] = useState('');
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
    console.log(image);
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    // setFile(file);
    previewFiles(file);
  }

  const handleSubmit =async ()=> {
    let plantObj = {...plantInfo, image: image}
    const result = await axios.post('/api/plant', plantObj)
    // try{
    //   const uploadedImage = result.data.public_id;
    //    setUpload(uploadedImage);
    // }catch(error){
    //   console.log(error);
    // }
    const showAlert = () => {
      alert('Added new plant!');
      history.push('/user');
    }
    showAlert();
    
  }

  // console.log('Plantinfo:', plantInfo);

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor='fileInput'>Upload plant photo here</label>
          <input type='file' id='fileInput' onChange={e=> handleChange(e)} required
          accept='image/png, image/jpeg, image/jpg, image/jfif'/>
          <TextField
          name="plantName"
          label="Plant Name"
          value={plantInfo.plantName}
          // onChange={handleChange}
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
      </form>
      <img src={image} />
    </div>
  );
}

export default AddPlant;
