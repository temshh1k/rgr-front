import productList from "../components/Main/ProductList/ProductList";
import {productAPI} from "../api/api";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_CATEGORY = 'SET_CATEGORY';


let initialState = {
    categories: [],
    isFetching: true,

}

export const mainReducer =( state = initialState, action) =>{
    switch (action.type) {
        case TOGGLE_IS_FETCHING:{
            return  {
                ...state,
                isFetching: action.isFetching
            }
        };
        case SET_CATEGORY:{
            return  {
                ...state,
                categories: action.categories
            }
        };
        default:
            return state;
    }
}

export const toggleIsFetching =(isFetching) => ({type : TOGGLE_IS_FETCHING, isFetching})

export const thunkMainPage = () =>{
    return  (dispatch) =>{
         productAPI.getMainProducts().then(response =>{
             dispatch(actionSetCategory(response.data))
         })
    }
}

export let actionSetCategory = (categories) =>({type: SET_CATEGORY, categories: categories})