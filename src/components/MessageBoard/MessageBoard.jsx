import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function MessageBoard(props){
    const messages = useSelector((store) => store.message);
    const userID = props.user.id;
    const [newMessage, setNewMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();



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

    function deleteMessage(messageID) {
        dispatch({type: 'DELETE_MESSAGE', payload: messageID});
    }
    const goToMessageComments = (message) => {
        history.push(`/message/${message.id}`);
    };

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
        {messages.map((message) => ( 
            <Card key={message.id}>
                <CardContent>
                    <Typography onClick={() => goToMessageComments(message)} variant="body1">
                        {message.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Posted by: {message.username} at {formatDate(message.posted_at)}
                    </Typography>
                    {userID === message.posted_by && (
                        <IconButton onClick={() => deleteMessage(message.id)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </CardContent>
            </Card>
        ))}
        <TextField 
            name='message'
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