import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMessage() {
    try{
        const response = yield axios.get('/api/message');
    
        yield put({
            type: 'SET_MESSAGE',
            payload: response.data
        });
    } catch (error) {
        console.log("Fetch message error:", error);
    }
}

function* addMessage(action) {
    try {
        console.log('Message saga', action.payload);
        yield axios.post(`/api/message`, action.payload);
        yield put({type: 'FETCH_MESSAGE'});
    } catch(error) {
        console.log('Error adding note', error);
    }
}


function* messageSaga() {
    yield takeLatest('FETCH_MESSAGE', fetchMessage);
    yield takeLatest('ADD_MESSAGE', addMessage);
}

export default messageSaga;