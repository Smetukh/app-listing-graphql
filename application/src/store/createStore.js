import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from './../reducers/';

const store = createStore(
    rootReducer, 
    // applyMiddleware(thunk)
);
console.log('store = ', store)
export default store;