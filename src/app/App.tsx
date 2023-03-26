import * as React from "react";
import { useEffect, useState } from "react";
import { Accordion, AccordionSection } from "../components/accordionMenu/accordionMenu";
import Header from "../components/header";
import data from "../data/products.json";
import categories from "../data/categories.json"
import ProductsGrid from "../components/products/productsGrid";
import { RouterProvider, createHashRouter, Link, createBrowserRouter, BrowserRouter } from "react-router-dom";
import { Router, Route, useResolvedPath, useMatch, Routes } from 'react-router'
import ErrorPage from "./errorPage";
import * as ReactDOM from "react-dom";
import { MenuItem } from "../components/meu/menuItem";
import ProductInfo from "../components/products/productInfo";

export type Product = {
  name: string,
  price: number,
  category: string,
  subcategory: string,
  description: string,
  image: string
}

const App = () => {
  const [products, setProducts] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState(0)
  
  const translateProduct = (product: any) => {
    return {
      name: product.name,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      image: product.url
    }
  }


  useEffect(() => 
    setProducts(data.products.data.items.map(translateProduct)), [data])
  

  return (
    <BrowserRouter>
      <Header
        menuItems={
          [<MenuItem to="/products">Products</MenuItem>,
          <MenuItem to="/about">About</MenuItem>
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
            <Route path="/products" element={<ProductsGrid data={products}/>} />
            <Route path={`product/:id`} element={<ProductInfo data={products}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>

      </div>
  </BrowserRouter>
        
    );
}

export const About = () => <h3>Its the UI-Router hello world app!</h3>;

function Home() {
  return <h1>Home</h1>
}

export default App;
