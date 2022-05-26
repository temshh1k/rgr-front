import './App.css';
import Registration from "./components/Registration/Registration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Header from "./components/Main/Header/Header";
import Footer from "./components/Main/Footer/Footer";
import Main from "./components/Main/Main";
import ProductPageContainer from "./components/Main/ProductList/ProductPageContainer";
import {FindComponent} from "./components/Main/Find/Find";
import ProductPage from "./components/Main/ProductList/ProductPage";
import ProfileComponent from "./components/Main/Profile/ProfileComponent";
import AddProduct from "./components/Main/Profile/AddProduct`";
import Basket from "./components/Main/Profile/BasketComponent";
import Store from "./components/Main/Store/Store";
import Category from "./components/Main/Find/Category";

export function App() {

  return (
     <BrowserRouter>
         <div className="rgr">
             <Routes>
                 <Route path='*'
                        element={<Header/>}/>
             </Routes>
             <div className={'rgr-content'}>
                 <Routes>
                     <Route path='/profile' element={<ProfileComponent/>} />
                     <Route path='/addProduct' element={<AddProduct/>} />
                     <Route path='/basket' element={<Basket/>} />
                     <Route path='/reg'
                            element={<Registration/>}/>
                     <Route path='/login'
                            element={<Auth/>}/>
                     <Route path='/main'
                            element={<Main/>}/>
                     <Route path='/product/:id'
                            element={<ProductPage />}/>
                     <Route path='/find' element={<FindComponent/>}/>
                     <Route path='/store' element={<Store/>}/>
                     <Route path='/category/:name' element={<Category/>}/>


                 </Routes>
             </div>
             <Footer/>
         </div>
     </BrowserRouter>

  );
}



export default App;


