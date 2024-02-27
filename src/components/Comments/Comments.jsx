import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Comments() {
    const {messageID} = useParams();
    const dispatch = useDispatch();
    const comments = useSelector((store) => store.comment);
    const [newComment, setNewComment] = useState('');

    const message = comments[0];
    console.log(message);

    console.log(comments);

    useEffect(() => {
        dispatch({type: 'FETCH_COMMENT', payload: messageID})
    }, []);

    const handlePostComment = () => {
        // Dispatch an action to post the new comment to the server
        dispatch({
            type: 'POST_COMMENT',
            payload: {
                messageID,
                comment: newComment
            }
        });
        // Clear the input field after posting the comment
        setNewComment('');
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear().toString().slice(-2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = String(hours % 12 || 12).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        return `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    return (
        <>
            <Card key={message.id}>
                <CardContent>
                    <Typography variant="body1">
                        {message.associated_message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Posted by: {message.message_poster_username}
                    </Typography>
                </CardContent>
            </Card>
            <br />
            <h3 align='center'>Comments</h3>
            {comments.map((comment) => ( 
            <Card key={comment.id}>
                <CardContent>
                    <Typography variant="body1">
                        {comment.comment}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Posted by: {comment.commenter_username} at {formatDate(comment.posted_time)}
                    </Typography>
                </CardContent>
            </Card>
        ))}
            <TextField
                name='comment'
                label='Add a Comment'
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                style={{ width: 1000 }}
                required
            />
            <Button onClick={() => handlePostComment()}>Post Comment</Button>
        </>
    );
}

export default Comments;