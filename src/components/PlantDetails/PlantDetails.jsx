import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { Typography, Button, Card, CardContent, CardMedia, Stack } from '@mui/material';

function PlantDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const plants = useSelector((store) => store.selectedPlant);
    const { id } = useParams();

    const plant = plants[0];

    useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_PLANT', payload: id })
    }, [id]);

    return(
        <Card sx={{ width: 500, margin: 'auto', padding: 2 }}>
            <CardContent>
            <Typography variant="h3" gutterBottom>
                {plant.plant_name} Details
            </Typography>
            {plant && (
                <Stack direction="column" spacing={2}>
                    <Typography variant="h4" component="h4">{plant.scientific_name}</Typography>
                        <CardMedia
                            component="img"
                            height="580"
                            image={plant.plant_image}
                            alt={plant.plant_name}
                        />
                    <Typography variant="body1">Care Instructions: {plant.care}</Typography>
                    <Typography variant="body1">Soil Type: {plant.soil_type}</Typography>
                    <Typography variant="body1">Water about every {plant.water} days</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push(`/plants/${plant.id}/edit`)}
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