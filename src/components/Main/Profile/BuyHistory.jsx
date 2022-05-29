import {useState} from 'react';
import {useEffect} from "react";
import axios from "axios";
import s from "./ProfileStyles.module.css";

const BuyHistory = (props) =>{
    let [fetching, setFetching] = useState(true);
    let [history, setHistory] = useState(()=>{
        return{
            historys: []
        }
    })
    useEffect(()=>{

        const fetchingBuyHistory = async () =>{
            const resultHistory = await axios.get("http://localhost:8080/api/profile/buyHistory", {withCredentials: true}).then(data => {
                    return data.data
                }
            );

            setHistory({
                    ...history,
                    historys: resultHistory.buys
                }
            )
            console.log(history)
            setFetching(false)
        }
        fetchingBuyHistory();
    }, [])
    return <div className={s.sells}>
        История покупок:
        {fetching ? "Loading" :<div>
            {history.historys.map(e=><div>{e.products.map(p=><div><div>Название: {p.name}</div><div></div>Цена: {p.price}</div>)}</div>)}


        </div>}
    </div>
}

export default BuyHistory;