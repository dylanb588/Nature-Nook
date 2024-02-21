import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchNotes(action) {
    try {
        const plantID = action.payload;
        const response = yield axios.get(`/api/note/${plantID}`);

        yield put({
            type: 'SET_NOTES',
            payload: response.data
        });
    } catch(error) {
        console.log('Fetch Notes error:', error);
    }
}

function* noteSaga() {
    yield takeLatest('FETCH_NOTES', fetchNotes);
}

export default noteSaga;