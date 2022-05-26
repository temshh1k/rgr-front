import {Image, Row} from "react-bootstrap";
import s from "../ProductList/Products.module.css";
import st from "./FindStyles.module.css"
import {NavLink} from "react-router-dom";
import axios from "axios";


export const FindProduct = (props) =>{

    function addBasket(id) {
        axios.post("http://localhost:8080/api/profile/basket/add/" + id, null, {withCredentials: true}).then(data => console.log(data.data))
    }

    let addFav = (id) => {
        axios.post("http://localhost:8080/api/profile/favorites/add/" + id, {}, {withCredentials: true}).then(data => console.log(data.data))
    }

    return (
        <div>
            <Row className={s.item}>
                    <div className={st.contProduct}>
                        <Image className={s.img} src={props.product.photo}/>
                        <div>
                            <NavLink to={'/product/' + props.product.id}>
                                {props.product.name + ' ' + props.product.id}
                            </NavLink>
                        </div>
                        <div className={st.info}>
                            {"Цена " + props.product.price + " Рейтинг "}{props.product.rating ? String(props.product.rating).slice(0,3) : 0}
                        </div>
                        <div className={st.but}>
                            <button>Избранное</button>
                            <button>Корзина</button>
                        </div>
                    </div>

            </Row>

        </div>
    )


}