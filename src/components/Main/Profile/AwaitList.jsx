import {useEffect, useState} from "react";
import axios from "axios";
import s from "./ProfileStyles.module.css";

const AwaitList = (props) =>{

    let [fetch, setFetch] = useState(true);

    let[awaitings, setAwaitings] = useState({
        deliver: null
    })
    useEffect( ()=>{
        const fetchData = async () => {

            const result = await axios.get("http://localhost:8080/api/profile/awaitings", {withCredentials: true}).then(data => {
                    return data.data.deliveries
                }
            );



            setAwaitings({
              ...awaitings,
                deliver: result
            })



            setFetch(false)
        };
        fetchData();

    }, [])

    console.log(awaitings.deliver)
    return (
        <div >
            {fetch ? "Loading" : <div className={s.form}>
            <div>

                {awaitings.deliver.map(e=><div> Дата отправки:{e.created.map(a=><div className={s.product}><div>{a}</div></div>)}</div>)}
            </div>
            <div>

                {awaitings.deliver.map(e=><div>  Прмимерная дата выдачи:{e.arrived.map(a=><div>{a}</div>)}</div>)}
            </div>
            <div >
                {awaitings.deliver.map(e=><div>
                    Товар:{e.buyDto.products.map(a=><div>
                    Название:
                        <div>{a.name}</div>
                    Цена:
                        <div>{a.price}</div>
                </div>
                   )}
                </div>)}
            </div>
            </div>}
    </div>)
}
export default AwaitList;