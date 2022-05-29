import {useEffect, useState} from "react";
import axios from "axios";
import isDivisibleBy from "validator/es/lib/isDivisibleBy";
import {Image, Row} from "react-bootstrap";
import s from "../ProductList/Products.module.css"
import {NavLink} from "react-router-dom";
import st from "./ProfileStyles.module.css"


const Favorites = (props) =>{

    let [fetching, setFetching] = useState(true)

    let [myProducts, setMyProductsList] = useState(
        {
            products:[]
        }
    );

    let deleter = (id) =>{
        axios.delete("http://localhost:8080/api/profile/favorites/add/" + id, {withCredentials: true}).then(data=>{
                setMyProductsList(
                    {
                        ...myProducts,
                        products: [...data.data]
                    }
                )
            }
        )
    }


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:8080/api/profile/favorites", {withCredentials: true}).then(data => {
                    return data.data;
                }
            );
            setMyProductsList({
                ...myProducts,
                products: result.products
                }
            )

            setFetching(false)
        };
        fetchData();
    }, []);


    return(
        <div>
            <div className={st.head}>список избранного</div>
            <div>
            {fetching ? "Loading..." : <div className={st.favPane}>

                {myProducts.products.map(e=>
                    <Row className={s.item}>
                        <div className={st.contProduct}>
                            <Image className={s.img} src={e.photo}/>
                            <div>
                                <NavLink to={'/product/' + e.id}>
                                    {e.name}
                                </NavLink>
                            </div>
                            <div className={st.info}>
                                {"Цена " + e.price + " Рейтинг "}{e.rating ? String(e.rating).slice(0,3) : 0}
                            </div>
                            <div className={st.but}>
                                <button onClick={()=>deleter(e.id)}>Удалить</button>
                            </div>
                        </div>

                    </Row>
                )}
            </div>

            }
            </div>
        </div>
    )


}

export default Favorites;