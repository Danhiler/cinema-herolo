import {
    applyMiddleware,
    createStore
} from "redux";
import reducer from './reduxReducer'
import thunk from "redux-thunk";


const initialState = {
    movies: []
    , selectedMovie: {}
};

export const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk));