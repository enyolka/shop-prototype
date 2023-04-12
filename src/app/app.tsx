import * as React from "react";
import { useEffect, useState } from "react";
import Header from "../components/header/header";
import categories from "./data/categories.json"
import { Link, BrowserRouter } from "react-router-dom";
import { Route,  Routes } from 'react-router'
import ErrorPage from "./errorPage";
import ProductInfo from "./productsPage/productInfo";
import GlobalState from "../contexts/GlobalState";
import ProductsPage from "./productsPage/productsPage";
import CartPage from "./cartPage/cartPage";
import LikedPage from "./likedPage/likedPage";
import styles from "./app.module.css"

const App = () => {
  // const [selectedProduct, setSelectedProduct] = useState(0)


  return (
    <GlobalState>
      <BrowserRouter>
        <Header/>
        <main className={styles.container}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produkty" element={<ProductsPage/>} />
              <Route path={`/:id`} element={<ProductInfo/>} />
              <Route path={`produkty/:category`} element={<ProductsPage/>} />
              <Route path={`produkty/:category/:subcategory`} element={<ProductsPage/>} />
              <Route path="/ulubione" element={<LikedPage/>} />
              <Route path="/koszyk" element={<CartPage/>} />
              <Route path="/konto" element={<Account/>} />
              <Route path="/*" element={<ErrorPage/>} />
            </Routes>
        </main>
      </BrowserRouter>
    </GlobalState>
  );   
}

export const Account = () => <h3>Its the UI-Router hello world app!</h3>;
export const Cart = () => <h3>Its the UI-Router hello world app!</h3>;

function Home() {
  return <h1>Home</h1>
}

export default App;
