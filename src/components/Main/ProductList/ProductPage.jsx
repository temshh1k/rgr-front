import {Button, Card, Col, Image, Row} from "react-bootstrap";
import s from './Products.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";

const ProductPage = (props) => {


    let path = window.location.href.split('/');
    let id = path[path.length - 1]

    const ell = React.createRef();
    const DOMEN_SERVER = 'http://localhost:8080/api/';


    let deleteRew = (id) => {
        axios.delete(DOMEN_SERVER + "products/review/delete?id=" + id, {withCredentials: true}).then(data => console.log(data.data))
    }

    function addBasket() {
        axios.post("http://localhost:8080/api/profile/basket/add/" + id, null, {withCredentials: true}).then(data => console.log(data.data))
    }

    let addFav = () => {
        axios.post(DOMEN_SERVER + "profile/favorites/add/" + id, {}, {withCredentials: true}).then(data => console.log(data.data))
    }


    let [fetch, setFetch] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:8080/api/products/get/" + id).then(data => {
                    return data.data;
                }
            );
            setProduct(result);
            setReviews(result.reviews)
            setFetch(false)
        };
        fetchData();
    }, []);

    let [reviewInput, changeInput] = useState('')

    let [reviews, setReviews] = useState([]);
    let [product, setProduct] = useState(null);

    let addReviews = () => {
        let review = {
            reviewText: reviewInput,
            rating: Number(ell.current.value)
        }
        axios.post(DOMEN_SERVER + `products/review/add/` + product.id, review, {withCredentials: true})
            .then(data => {
                let newRev = data.data.reviews[data.data.reviews.length - 1]
                setReviews([
                        ...reviews,
                        newRev
                    ]
                )
            })

    }

    return (

        <div className={s.mainContainer}>
            {fetch ? 'Loading...' :
                <div className={s.imageContainer}>
                    <Image className={s.mainImage} src={product.maimImage}/>
                    <div className={s.imagesSecondCont}>
                        {product.images.map(e =>
                            <div className={s.imagesSecondCont}>
                                <Image className={s.images} src={e}/>
                            </div>)}
                    </div>
                    <div>
                        <button onClick={addBasket}>Добавить в корзину</button>
                        <button onClick={addFav}>Добавить в избранное</button>
                    </div>
                    <div>
                        {product.description}
                    </div>
                    <div>
                        <div>
                            {product.materials}
                        </div>
                        <div>
                            <div>
                            </div>
                            <div>
                                <input placeholder='Напишите свой отзыв...' value={reviewInput}
                                       onChange={e => changeInput(e.target.value)}/>
                                <select name="select" ref={ell}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div>
                                <button onClick={addReviews}>Оставить отзыв</button>
                            </div>
                            <div className={s.reviews} id={'hello'}>
                                {reviews.map(e =>
                                    <div className={s.rev}>{e.reviewText}
                                        <button onClick={() => {
                                            deleteRew(e.id)
                                        }}></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>}
            </div>
            )
}


            export default ProductPage;