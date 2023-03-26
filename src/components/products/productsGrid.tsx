import * as React from "react";
import { Product } from "../../app/app";
import placeholder from "/public/placeholder.png";
import styles from "./productsGrid.module.css";
import { Link } from "react-router-dom";
import { MenuItem } from "../meu/menuItem";

type Props = {
    data: Product[];
    className?: string;
    children?: React.ReactNode;
  };  

const ProductsGrid = ({ data, children }: Props) => {
  console.log(data)
  
  return (
    <main className={styles.grid}>
    
      {data.map((product, idx) => 
        <section key={idx}>
            <img alt="" src={placeholder}/>
            <div>
            {/* <MenuItem to ="/product/0">Product</MenuItem> */}
              <Link to={`/product/${idx}`}>{product.name}</Link>
              <p>{product.price}$</p>
            </div>
        </section>
      )}

    </main>
  );
}

export default ProductsGrid;