import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import plants from './plant.reducer';
import selectedPlant from './selectedPlant.reducer';
import notes from './note.reducer';
import search from './search.reducer';
import message from './message.reducer';
import selectedMessage from './selectedMessage.reducer';
import comment from './comment.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  plants, // Get the plants for that logged in user
  selectedPlant,
  notes,
  search,
  message,
  selectedMessage,
  comment
});

export default rootReducer;
