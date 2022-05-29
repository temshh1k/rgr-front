import {useState} from "react";
import validator from 'validator';
import axios from "axios";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import s from './Registration.module.css'

const DOMEN_SERVER='http://localhost:8080/api/';
const DOMEN_SITE='aboba.com';

const SALESMAN_ROLE=['salesman']

function Registration() {
    const [register, setRegister] = useState(() =>{
        return{
            email: '',
            password: '',
            username: '',
            roles: ['']
        }
    })
    const changeInputRole = event=>{
        event.persist()

        setRegister(prev=>{
            console.log(event.target.value)
            return{
                ...prev,
                roles: SALESMAN_ROLE
            }
        })
    }

    const changeInputRegister = event=>{
        event.persist()
        console.log(event.target.value)
        setRegister(prev=>{
            console.log(event.target.value)
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
            let newRoles = ['user'];
            let check = document.getElementById('salesman');
            let checkAdmin = document.getElementById('admin');

            if (check.checked){
                newRoles.push('salesman');
            }
            if (checkAdmin.checked){
                newRoles.push('admin');
            }

            console.log(newRoles)
            axios.post(DOMEN_SERVER + 'auth/reg',{
                email: register.email,
                password: register.password,
                username: register.username,
                roles: newRoles
            } ).then(response =>{
                if(response.data === true){
                    window.location.href = DOMEN_SERVER + 'auth/login';
                }else{
                    console.log(response.data)
                    alert('takoy uje est')
                }
            }).catch(()=>{
                alert('error')
            })
        }
    }
    return(
        <div className='form'>
          <h2>
              Register:
          </h2>
            <form onSubmit={submitCheckin}>
            <p>
                Email: <input type='email' id='email' name='email' value={register.email} onChange={changeInputRegister}/>

            </p>
            <p>
                Name: <input type='username' id='username' name='username' value={register.username} onChange={changeInputRegister}/>
            </p>
            <p>
                Password: <input type='password' id='password' name='password' value={register.password} onChange={changeInputRegister}/>
            </p>
                <p className={s.checkbox}>
                    Выберите тип пользователя
                    <div>
                        <label >Продавец</label>
                       <input  type='radio' id='salesman' name='salesman' value={register.roles} onChange={changeInputRegister}/>
                        <label >Админ</label>
                        <input  type='radio' id='admin' name='admin' value={register.roles} onChange={changeInputRegister}/>

                    </div>
                </p>
            <input type='submit'/>

            </form>
        </div>

    )
}
export default Registration;

