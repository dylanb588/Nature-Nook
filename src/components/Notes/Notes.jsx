import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom/cjs/react-router-dom";

import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Button } from '@mui/material';


function Notes() {
    const notes = useSelector(store => store.notes);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [note, setNote] = useState('');

    useEffect(() => {
        dispatch({type: 'FETCH_NOTES', payload: id})
    }, [id]);


    

    return(
        <Container>
            {notes ? (
                notes.map(note => (
                    <div key={note.id}>
                        <p>{note.note}</p>
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
            <Button>Add Note</Button>
        </Container>
    )
}

export default Notes;