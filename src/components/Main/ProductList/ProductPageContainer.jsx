
import React from "react";

import {connect} from "react-redux";
import {thunkGetProduct} from "../../../redux/product-reducer";
import ProductPage from "./ProductPage";

class ProductPageContainer extends React.Component{

    componentDidMount() {
        this.props.thunkGetProduct(5);
    }

    render() {

       return<div>
           <ProductPage productInfo={this.props.product}/>
       </div>

   }
}

let mapStateToProps = (state)=>{
    return{
        product: state.productPage.product
    }
}

let dispatch ={
    thunkGetProduct: thunkGetProduct

}

export default  connect(mapStateToProps, dispatch)(ProductPageContainer);