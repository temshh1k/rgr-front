import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {mainReducer} from "./main-reducer";
import {productReducer} from "./product-reducer";
let reducers = combineReducers({
    productPage: productReducer,
    mainPage: mainReducer,


})


let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
