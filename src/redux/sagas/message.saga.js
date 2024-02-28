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

function* fetchSingleMessage(action) {
    try{
        const messageID = action.payload;
        const response = yield axios.get(`/api/message/comments/${messageID}`);

        yield put({ type: 'SET_SELECTED_MESSAGE', payload: response.data })
    } catch(error) {
        console.log("Error getting single message", error);
    }
}

function* addMessage(action) {
    try {
        yield axios.post(`/api/message`, action.payload);
        yield put({type: 'FETCH_MESSAGE'});
    } catch(error) {
        console.log('Error adding note', error);
    }
}

function* deleteMessage(action) {
    yield axios.delete(`/api/message/${action.payload}`);
    yield put({type: 'FETCH_MESSAGE'});
}


function* messageSaga() {
    yield takeLatest('FETCH_MESSAGE', fetchMessage);
    yield takeLatest('FETCH_SINGLE_MESSAGE', fetchSingleMessage);
    yield takeLatest('ADD_MESSAGE', addMessage);
    yield takeLatest('DELETE_MESSAGE', deleteMessage);
}

export default messageSaga;