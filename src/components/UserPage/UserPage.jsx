import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom'
import './UserPage.css'

import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


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
      <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap">
        {plants?.length > 0 ? (
          plants.map(plant => (
            <Card key={plant.id} sx={{ width: 300 }} style={{backgroundColor: "#989F7E"}}>
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
                <Typography gutterBottom variant="h5" component="div" align='center'>
                  {plant.plant_name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      ))
      ) : (
        <CircularProgress color="success" align="center"/>
        )}
      </Stack>
      <br />
        <LogOutButton className="btn" />
    </main>
  );
}

export default UserPage;
