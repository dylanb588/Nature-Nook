import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

function Comments(){
    const comments = useSelector((store) => store.comment);
    const dispatch = useDispatch();
    const { messageID } = useParams();
    console.log(messageID);

    console.log('Here be comments', comments);

    useEffect(() => {
        dispatch({type: 'FETCH_COMMENT', payload: messageID})
    }, []);

    return(
        <h1>Comments!</h1>
    )
}

export default Comments;