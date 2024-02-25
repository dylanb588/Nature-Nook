import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';


function MessageBoard(){
    const messages = useSelector((store) => store.message);
    const dispatch = useDispatch();


    console.log('Here is message', messages);

    useEffect(() => {
        dispatch({type: 'FETCH_MESSAGE'})
    }, []);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
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
    </div>
    )
}

export default MessageBoard;