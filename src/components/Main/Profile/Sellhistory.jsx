import {useState} from 'react';
import {useEffect} from "react";
import axios from "axios";
import s from "./ProfileStyles.module.css";

const Sellhistory = (props) =>{
    let [fetching, setFetching] = useState(true);
    let [history, setHistory] = useState(()=>{
        return{
            historys: []
        }
    })
    useEffect(()=>{

        const fetchingSellHistory = async () =>{

            const resultHistory = await axios.get("http://localhost:8080/api/profile/sellhistory?count=1&size=20", {withCredentials: true}).then(data => {

                    return data.data
                }
            );

            setHistory({
                    ...history,
                    historys: resultHistory
                }
            )
            console.log(history)
            setFetching(false)
        }
        fetchingSellHistory();
    }, [])
    return <div className={s.sells}>
        История продаж:

        {fetching ? "Loading" : <div>{history.historys.map(e=>
                <div className={s.form}>

                    <div >
                        <div>
                            Товар : {e.product.name}
                        </div>
                        <div>
                            Цена : {e.product.price}
                        </div>

                    </div>
                    <div>
                        <div> Дата продажи: {e.dateTime.map(p=>
                            <div>{p}</div>)}</div>
                    </div>
                </div>
                )} </div>
        }

        </div>
}

export default Sellhistory;