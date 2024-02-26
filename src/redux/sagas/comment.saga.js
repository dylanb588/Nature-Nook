import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchComments(action){
    try{
        const id = action.payload;
        console.log(id);
        const response = yield axios.get(`/api/comment/${id}`);
    
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