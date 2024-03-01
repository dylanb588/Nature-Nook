import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Card, CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button } from '@mui/material';

import './Notes.css'


function Notes(props) {
    const notes = useSelector(store => store.notes);
    const plantID = props.plant.id;
    const dispatch = useDispatch();
    const [note, setNote] = useState('');

    useEffect(() => {
        dispatch({type: 'FETCH_NOTES'})
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
    
        // Check if the note is not empty
        if (note.trim() !== '') {
            // Call addNote function with the current note value
            addNote(note);
        } else {
            // Display an error message or handle the empty note case appropriately
            console.error('Note cannot be empty');
        }
    };

    function addNote() {
        let plantObj = {
            plantID,
            note
        };
        dispatch({type: 'ADD_NOTE', payload: plantObj});
        setNote('');
    }

    function deleteNote(noteID) {
        dispatch({type: 'DELETE_NOTE', payload: noteID});
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit format for month
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit format for day
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = String(hours % 12 || 12).padStart(2, '0'); // Ensure two-digit format for hours
        const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure two-digit format for minutes
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        return `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    return(
        <Container sx={{maxWidth: 900, marginTop: 8}}>
            <Typography align='center' variant='h3'>
                Notes
            </Typography>
            {notes?.length > 0 ? (
                notes.filter((n) => n.plant_id === plantID).map(note => (
                    <Container>
                    <div key={note.id}>
                        <p>{note.note}</p>
                        <Typography variant="caption" color="textSecondary">
                        Posted at: {formatDate(note.posted)}
                        </Typography>
                        <IconButton onClick={() => deleteNote(note.id)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    </Container>
                ))
            ) : (
                <h3>No Notes</h3>
            )}
            <form onSubmit={handleSubmit}> 
                <TextField 
                    name='note'
                    label='Add new note'
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    sx={{ width: '100%', marginBottom: 2 }}
                    variant='filled'
                    required
                />
                <Button type='submit' >Add Note</Button>
            </form>
        </Container>
    )
}

export default Notes;