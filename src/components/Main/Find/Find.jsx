import React, {useState} from "react";
import axios from "axios";
import {FindProduct} from "./FindProduct";
import s from "./FindStyles.module.css"

export const FindComponent = () => {

    const DOMEN_SERVER = 'http://localhost:8080/api/';

    let inp = React.createRef();

    let [inputFind, setFindInput] = useState('');

    let [products, setProducts] = useState(null);

    let [currentPage, setCurrentPage] = useState(1);

    let [totalCount, setTotalCount] = useState(1)

    let [findString, setfindString] = useState('')

    let inoutChanger = (value) => {
        setFindInput(value);
    }

    let [arrayCount, setArrayCount] = useState([]);

    let [catChek, setCheck] = useState(false);

    let finder = (event) => {
        if (event.key === 'Enter') {
            let find = {
                text: inputFind
            }
            let url;
            if(catChek){
                url = DOMEN_SERVER + `products/find/description?count=1&size=10`;
            }else {
                url = DOMEN_SERVER + `products/find/name?count=1&size=10`;
            }
            axios.post(url, find, {withCredentials: true}).then(data => {
                setCurrentPage(1)
                setTotalCount(data.data.totalCount)
                let ar = [];
                for (let i = 1; i <= data.data.totalCount; i++) {
                    ar.push(i);
                }
                setfindString(find.text)
                setArrayCount(ar);
                setProducts(data.data.products)
                setError(false)
            }).catch(e=>{
                setError(true)
            })
        }
    }
    
    let [error, setError] = useState('false')

    let changePage = (value) => {
        setCurrentPage(value);
        let url;
        if(catChek){
            url = DOMEN_SERVER + `products/find/description?count=${value}&size=10`;
        }else {
            url = DOMEN_SERVER + `products/find/name?count=${value}&size=10`;
        }
        axios.post(url, {text: findString}, {withCredentials: true})
            .then((data) => {
                setProducts(data.data.products)
            })
    }

    let [fetchManin, setFetchMain] = useState(true);


    
    return (<div>
        {error === true ?
            <div className={s.cont}>
                <div className={s.inputer}>
                    <input placeholder="Поиск" className={s.inputut} onChange={(e) => {
                        inoutChanger(e.target.value)
                    }} onKeyPress={(e) => {
                        finder(e)
                    }}/>
                    <div><input type="checkbox" checked={catChek} onChange={()=> setCheck(!catChek)}/>Поиск по описанию</div>
                </div>
                <div className={s.findPane}> Not found</div>
            </div>
            :
            <div className={s.cont}>
            <div className={s.inputer}>
            <input placeholder="Поиск" className={s.inputut} onChange={(e) => {
            inoutChanger(e.target.value)
        }} onKeyPress={(e) => {
            finder(e)
        }}/>
            <div><input type="checkbox" checked={catChek} onChange={()=> setCheck(!catChek)}/>Поиск по категориям</div>
            </div>
        {products === null ?
            <div className={s.findBotPane}>Введите имя или описание продукта продукта или присмотритесь к актулальным
            <div className={s.actualProducts}>

            </div>
            </div> :
            <div>
            <div className={s.res}>Результаты по запросу {findString}</div>
            <div className={s.findPane}>
        {products.map(e => <div className={s.productOnPane}><FindProduct product={e}/></div>)}
            </div>
            <div className={s.paginatrion}>{arrayCount.map(e => e == currentPage ?
            <div className={s.current}>{e}</div> : <div onClick={() => changePage(e)}>{e}</div>)}</div>
            </div>}
            </div>
        }
    </div>)

}