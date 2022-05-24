import './App.css';
import Registration from "./components/Registration/Registration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Header from "./components/Main/Header/Header";
import Footer from "./components/Main/Footer/Footer";
import Main from "./components/Main/Main";
import ProductPageContainer from "./components/Main/ProductList/ProductPageContainer";

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
                     <Route path='/reg'
                            element={<Registration/>}/>
                     <Route path='/login'
                            element={<Auth/>}/>
                     <Route path='/main'
                            element={<Main/>}/>
                     <Route path='/product/:id'
                            element={<ProductPageContainer/>}/>

                 </Routes>
             </div>
             <Footer/>
         </div>
     </BrowserRouter>

  );
}



export default App;


