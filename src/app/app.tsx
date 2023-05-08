import * as React from "react";
import { useEffect, useState } from "react";
import Header from "../components/header/header";
import categories from "./data/categories.json"
import { Link, BrowserRouter } from "react-router-dom";
import { Route,  Routes } from 'react-router'
import ErrorPage from "./errorPage";
import ProductInfo from "./products/productInfo";
import GlobalState from "../contexts/GlobalState";
import ProductsPage from "./products/productsPage";
import CartPage from "./cart/cartPage";
import LikedPage from "./liked/likedPage";
import "./app.css"
import BuyPage from "./cart/buyPage";
import AccountPage from "./account/accountPage";
import PromotionsPage from "./products/promotionsPage";
import EndPage from "./cart/endPage";
import HomePage from "./home/homePage";
import Footer from "../components/footer/footer";
import ContactPage from "./additional/contactPage";
import NotFound from "./additional/notFound";
import SettingsPage from "./additional/settingsPage";

const App = () => {
  const headers = ["leftside", "simple", "extensive", "rightside"]
  const colors = ["mint", "blue", "orange"]
  const [header, setHeader] = useState(sessionStorage.getItem("header") != null ? sessionStorage.getItem("header") : headers[0] )   
  const [color, setColor] = useState(sessionStorage.getItem("color") != null ? sessionStorage.getItem("color") : colors[0] )   

  return (
    <GlobalState>
      <BrowserRouter>
        <Header options={headers} option={header} setOption={setHeader}/>
        <main className={"container"}>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/" element={<HomePage/>} />
              <Route path="/produkty" element={<ProductsPage/>} />
              <Route path="/promocje" element={<PromotionsPage/>} />
              <Route path={`/:id`} element={<ProductInfo/>} />
              <Route path={`produkty/:category`} element={<ProductsPage/>} />
              <Route path={`produkty/:category/:subcategory`} element={<ProductsPage/>} />
              <Route path="/ulubione" element={<LikedPage/>} />
              <Route path="/koszyk" element={<CartPage/>} />
              <Route path="/realizuj-zamowienie" element={<BuyPage/>} />
              <Route path="/podsumowanie" element={<EndPage/>} />
              <Route path="/konto" element={<AccountPage/>} />
              <Route path="/kontakt" element={<ContactPage/>} />
              <Route path="/ustawienia" element={
                <SettingsPage 
                  headerOptions={headers} 
                  headerOption={header} 
                  setHeaderOption={setHeader}
                  colorOptions={colors} 
                  colorOption={color} 
                  setColorOption={setColor}
                />}/>
              {/* <Route path="/konto/rejestracja" element={<AccountPage/>} />
              <Route path="/konto/logowanie" element={<AccountPage/>} /> */}
              <Route path="/*" element={<ErrorPage/>} />
            </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </GlobalState>
  );   
}
export default App;
