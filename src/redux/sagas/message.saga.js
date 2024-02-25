import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMessage() {
    try{
        const response = yield axios.get('/api/plant');
    
        yield put({
            type: 'SET_MESSAGE',
            payload: response.data
        });
    } catch (error) {
        console.log("Fetch message error:", error);
    }
}

function* messageSaga() {
    yield takeLatest('FETCH_MESSAGE', fetchMessage);
}

export default messageSaga;