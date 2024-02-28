import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';

function Comments(props) {
    const comments = useSelector((store) => store.comment);
    const messageID = props.message.id;
    const userID = props.user.id;

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch({type: 'FETCH_COMMENT'});
    }, []);

    function addComment() {
        let commentObj = {
            messageID,
            comment
        }
        dispatch({type: 'ADD_COMMENT', payload: commentObj});
        setComment('')
    }

    function deleteComment(commentID) {
        dispatch({type: 'DELETE_COMMENT', payload: commentID});
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
        <Container>
            {comments?.length > 0 ? (
                comments.filter((c) => c.message_id === messageID).map(comment => (
                    <Card key={comment.id} sx={{ width: 600 }}>
                <CardContent>
                    <Typography variant="body1">
                        {comment.comment}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Posted by: {comment.username} at {formatDate(comment.posted_time)}
                    </Typography>
                    {userID === comment.author && (
                        <IconButton onClick={() => deleteComment(comment.id)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </CardContent>
            </Card>
                ))
            ) : (
                <h3>No Comments</h3>
            )}
            <TextField
                name='comment'
                label='Add a comment'
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                style={{width: 800}}
                required
            />
            <Button onClick={() => addComment()}>Add Comment</Button>
        </Container>
    )
}

export default Comments;

