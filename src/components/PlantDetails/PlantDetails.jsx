import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { Typography, Button, Card, CardContent, CardMedia, Stack } from '@mui/material';

function PlantDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const plants = useSelector((store) => store.plants);
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_PLANT', payload: id })
    }, [id]);

    return(
        <Card sx={{ width: 500, margin: 'auto', padding: 2 }}>
            <CardContent>
            <Typography variant="h3" gutterBottom>
                {plants.plant_name} Details
            </Typography>
            {plants && (
                <Stack direction="column" spacing={2}>
                    <Typography variant="h4" component="h4">{plants.plant_name}</Typography>
                        <CardMedia
                            component="img"
                            height="580"
                            image={plants.plant_image}
                            alt={movie.title}
                        />
                    <Typography variant="body1">{plants.care}</Typography>
                    <Typography variant="body1">{plants.soil_type}</Typography>
                    <Typography variant="body1">Water about every {plants.water} days</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push(`/plants/${plants.id}/edit`)}
                    >
                        Edit
                    </Button>
                </Stack>
            )}
            </CardContent>
        </Card>
    )
}

export default PlantDetails;