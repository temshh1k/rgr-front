import {Card, Col, Image, Row} from "react-bootstrap";
import s from './Products.module.css'
import img from "../../../assets/1DR.png";
import {NavLink} from "react-router-dom";

const ProductList = (props) =>{

    console.log(props.categories);
    return(
       <Row className={s.item}>
           {props.categories.products.map(e=>
               <div>
                   <Image className={s.img} src={e.photo}/>
                   <div>
                       <NavLink to={'/product/' + e.id}>
                           {e.name}
                       </NavLink>

                   </div>
                   <div>
                       {props.namecat}
                   </div>

               </div>

           )}
       </Row>
    )
}

export default ProductList;