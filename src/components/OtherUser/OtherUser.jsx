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

    useEffect(() => {
        dispatch({type: 'FETCH_OTHER_PLANTS', payload: userID})
        return () => dispatch({type: 'CLEAR_PLANTS'})
    }, [dispatch]);

    return (
    <main>
        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap">
            {plants?.length > 0 ? (
            plants.map(plant => (
            <Card key={plant.id} sx={{ width: 300, backgroundColor: "#989F7E" }}>
                <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={plant.plant_image}
                    alt={plant.plant_name}
                />
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

export default OtherUser;