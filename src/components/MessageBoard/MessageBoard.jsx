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
        const messageObject = {
            message: newMessage
        }
        dispatch({type: 'ADD_MESSAGE', payload: messageObject})
        setNewMessage('');
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