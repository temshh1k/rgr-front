import {Button, Card, Col, Image, Row} from "react-bootstrap";
import s from './Products.module.css'
import {NavLink} from "react-router-dom";

const ProductPage = (props) =>{

    console.log(props.productInfo)

    return(
        <div className={s.mainContainer}>
            <div className={s.imageContainer}>
                <Image className={s.mainImage} src={props.productInfo.maimImage}/>
                <div className={s.imagesSecondCont}>
                    {props.productInfo.images.map(e=>
                        <div className={s.imagesSecondCont}>
                                <Image className={s.images} src={e}/>
                        </div>)}
                </div>

            </div>
            <div>
                <div>
                    {props.productInfo.name}
                </div>
                <div>
                    {props.productInfo.price}
                </div>
                <div>
                    <button>Добавить в корзину</button>
                </div>
                <div>
                    {props.productInfo.description}
                </div>

            </div>
            <div>

                <div>
                    {props.productInfo.materials}
                </div>
                <div>
                    <div>
                        {props.productInfo.reviews}
                    </div>
                    <div>
                        <input placeholder='Напишите свой отзыв...'/>
                    </div>
                    <div>
                        <button>Оставить отзыв</button>
                    </div>
                </div>
            </div>
            <div>
                {}
            </div>
        </div>

    )
}

export default ProductPage;