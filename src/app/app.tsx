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

const App = () => {
  return (
    <GlobalState>
      <BrowserRouter>
        <Header/>
        <main className={"container"}>
            <Routes>
              <Route path="/" element={<Home />} />
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
              {/* <Route path="/konto/rejestracja" element={<AccountPage/>} />
              <Route path="/konto/logowanie" element={<AccountPage/>} /> */}
              <Route path="/*" element={<ErrorPage/>} />
            </Routes>
        </main>
      </BrowserRouter>
    </GlobalState>
  );   
}

export const Cart = () => <h3>Its the UI-Router hello world app!</h3>;

function Home() {
  return <h1>Home</h1>
}

export default App;
