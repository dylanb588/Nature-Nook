import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';


function MessageBoard(){
    const messages = useSelector((store) => store.message);
    const [newMessage, setNewMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_MESSAGE'})
    }, []);

    function addMessage() {
        dispatch({type: 'ADD_MESSAGE', payload: newMessage})
        setNewMessage('');
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = String(hours).padStart(2, '0'); // Ensure two-digit format for hours
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    return(
    <div>
        {messages.map((message, index) => (
            <Card key={index}>
                <CardContent>
                    <Typography variant="body1">
                        {message.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Posted by: {message.username} at {formatDate(message.posted_at)}
                    </Typography>
                </CardContent>
            </Card>
            ))}
        <TextField 
            name='note'
            label='Add a New Message'
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            style={{width: 1000}}
            required
        />
        <Button onClick={() => addMessage()}>Post Message</Button>
    </div>
    )
}

export default MessageBoard;