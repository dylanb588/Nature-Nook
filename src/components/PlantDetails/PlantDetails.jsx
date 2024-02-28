import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import Notes from "../Notes/Notes";

import { Typography, Button, Card, CardContent, CardMedia, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function PlantDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const plants = useSelector((store) => store.selectedPlant);
    const { id } = useParams();

    // Pulls the single plant out of the array
    const plant = plants[0];

    // Gets the single plants's info.
    useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_PLANT', payload: id })
    }, [id]);

    function deletePlant(plantID) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // If user confirms deletion, dispatch the action and redirect
                dispatch({ type: 'DELETE_PLANT', payload: plantID });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your plant has been deleted.",
                    icon: "success"
                }).then(() => {
                    // Redirect after the success message is closed
                    history.push('/user');
                });
            }
        });
    }

    return (
        plant ? (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ maxWidth: 600, margin: 8, padding: 2 }}>
                        <CardContent>
                            <Typography variant="h3" gutterBottom>
                                {plant.plant_name} Details
                            </Typography>
                            <Stack direction="column" spacing={2}>
                                <Typography variant="h4" component="h4">{plant.scientific_name}</Typography>
                                <CardMedia
                                    component="img"
                                    height="580"
                                    image={plant.plant_image}
                                    alt={plant.plant_name}
                                />
                                <Typography variant="body1"><strong>Plant Care:</strong> {plant.care}</Typography>
                                <Typography variant="body1"><strong>Soil Type:</strong> {plant.soil_type}</Typography>
                                <Typography variant="body1"><strong>Watering:</strong> Water about every {plant.water} days</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => history.push(`/plantdetails/${plant.id}/edit`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={()=>deletePlant(plant.id)}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} sx={{ overflowY: 'auto'}}>
                    <Paper>
                        <Notes plant={plant}/>
                    </Paper>
                </Grid>
                </Grid>
            </Box>

        ) : (
            <CircularProgress color="success" align="center"/>
        )
        
    );
}

export default PlantDetails;