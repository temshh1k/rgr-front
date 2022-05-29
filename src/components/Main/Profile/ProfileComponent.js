import {useEffect, useState} from "react";
import s from "./ProfileStyles.module.css"
import axios from "axios";
import {NavLink} from "react-router-dom";

const Profile = (props) => {

    let [fetching, setFetching] = useState(true);

    let [userProfile, setUserProfile] = useState('');

    let [isSalesman, setIsSalesman] = useState(false);
    let [admin, setAdmin] = useState(false);



    let [balance, setBalance] = useState(()=>{
        return{
            money: null,
        }
    });


    let [userInfo, setUserInfo] = useState(()=>{
        return{
            username: null,
            lastname: null,
            town: null,
            index: null

        }
    });


    useEffect(() => {
        const fetchingData = async () => {
            const result = await axios.get("http://localhost:8080/api/profile/getall", {withCredentials: true}).then(data => {
                    return data.data
                }
            );
            console.log(result)
            setUserProfile(result)
            result.roles.map(e=>{
                if(e==="ROLE_SALESMAN"){
                    setIsSalesman(true)
                }
                if(e==="ROLE_ADMIN"){
                    setAdmin(true)
                }
            })
            setFetching(false)

        };

        fetchingData();

    }, [])

    const balanceAdd =  () =>{

        axios.post('http://localhost:8080/api/profile/balance/add',{
            money: balance.money,
        },{withCredentials: true})
    }

    const updateInfo =  () =>{

        axios.put('http://localhost:8080/api/profile/update',{
            username: userInfo.username,
            lastname: userInfo.lastname,
            town: userInfo.town,
            index: userInfo.index
        },{withCredentials: true})
    }

    const changeInputRegisterInfo = event=>{
        event.persist()
        console.log(event.target.value)
        setUserInfo(prev=>{
            console.log(event.target.value)
            return{
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }
    const changeInputRegisterBalance = event=>{
        event.persist()
        console.log(event.target.value)
        setBalance(prev=>{
            console.log(event.target.value)
            return{
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }


    return (
        <div>
            <div className={s.head}>Profile</div>
            <div className={s.pane}>
                {fetching ? "Loading" : <div>
                    <NavLink to={'/basket'}>
                        <div className={s.tab}>
                                Basket + {userProfile.id}
                        </div>
                    </NavLink>
                    {isSalesman ?<NavLink to={'/store'}>
                        <div className={s.tab}>
                            My Products
                        </div>
                    </NavLink> : null}
                    {isSalesman ?<NavLink to={'/addproduct'}>
                        <div className={s.tab}>
                            Add product
                        </div>
                    </NavLink> : null}
                    {isSalesman ?<NavLink to={'/sellhistory'}>
                        <div className={s.tab}>
                            Sell History
                        </div>
                    </NavLink> : null}
                    <NavLink to={'/awaitings'}>
                        <div className={s.tab}>
                           Await list
                        </div>
                    </NavLink>
                    <NavLink to={'/buyhistory'}>
                        <div className={s.tab}>
                           Buy history
                        </div>
                    </NavLink>
                    {admin ?<NavLink to={'/admin'}>
                        <div className={s.tab}>
                           Admin Panel
                        </div>
                    </NavLink> : null}
                </div>}
                <div className={s.profileInfo}>
                    <div>
                        {"Имя:  " + userProfile.username}
                    </div>
                    <div>
                        {"Фамилия:  " +userProfile.lastname}
                    </div>
                    <div>
                        {"Город:  " +userProfile.town}
                    </div>
                    <div>
                        {"Индекс:  " +userProfile.index}
                    </div>
                    <div>
                        {"Почта:  " +userProfile.email}
                    </div>
                    <form onSubmit={balanceAdd}>
                        <div>
                            Пополнить баланс: <input name='money' value={balance.money} onChange={changeInputRegisterBalance}/>
                        </div>
                        <input type='submit'/>
                    </form>
                </div>
                <form onSubmit={updateInfo} className={s.profileInfo}>
                    <div>
                       Изменить имя: <input name='username' value={userInfo.username} onChange={changeInputRegisterInfo}/>
                    </div>
                    <div>
                        Изменить фамилию: <input  name='lastname' value={userInfo.lastname} onChange={changeInputRegisterInfo}/>
                    </div>
                    <div>
                        Изменить город: <input name='town'  value={userInfo.town} onChange={changeInputRegisterInfo}/>
                    </div>
                    <div>
                        Изменить Индекс: <input  name='index' value={userInfo.index} onChange={changeInputRegisterInfo}/>
                    </div>
                    <input type='submit'/>


                </form>
            </div>
        </div>
    )

}


export default Profile;