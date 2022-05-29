import {useState} from "react";
import axios from "axios";
import s from "./ProfileStyles.module.css"

const AddProduct = () => {


    let formData = new FormData();
    let [price, setPrice] = useState('')
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [num, setNum] = useState('')
    let [cat1, setCat1] = useState('')
    let [cat2, setCat2] = useState('')
    let [mat, setMat] = useState('')
    let [mainPhoto, setMainPhoto] = useState(null)

    let [adder, setAdder] = useState(false);

    let addPhoto = (e) => {
        //console.log(e.target.files[0])
        setMainPhoto(
            e.target.files[0]
        )
        formData.append('mainimage', e.target.files[0]);

        console.log(mainPhoto)
        let obj = {
            price: price,
            name: name,
            description: desc,
            number: num,
            categories: [cat1, cat2],
            materials: mat
        }
        formData.append("req", JSON.stringify(obj));
        console.log(formData.get('mainimage'))
        axios({
            method: "post",
            url: "http://localhost:8080/api/products/add",
            data: formData,
            withCredentials: true,
            headers: {"Content-Type": "multipart/form-data"},
        })
            .then(function (response) {
                //handle success
                setAdder(true);
            })
            .catch(function (response) {
                setAdder(false);
                console.log(response);
            });
    }


    function send() {
        let f = document.getElementById('filer')
        let obj = {
            price: price,
            name: name,
            description: desc,
            number: num,
            categories: [cat1, cat2],
            materials: mat
        }
        formData.append("req", JSON.stringify(obj));
         let resp = axios({
            method: "post",
            url: "http://localhost:8080/api/products/add",
            data: formData,
            withCredentials: true,
            headers: {"Content-Type": "multipart/form-data"},
        })
            .then( (response) =>{
                //handle success
               if (response.status === 200){setAdder(true)}
                console.log("Success")
                return response.data
            });

    }

    console.log(adder)
    return (
        <div>
            <div className={s.contAdd}>
                {adder ===  true ? "Вы удачно добавили товар" :
                    <div className={s.contInputs}>
                        <div>Введите данные о товаре а потом приложите фотографию</div>
                        <div>Цена<input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/></div>
                        <div>Назавание<input type="text" value={name} onChange={(e) => setName(e.target.value)}/></div>
                        <div>Описание<input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/></div>
                        <div>Колличество<input type="text" value={num} onChange={(e) => setNum(e.target.value)}/></div>
                        <div>Категория 1<input type="text" value={cat1} onChange={(e) => setCat1(e.target.value)}/>
                        </div>
                        <div>Категория 2<input type="text" value={cat2} onChange={(e) => setCat2(e.target.value)}/>
                        </div>
                        <div>Материалы<input type="text" value={mat} onChange={(e) => setMat(e.target.value)}/></div>
                        <div>Фото<input id="filer" type='file' onChange={e => {
                            addPhoto(e)
                        }}/></div>
                    </div>
                }
            </div>
        </div>

    )

}

export default AddProduct;