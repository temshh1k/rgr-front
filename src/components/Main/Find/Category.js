import {useState, useEffect} from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom'
import s from "./FindStyles.module.css";
import {FindProduct} from "./FindProduct";

const Category = (props) =>{


    const location = useLocation();

    let [products, setProducts] = useState([]);
    let [fetching, setFetching] = useState();

    useEffect(() => {
        let find = {
            text: location.pathname.split("/")[location.pathname.split("/").length - 1]
        }
        const fetchData = async () => {
            const result = await axios.post("http://localhost:8080/api/products/find/category?size=10&count=1",find, {withCredentials: true}).then(data => {
                    return data.data.products
                }
            );
            setProducts([...products,result])
        };
        fetchData();
    }, []);

    console.log(products)
    return (
        <div>
            {fetching ? "Loading..." : <div className={s.findPane}>
                {products.map(e => <div className={s.productOnPane}><FindProduct product={e}/></div>)}
            </div>}

        </div>
    )

}

export default Category;