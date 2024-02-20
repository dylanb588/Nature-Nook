import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { Typography, Button, Card, CardContent, CardMedia, Stack } from '@mui/material';

function PlantDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const plants = 
}