import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function MessageBoard(){
    const messages = useSelector((store) => store.message);
    const dispatch = useDispatch();

    console.log('Here is message', messages);

    useEffect(() => {
        dispatch({type: 'FETCH_MESSAGE'})
    }, []);

    return(
        <div>

        </div>
    )
}

export default MessageBoard;