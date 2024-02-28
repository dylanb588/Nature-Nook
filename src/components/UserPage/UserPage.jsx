import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom'

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
      <div className="container">
        <h2 align='center'>Welcome, {user.username}!</h2>
      </div>
      <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap">
        {plants?.length > 0 ? (
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
      <br />
        <LogOutButton className="btn" />
    </main>
  );
}

export default UserPage;
