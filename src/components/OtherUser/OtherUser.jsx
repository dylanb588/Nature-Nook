import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from "react-router-dom/cjs/react-router-dom";


import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function OtherUser() {
    const dispatch = useDispatch();
    const plants = useSelector((store) => store.plants);
    const { userID } = useParams();
    const username = plants.length > 0 ? plants[0].username : '';
    console.log(username);

    useEffect(() => {
        dispatch({type: 'FETCH_OTHER_PLANTS', payload: userID})
        return () => dispatch({type: 'CLEAR_PLANTS'})
    }, [dispatch]);

    return (
    <main>
        <div className="welcomeContainer">
            <img className='vine' src='/vine-146978_640.png' />
            <h2 className='welcome' align='center'>Welcome to {username}'s Nature Nook!</h2>
            <img className='image' src='/vine-146978_640.png' />
        </div>
        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap">
            {plants?.length > 0 ? (
            plants.map(plant => (
            <Card key={plant.id} sx={{ width: 300, backgroundColor: "#ACB4A3" }}>
                <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={plant.plant_image}
                    alt={plant.plant_name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div" align='center'>
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

export default OtherUser;