import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchComments(action){
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

function* addComment(action) {
    try {
        yield axios.post(`/api/comment`, action.payload);
        yield put({type: 'FETCH_COMMENT'});
    } catch(error) {
        console.log('Error adding comment', error);
    }
}

function* deleteComment(action) {
    try {
        yield axios.delete(`/api/comment/delete/${action.payload}`)
        yield put({type: 'FETCH_COMMENT'})
    } catch(error) {
        console.log('Error deleting comment', error);
    }
}

function* commentSaga() {
    yield takeLatest('FETCH_COMMENT', fetchComments);
    yield takeLatest('ADD_COMMENT', addComment);
    yield takeLatest('DELETE_COMMENT', deleteComment);
}

export default commentSaga;