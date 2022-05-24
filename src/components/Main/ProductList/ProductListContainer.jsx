import React from "react";
import {connect} from "react-redux";
import {thunkMainPage} from "../../../redux/main-reducer";
import ProductList from "./ProductList";

class ProductListContainer extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.thunkMainPage()

    }
    render() {

        return <div>
            {this.props.categories.map(e=><div>
                  <ProductList categories={e}
                                namecat={e.name}/>
                </div>)
            }

        </div>
    }
}

let mapStateToProps = (state)=>{
    return{
        categories: state.mainPage.categories
    }
}

let dispatch ={
   thunkMainPage: thunkMainPage
}

export default  connect(mapStateToProps, dispatch)(ProductListContainer);
