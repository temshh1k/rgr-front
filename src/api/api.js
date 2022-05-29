import * as axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL:'http://localhost:8080/api/'
})

export const productAPI={
    getMainProducts: () =>{
        return instance.get('products/main')
    },
    addReview : (id, review)=>{
        return instance.post('products/review/add/5',  review, {withCredentials: true});
    },
    deleteReview: (id)=>{
        return instance.post('products/review/delete/' + id)
    },
    getProduct: (id)=>{
        return instance.get('products/get/' + id)
    },
    getProductPhoto: (path)=>{
        return instance.get('products/photo/' + path)
    },
    getName: (name)=>{
        return instance.get('products/name/' + name)
    },

}