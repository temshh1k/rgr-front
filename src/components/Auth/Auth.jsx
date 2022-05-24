import {useState} from "react";
import validator from 'validator';
import axios from "axios";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Registration from "../Registration/Registration";
import Cookies from 'js-cookie';

const DOMEN_SERVER='http://localhost:8080/api/';
const DOMEN_SITE='aboba.com';

 function Auth() {
    const [register, setRegister] = useState(() =>{
        return{
            email: '',
            password: '',
        }
    })

    const changeInputAuth = event => {
        event.persist()
        setRegister(prev=>{
            return{
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }
    const submitCheckin = event =>{
        event.preventDefault()
        if(!validator.isEmail(register.email)){
            alert('email kal')
        }else if(!validator.isStrongPassword(register.password, {minSymbols: 0})){
            alert('pass kal')
        }else {
            axios.post(DOMEN_SERVER + 'auth/login',{
                email: register.email,
                password: register.password,
            } ).then(response =>{
                if(response.data === true){
                    window.location.href = DOMEN_SITE
                }else{
                    console.log(Cookies.get('access_token'));
                }

            }).catch(()=>{
                alert('error')
            })
        }
    }
    return(
        <div className='form'>
          <h2>
              Auth:
          </h2>
            <form onSubmit={submitCheckin}>
            <p>
                Email: <input type='email' id='email' name='email' value={register.email} onChange={changeInputAuth}/>

            </p>

            <p>
                Password: <input type='password' id='password' name='password' value={register.password} onChange={changeInputAuth}/>
            </p>
            <input type='submit'/>
            </form>
        </div>

    )
}

export default Auth;




