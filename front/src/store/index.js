import {legacy_createStore, combineReducers, compose, applyMiddleware} from 'redux';
//import { configureStore } from '@reduxjs/toolkit'

import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';

const rootReducers = combineReducers({
    auth: authReducer
})

const middleware = [thunkMiddleware];

const store = legacy_createStore(rootReducers, compose(applyMiddleware(...middleware), 
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ () ));

 export default store;