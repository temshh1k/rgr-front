import {useState, useEffect} from "react";
import axios from "axios";


const Basket = (props)=>{


    let [products, setProducts] = useState(
        {
            product: []
        }

    );
    let [buy, setBuy] = useState(false);




    const basketBuy =  () =>{

        axios.post('http://localhost:8080/api/profile/basket/buy',{

        },{withCredentials: true})
        setBuy(true)

    }
    const basketDelete =  (id) =>{
        axios.delete('http://localhost:8080/api/profile/basket/add/' + id,{withCredentials: true}).then(data=>{
            setProducts({
                ...products,
                product: data.data.products
            })
        })




    }

    let [fetching, setFetching] = useState(true)

    useEffect(() => {
        const fetchingData = async () => {

            const result = await axios.get("http://localhost:8080/api/profile/basket", {withCredentials: true}).then(data => {

                    return data.data
                }
            );


            setProducts({
                ...products,
                product: result.products
            }
            )

            setFetching(false)

        }
        fetchingData();
    }, [])


    return(
        <div>
            {fetching ? "Loading..." : <div>
                {buy ? "ТЫ ВСЕ КУПИЛ ЛОХ" : <div><form>
                    {products.product.map(e=> <div><button onClick={()=>{basketDelete(e.id)}}>Удалить</button>
                        <div>{e.name}
                            </div>
                    </div>)}
                    <button onClick={basketBuy}>КУПИ СЛОНА</button>
                </form></div>}
            </div>}
        </div>
    )


}


export default Basket;