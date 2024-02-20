import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPlants() {
    try{
        const plantResponse = yield axios.get('/api/plant');
    
        yield put({
            type: 'SET_PLANTS',
            payload: plantResponse.data
        });
    } catch (error) {
        console.log("Fetch plants error:", error);
    }
}

function* plantSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants);
}

export default plantSaga;