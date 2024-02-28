import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography, TextField, Stack, CircularProgress } from '@mui/material';

function PlantEdit() {
    const dispatch = useDispatch();
    const history = useHistory();
    const plants = useSelector((store) => store.selectedPlant);
    console.log(plants);
    const { id } = useParams();

    // State to hold edited plant details
    const [editedPlant, setEditedPlant] = useState({
        plant_name: '',
        scientific_name: '',
        care: '',
        soil_type: '',
        water: '',
    });

    useEffect(() => {
        // Fetch plant details and populate form fields
        dispatch({ type: 'FETCH_SELECTED_PLANT', payload: id });
    }, [id]);

    // Update editedPlant state when plants are fetched
    useEffect(() => {
        setEditedPlant(plants[0]);
    }, [plants]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedPlant(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Dispatch action to update plant details
        dispatch({ type: 'EDIT_PLANT', payload: editedPlant });
        // Redirect user to plant details page
        history.push('/user');
    };

    return (
        plants[0] ? (
            <Card sx={{ width: 600, margin: 'auto', padding: 2 }}>
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        Edit {plants[0].plant_name}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <TextField
                                name="plant_name"
                                label="Plant Name"
                                value={editedPlant.plant_name}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                name="scientific_name"
                                label="Scientific Name"
                                value={editedPlant.scientific_name}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                name="care"
                                label="Care Instructions"
                                value={editedPlant.care}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                            />
                            <TextField
                                name="soil_type"
                                label="Soil Type"
                                value={editedPlant.soil_type}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                name="water"
                                label="Watering Frequency (days)"
                                type="number"
                                value={editedPlant.water}
                                onChange={handleChange}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Save Changes
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        ) : (
            <CircularProgress color="success" align="center"/>
        )
    );
}

export default PlantEdit;