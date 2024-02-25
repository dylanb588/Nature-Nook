import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMessage() {
    try{
        const response = yield axios.get('/api/plant');
    
        yield put({
            type: 'SET_MESSAGES',
            payload: response.data
        });
    } catch (error) {
        console.log("Fetch message error:", error);
    }
}