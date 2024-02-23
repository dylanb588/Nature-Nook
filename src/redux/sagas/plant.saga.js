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
        const singlePlant = yield axios.get(`/api/plant/details/${plantID}`);

        yield put({ type: 'SET_SELECTED_PLANT', payload: singlePlant.data })
    } catch(error) {
        console.log("Error getting single plant", error);
    }
}

function* fetchOtherPlants(action) {
    try{
        console.log('Here is action.payload', action.payload);
        const userID = action.payload;
        console.log(userID);
        const response = yield axios.get(`/api/plant/${userID}`);
        yield put({type: 'SET_PLANTS', payload: response.data});
    } catch(error) {
        console.log('Error getting other plants', error);
    }
}

function* editPlant(action) {
    try {
        console.log('Here be the edit', action.payload);
        const { id, plant_name, scientific_name, care, soil_type, water } = action.payload;
        yield axios.put(`/api/plant/${id}`, { plant_name, scientific_name, care, soil_type, water })
        yield put({type: 'FETCH_PLANTS'})
    } catch (error) {
        console.log('Error editing plant', error);
    }
}



function* deletePlant(action) {
    yield axios.delete(`/api/plant/${action.payload}`);
    yield put({type: 'FETCH_PLANTS'});
}

function* plantSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants);
    yield takeLatest('FETCH_SELECTED_PLANT', fetchSinglePlant);
    yield takeLatest('DELETE_PLANT', deletePlant);
    yield takeLatest('EDIT_PLANT', editPlant);
    yield takeLatest('FETCH_OTHER_PLANTS', fetchOtherPlants);
}

export default plantSaga;