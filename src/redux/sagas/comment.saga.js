import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchComments(){
    try{
        const response = yield axios.get('/api/comment');
    
        yield put({
            type: 'SET_COMMENT',
            payload: response.data
        });
    } catch (error) {
        console.log("Fetch comment error:", error);
    }
}

function* commentSaga() {
    yield takeLatest('FETCH_COMMENT', fetchComments);
}

export default commentSaga;