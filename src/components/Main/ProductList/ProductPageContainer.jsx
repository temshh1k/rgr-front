
import React from "react";

import {connect} from "react-redux";
import {
    actionChangeInputReview,
    onChangeInputReview,
    thunkAddReview,
    thunkGetProduct
} from "../../../redux/product-reducer";
import ProductPage from "./ProductPage";

class ProductPageContainer extends React.Component{



    componentDidMount() {
        this.props.thunkGetProduct(5);
    }


    render() {
        let path = window.location.href.split("/");
        let id = path[path.length - 1]
       return <div>
           <ProductPage productInfo={this.props.product} id={id}/>
       </div>
   }
}






let mapStateToProps = (state)=>{
    return{
        product: state.productPage,
    }
}

let dispatch ={
    thunkGetProduct: thunkGetProduct,
    thunkReviewAdd: thunkAddReview

}

export default  connect(mapStateToProps, dispatch)(ProductPageContainer);