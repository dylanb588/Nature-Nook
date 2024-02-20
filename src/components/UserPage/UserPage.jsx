import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom'

import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const plants = useSelector((store) => store.plants);
  console.log(plants);

  useEffect(() => {
    dispatch({type: 'FETCH_PLANTS'})
  }, []);

  return (
    <main>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <LogOutButton className="btn" />
      </div>
      <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap">
        {plants ? (
          plants.map(plant => (
          <Card key={plant.id} sx={{ width: 300 }}>
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
                <Typography gutterBottom variant="h5" component="div">
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
    </main>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
