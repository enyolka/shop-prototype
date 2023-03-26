import * as React from "react";
import { useEffect, useState } from "react";
import Header from "./components/header";
import categories from "./data/categories.json"
import ProductsGrid from "./components/products/productsGrid";
import { Link, BrowserRouter } from "react-router-dom";
import { Route,  Routes } from 'react-router'
import ErrorPage from "./app/errorPage";
import { MenuItem } from "./components/meu/menuItem";
import ProductInfo from "./components/products/productInfo";
import ProductProvider, { ProductContext } from "./contexts/Product";
import LikedProducts from "./components/likedProducts";

const App = () => {
  // const [selectedProduct, setSelectedProduct] = useState(0)

  return (
    <ProductProvider>
      <BrowserRouter>

      <Header
          menuItems={
            [<MenuItem to="/produkty">Produkty</MenuItem>,
            <MenuItem to="/ulubione">Ulubione</MenuItem>
          ]

          }
        >
          <Link to="/" className="site-title">
            Site Name
          </Link>
        </Header>
        <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produkty" element={<ProductsGrid/>} />
              <Route path={`produkty/:id`} element={<ProductInfo/>} />
              <Route path="/ulubione" element={<LikedProducts />} />
              <Route path="/koszyk" element={<Cart />} />
              <Route path="/konto" element={<Account />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>

        </div>

      </BrowserRouter>
    </ProductProvider>    
  );
}

export const Account = () => <h3>Its the UI-Router hello world app!</h3>;
export const Cart = () => <h3>Its the UI-Router hello world app!</h3>;

function Home() {
  return <h1>Home</h1>
}

export default App;
