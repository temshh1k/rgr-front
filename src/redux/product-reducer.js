import {productAPI} from "../api/api";
import {actionSetCategory} from "./main-reducer";
const TOGGLE_IS_FETCHING ='TOGGLE_IS_FETCHING';
const ADD_REVIEW ='ADD_REVIEW';
const DELETE_REVIEW ='DELETE_REVIEW';
const SET_PRODUCT = 'SET_CATEGORY';

let initialState = {
    product: {
        id: null,
        maimImage: null,
        images:[],
        name: null,
        price: null,
        description: null,
        categoryes: [],
        materials: null,
        available: null,
        reviews: [
        ],
        rating: null,

    },
    isFetching: true
}


export const productReducer =( state = initialState, action) =>{
    switch (action.type){
        case TOGGLE_IS_FETCHING:{
            return  {
                ...state,
                isFetching: action.isFetching
            }
        };
        case DELETE_REVIEW:{
            return {
                ...state,
                reviews: action.product.reviews,
                id: action.id
            }
        }
        case ADD_REVIEW:{
            return {
                ...state,
                reviews: action.product.reviews,
                id: action.id
            }
        }
        case SET_PRODUCT:{
            return {
                ...state,
                product: action.product
            }
        }
        default:
            return state;

    }


}

export const toggleIsFetching =(isFetching) => ({type : TOGGLE_IS_FETCHING, isFetching})
export const actionAddReview = (id, reviews) => ({type: ADD_REVIEW, id, reviews})
export const actionDeleteReview = (id, reviews) => ({type: ADD_REVIEW, id, reviews})
export const actionSetProduct = (product)=>({type: SET_PRODUCT, product})
export const actionAddToBasket = ()=>({})

export const thunkAddReview = (id) =>{
    return (dispatch) =>{
        productAPI.addReview(id).then(response =>{
            dispatch(actionAddReview(id, response.reviews))
        })
    }
}
export const thunkDeleteReview = (id) =>{
    return (dispatch) =>{
        productAPI.deleteReview(id).then(response =>{
            dispatch(actionDeleteReview(id, response.reviews))
        })
    }
}

export const thunkMainPage = () =>{
    return  (dispatch) =>{
        productAPI.getMainProducts().then(response =>{
            dispatch(actionSetCategory(response.data))
        })
    }
}

export const thunkGetProduct =(id)=>{
    return (dispatch)=>{
        productAPI.getProduct(id).then(response=>{
            dispatch(actionSetProduct(response.data))
        })
    }
}