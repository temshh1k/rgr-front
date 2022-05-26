import {useEffect, useState} from "react";
import axios from "axios";



const Store = (props) =>{

    let [fetching, setFetching] = useState(true)
    let [number, setNumber] = useState({
        number: null
    })

    let [store, setStore] = useState(
        {
            products:[]
        }
    );
    const productDelete =  (id) =>{
        axios.delete('http://localhost:8080/api/products/delete/' + id,{withCredentials: true}).then(data=>{
            setStore({
                ...store,
                products: data.data
            })
        })
    }
    const addNumber =  (id) =>{
        console.log(id);
        axios.put('http://localhost:8080/api/products/add/num/' + id,  {
            number : 100
        },{withCredentials: true}).then(data=>{

        })
    }



    useEffect(() => {
        const fetchingData = async () => {

            const result = await axios.get("http://localhost:8080/api/products/get/store", {withCredentials: true}).then(data => {

                    return data.data
                }
            )

            setStore({
                    ...store,
                    products: result
                }
            )

            setFetching(false)
        }
        fetchingData();
    }, []);


    const changeInputNumber = event=>{
        event.persist()
        debugger
        console.log(event.target.value)
        setNumber(prev=>{
            return{
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }
    const changeInputId = event=>{
        event.persist()

        console.log(event.target.value)
        setStore(prev=>{
            console.log(event.target.value)
            return{
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }


    return(
        <form>
            Товары на с кладе:
            {store.products.map(e=><div>
                <div>
                    {"Название: " + e.name}
                    <div>
                        {"Айди: " + e.id}
                    </div>
                    {"Количество: " + e.available}
                    <div>
                        <button onClick={()=>{addNumber(e.id)}}>Добвить 100 товара</button>
                    </div>
                </div>

                <div>
                <button onClick={()=>{productDelete(e.id)}}>Удалить</button>
            </div></div>)}
        </form>
    )


}

export default Store;