import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button } from '@mui/material';

function Comments(props) {
    const comments = useSelector(store => store.comment);
    console.log('Comment props', props);
    const messageID = props.message.id;

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch({type: 'FETCH_COMMENT', payload: messageID});
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

    return(
        <Container>
            {comments?.length > 0 ? (
                comments.filter((c) => c.message_id === messageID).map(comment => (
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <IconButton onClick={() => deleteComment(comment.id)} aria-label='delete'>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))
            ) : (
                <h3>No Comments</h3>
            )}
            <TextField
                name='note'
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

