import * as React from "react";
import { useEffect, useState } from "react";
import Header from "./components/header/header";
import categories from "./data/categories.json"
import { Link, BrowserRouter } from "react-router-dom";
import { Route,  Routes } from 'react-router'
import ErrorPage from "./app/errorPage";
import ProductInfo from "./app/productsPage/productInfo";
import GlobalState from "./contexts/GlobalState";
import ProductsPage from "./app/productsPage/productsPage";
import CartPage from "./app/cartPage/cartPage";
import LikedPage from "./app/likedPage/likedPage";

const App = () => {
  // const [selectedProduct, setSelectedProduct] = useState(0)


  return (
    <GlobalState>
      <BrowserRouter>
        <Header>
          {/* <Link to="/" className="site-title">
            Site Name
          </Link> */}
        </Header>
        <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produkty" element={<ProductsPage/>} />
              <Route path={`produkty/:id`} element={<ProductInfo/>} />
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
