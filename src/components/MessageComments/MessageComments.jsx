import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";

import Comments from "../Comments/Comments";

import { Typography, Button, Card, CardContent, CardMedia, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function MessageComments(props) {
    const dispatch = useDispatch();
    const messages = useSelector((store) => store.selectedMessage);
    const user = props.user;
    const { messageID } = useParams();


    const message = messages[0];

    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_MESSAGE', payload: messageID });
    }, [messageID]);

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

    return (
        message ? (
            <>
                <Card key={message.id}>
                <CardContent>
                    <Typography variant="body1">
                        {message.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Posted at: {formatDate(message.posted_at)}
                    </Typography>
                </CardContent>
            </Card>
            <Comments message={message} user={user}/>
            </>
        ) : (
            <CircularProgress color="success" align='center'/>
        )
    );
}

export default MessageComments;