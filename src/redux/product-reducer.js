import {productAPI} from "../api/api";
import {actionSetCategory} from "./main-reducer";
import {requester} from "../api/apiPost";
import axios from "axios";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const ADD_REVIEW = 'ADD_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const SET_PRODUCT = 'SET_CATEGORY';
const SET_REVIEW_TEXT = 'SET_REVIEW_TEXT';

let initialState = {
    id: null,
    maimImage: null,
    images: [],
    name: null,
    price: null,
    description: null,
    categoryes: [],
    materials: null,
    available: null,
    reviews: [],
    isFetching: true,
    reviewInput: ''
}


export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
            ;
        case DELETE_REVIEW: {
            return {
                ...state,
                reviews: action.reviews,
                id: action.id
            }
        }
        case ADD_REVIEW: {
            let review = action.reviews[action.reviews.length - 1];
            return {
                ...state,
                reviews: [...state.reviews.push(review)],
            }
        }
        case SET_PRODUCT: {

            return {
                ...state,
                id: action.id,
                maimImage: action.maimImage,
                images: action.images,
                name: action.name,
                price: action.price,
                description: action.description,
                categoryes: action.categoryes,
                materials: action.materials,
                available: action.available,
                reviews:action.reviews,
            }
        }
        case SET_REVIEW_TEXT:{
            console.log(action.value)
            return {
                reviewInput: action.value
            }
        }
        default:
            return state;

    }


}

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const actionAddReview = (id, reviews) => ({type: ADD_REVIEW, id, reviews})
export const actionDeleteReview = (id, reviews) => ({type: ADD_REVIEW, id, reviews})
export const actionSetProduct = (product) => ({type: SET_PRODUCT, product})
export const actionAddToBasket = () => ({})
export const actionChangeInputReview = (value) => ({type: SET_REVIEW_TEXT, value})





export const thunkAddReview = (id, review) => {
    return (dispatch) => {
        axios.post(`http://localhost:8080/products/review/add/` + id, review, {withCredentials:true}).then(data=> console.log(data.data)).catch(e=> console.log(e))

    }
}
export const thunkDeleteReview = (id) => {
    return (dispatch) => {
        productAPI.deleteReview(id).then(response => {
            dispatch(actionDeleteReview(id, response.data.reviews))
        })
    }
}

export const thunkMainPage = () => {
    return (dispatch) => {
        productAPI.getMainProducts().then(response => {
            dispatch(actionSetCategory(response.data))
        })
    }
}

export const thunkGetProduct = (id) => {
    return (dispatch) => {
        productAPI.getProduct(id).then(response => {
            dispatch(actionSetProduct(response.data))
        }).catch(e=> console.log(e))
    }
}