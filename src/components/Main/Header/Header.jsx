import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Profile from "../Profile/ProfileComponent";

const Header = (props) =>{


    let [fetch, setFetch] = useState(true);

    let[userData, setUserData] = useState(null)


    useEffect( ()=>{
        const fetchData = async () => {
            const result = await axios.get("http://localhost:8080/api/profile/get", {withCredentials: true}).then(data => {
                return data.data
                }
            );

            setUserData(result)
            setFetch(false)
        };
        fetchData();

    }, [])


    return(
        <header className={s.header}>
            <div className={s.categories}>
                    <NavLink to={`/category`}>
                    <div className={s.item}>Категории</div>
                    </NavLink>
            </div>
            <div>
                <NavLink to={'/find'}>Поиск</NavLink>

            </div>
            <div>
                {fetch ? "Loading..." : <div className={s.profile}>
                    <NavLink to={'/profile'}><div>{"Username:  " + userData.username}</div></NavLink>
                    <div>{"Basket:  " + userData.inBasket}</div>
                    <div>{"Balance:  "+ userData.balance}</div>

                </div>}
            </div>
        </header>
    )
}

export default Header;