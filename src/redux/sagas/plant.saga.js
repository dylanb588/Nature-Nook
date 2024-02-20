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

function* fetchSinglePlant(action) {
    try{
        const plantID = action.payload;
        console.log('Here be action payload', plantID);
        const singlePlant = yield axios.get(`/api/plant/${plantID}`);

        yield put({ type: 'SET_SELECTED_PLANT', payload: singlePlant.data })
    } catch(error) {
        console.log("Error getting single plant", error);
    }
}

function* plantSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants);
    yield takeLatest('FETCH_SELECTED_PLANT', fetchSinglePlant);
}

export default plantSaga;