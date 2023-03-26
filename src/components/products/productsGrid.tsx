import * as React from "react";
import placeholder from "/public/placeholder.png";
import styles from "./productsGrid.module.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/Product";

type Props = {
    className?: string;
    children?: React.ReactNode;
  };  

const ProductsGrid = ({  children }: Props) => {
  const { items } = React.useContext(ProductContext)
  
  return (
    <main className={styles.grid}>
    
      {items.map((product, idx) => 
        <section key={idx}>
            <img alt="" src={placeholder}/>
            <div>
              <Link to={`/produkty/${idx}`}>{product.name}</Link>
              <p>{product.price}$</p>
            </div>
        </section>
      )}

    </main>
  );
}

export default ProductsGrid;