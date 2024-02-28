import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchNotes() {
    try {
        const response = yield axios.get(`/api/note`);

        yield put({
            type: 'SET_NOTES',
            payload: response.data
        });
    } catch(error) {
        console.log('Fetch Notes error:', error);
    }
}

function* addNote(action) {
    try {
        yield axios.post(`/api/note/`, action.payload);
        yield put({type: 'FETCH_NOTES'});
    } catch(error) {
        console.log('Error adding note', error);
    }
}

function* deleteNote(action) {
    yield axios.delete(`/api/note/${action.payload}`);
    yield put({type: 'FETCH_NOTES'});
}

function* noteSaga() {
    yield takeLatest('FETCH_NOTES', fetchNotes);
    yield takeLatest('ADD_NOTE', addNote);
    yield takeLatest('DELETE_NOTE', deleteNote);
}

export default noteSaga;