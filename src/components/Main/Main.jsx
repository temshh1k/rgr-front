import s from './Main.module.css';
import ProductList from "./ProductList/ProductList";
import ProductListContainer from "./ProductList/ProductListContainer";
const Main = (props) =>{
    return(
        <div className={s.main}>
            <div>
                <ProductListContainer/>
            </div>

        </div>
    )
}

export default Main;