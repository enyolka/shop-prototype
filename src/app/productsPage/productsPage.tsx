import * as React from "react";
import placeholder from "/public/placeholder.png";
import styles from "./productsPage.module.css";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";
import { ScrollToTop } from "../../components/scroll/scroll";

type Props = {
  className?: string;
  children?: React.ReactNode;
};  

const ProductsPage = ({  children }: Props) => {
  const context = React.useContext(ProductContext)
  let params = useParams();

  return (
    <ScrollToTop className={styles.grid}>
    {context.products.filter(({category, subcategory}) => !!params.category ? !!params.subcategory ? subcategory == params.subcategory : category == params.category : true).map((product, idx) => 
      <section key={idx} className={styles.grid_item}>
          <img alt="" src={placeholder} className={styles.item_img}/>
          <div className={styles.item_info}>
            <Link to={`/${product.id}`} className={styles.item_link}>{product.name}</Link>
            <p className={styles.item_price}>{product.price}$</p>
          </div>
      </section>
    )}
  </ScrollToTop>
  );
}

export default ProductsPage;