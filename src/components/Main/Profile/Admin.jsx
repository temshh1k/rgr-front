
import {useEffect, useState} from "react";
import axios from "axios";


const Header = (props) =>{


    let [fetch, setFetch] = useState(true);

    let[id, setId] = useState({
        ban: null
    })
    let[idUnban, setIdUnban] = useState({
        unban: null
    })
    const changeInputBan = event=>{
        event.persist()
        console.log(event.target.value)
        setId(prev=>{
            console.log(event.target.value)
            return{
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }
    const changeInputUnBan = event=>{
        event.persist()
        console.log(event.target.value)
        setIdUnban(prev=>{
            console.log(event.target.value)
            return{
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }


    const ban =  (id) =>{
        axios.post('http://localhost:8080/api/admin/ban?id=' + id,{

        },{withCredentials: true})
    }
    const unBan =  (id) =>{

        axios.delete('http://localhost:8080/api/admin/ban?id=' + id,
        {withCredentials: true}
        )
    }
    const checkBan  = event => {
        event.preventDefault()
        console.log(id.ban)
        ban(id.id)
    }
    const checkUnBan  = event => {
        event.preventDefault()
        console.log(idUnban.unban)
        unBan(idUnban.unban)
    }


    return(
        <div>
            <form onSubmit={checkBan}>
                <input   id='admin' name='ban' value={id.ban} onChange={changeInputBan}/>
                <input type='submit' value={'БАН'}/>
            </form>
            <form onSubmit={checkUnBan}>
                <input   id='admin' name='unban' value={idUnban.unban} onChange={changeInputUnBan}/>
                <input type='submit' value={'РАЗБАН'}/>
            </form>
        </div>


    )
}

export default Header;