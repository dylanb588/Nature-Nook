import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button } from '@mui/material';


function Notes(props) {
    const notes = useSelector(store => store.notes);
    console.log('Notes store', notes);
    console.log('Plant:', props);
    const plantID = props.plant.id;
    console.log(plantID);
    const dispatch = useDispatch();
    const [note, setNote] = useState('');



    useEffect(() => {
        dispatch({type: 'FETCH_NOTES'})
    }, []);


    function addNote() {
        let plantObj = {
            plantID,
            note
        }
        dispatch({type: 'ADD_NOTE', payload: plantObj})
        setNote('');
    }

    // function deleteNote(noteID) {
    //     dispatch({type: 'DELETE_NOTE', payload: noteID})
    // }

    return(
        <Container>
            {notes?.length > 0 ? (
                notes.filter((n) => n.plant_id === plantID).map(note => (
                    <div key={note.id}>
                        <p>{note.note}</p>
                        <IconButton onClick={() => deleteNote(note.id)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))
            ) : (
                <CircularProgress color="success" align="center"/>
            )}
            <TextField 
                name='note'
                label='Add new note'
                value={note}
                onChange={(event) => setNote(event.target.value)}
                style={{width: 800}}
                required
            />
            <Button onClick={() => addNote()}>Add Note</Button>
        </Container>
    )
}

export default Notes;