import * as React from "react";
import placeholder from "/public/placeholder.png";
import styles from "./productsPage.module.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";

type Props = {
    className?: string;
    children?: React.ReactNode;
  };  

const ProductsPage = ({  children }: Props) => {
  // const context = React.useContext(ProductContext)
  
  return (
    <ProductContext.Consumer>
    {context => ( 
      <main className={styles.grid}>
        {context.products.map((product, idx) => 
          <section key={idx}>
              <img alt="" src={placeholder}/>
              <div className="info">
                <Link to={`/produkty/${idx}`}>{product.name}</Link>
                <p>{product.price}$</p>
              </div>
          </section>
        )}

      </main>)}
    </ProductContext.Consumer>
  );
}

export default ProductsPage;