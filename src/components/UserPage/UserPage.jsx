import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom'
import './UserPage.css'
import CircularProgress from '@mui/material/CircularProgress';

import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const plants = useSelector((store) => store.plants);

  useEffect(() => {
    dispatch({type: 'FETCH_PLANTS'})
    return () => dispatch({type: 'CLEAR_PLANTS'})
  }, [dispatch]);

  return (
    <main>
      <div className="welcomeContainer">
        <img className='vine' src='/vine-146978_640.png' />
        <h2 className='welcome' align='center'>Welcome to your Nature Nook, {user.username}!</h2>
        <img className='image' src='/vine-146978_640.png' />
      </div>
      {plants === undefined ? (
        <CircularProgress color="success" />
      ) : plants.length === 0 ? (
        <Card sx={{ width: 300, marginLeft: 7 }} style={{backgroundColor: "#989F7E"}}>
          <CardActionArea>
            <Link to={'/addPlant'}>
              <CardMedia
                component="img"
                height="300"
                image='/nature-nook-high-resolution-logo.png'
                alt='Nature Nook Logo'
              />
            </Link>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" align='center'>
                Click me to add a plant!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Stack marginLeft={7} direction="row" spacing={5} useFlexGap flexWrap="wrap">
          {plants.map(plant => (
            <Card key={plant.id} sx={{ width: 300 }} style={{backgroundColor: "#ACB4A3"}}>
              <CardActionArea>
                <Link to={`/plantdetails/${plant.id}`}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={plant.plant_image}
                    alt={plant.plant_name}
                  />
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div" align='center' fontFamily={'Antic Didone'}>
                    {plant.plant_name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
      <br />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <LogOutButton className="btn" />
      </div>
    </main>
  );
}

export default UserPage;
