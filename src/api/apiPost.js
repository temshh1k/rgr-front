import axios from "axios";

const url = "http//:localhost:8080/api/"

export let requester = {
    addReview : (id, review)=>{
        return axios.post(url + "products/review.",  review, {withCredentials: true});
    }


}
