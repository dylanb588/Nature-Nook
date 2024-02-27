import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Comments() {
    const [newComment, setNewComment] = useState('');

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
            <TextField
                name='comment'
                label='Add a Comment'
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                style={{ width: 1000 }}
                required
            />
            <Button >Post Comment</Button>
        </>
    );
}

export default Comments;