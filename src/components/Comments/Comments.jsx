import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Comments(){
    const comments = useSelector((store) => store.comment);
    const messages = useSelector((store) => store.selectedMessage);
    const [newComment, setNewComment] = useState('');
    const dispatch = useDispatch();
    const { messageID } = useParams();

    const message = messages[0];

    useEffect(() => {
        dispatch({type: 'FETCH_SINGLE_MESSAGE', payload: messageID});
        dispatch({type: 'FETCH_COMMENT', payload: messageID});
    }, []);

    function addComment() {
        const commentObject = {
            message_id: message.id,
            comment: newComment
        };
        dispatch({type: 'ADD_COMMENT', payload: commentObject});
        setNewComment('');
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
        <>
        {message ? (
            <Card key={message.id}>
            <CardContent>
                <Typography variant="body1">
                    {message.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Posted by: {message.username} at {formatDate(message.posted_at)}
                    </Typography>
                </CardContent>
            </Card>
            ) : (
                <CircularProgress color="success" align="center"/>
            )}
        <TextField 
            name='comment'
            label='Add a Comment'
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            style={{width: 1000}}
            required
        />
        <Button onClick={() => addComment()}>Post Comment</Button>
        </>
    )
}

export default Comments;