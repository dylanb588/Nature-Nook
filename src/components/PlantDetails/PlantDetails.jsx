import { useEffect, useState } from "react";
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
    const plant = plants[0];
    const { id } = useParams();
    const [countdown, setCountdown] = useState(() => {
        // Try to retrieve countdown value from local storage
        const storedCountdown = localStorage.getItem('countdown');
        return storedCountdown ? parseInt(storedCountdown, 10) : plant?.water || 0;
    });
    const [backgroundColor, setBackgroundColor] = useState('#C4D5C5');

    // Pulls the single plant out of the array

    // Gets the single plants's info.
    useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_PLANT', payload: id })
    }, [id]);


    useEffect(() => {
        const interval = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 2000); // 24 hours in milliseconds
        localStorage.setItem('countdown', countdown);
        

        // 86400000
        return () => clearInterval(interval);
    }, [countdown]);

    useEffect(() => {
        if (plant) {
            // Calculate the percentage of remaining days
            const percentageRemaining = (countdown / plant.water) * 100;

            // Update background color based on percentage remaining
            if (percentageRemaining >= 70) {
                setBackgroundColor('#C4D5C5'); // Green
            } else if (percentageRemaining >= 30) {
                setBackgroundColor('#FFD700'); // Yellow
            } else {
                setBackgroundColor('#FF6347'); // Red
            }
        }
    }, [countdown, plant]);
    
    function resetCountdown() {
        setCountdown(plant.water);
    }

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
                    <Card sx={{ maxWidth: 600, margin: 8, padding: 2, backgroundColor }}>
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
                                <Typography variant="body1">Next water in <strong>{countdown}</strong> days</Typography>
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
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={resetCountdown}
                                >
                                        Watered
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