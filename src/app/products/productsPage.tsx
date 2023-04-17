import * as React from "react";
import placeholder from "/public/placeholder.png";
import "./productsPage.css";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";
import { ScrollToTop } from "../../components/scroll/scroll";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

type Props = {
  className?: string;
  children?: React.ReactNode;
};  

const ProductsPage = ({  children }: Props) => {
  const context = React.useContext(ProductContext)
  let params = useParams();
  
  let linked = "/produkty/"
  const breadcrumbs = Object.values(params).map(item => {
    linked += item + "/"
    return {name: item, link: linked }}) 

  return (
    <ScrollToTop className={"products"}>
      <Breadcrumbs className={"products_breadcrumbs"} navs={breadcrumbs}/>
      <div className={"grid"}>
        {context.products.filter(({category, subcategory}) => 
          !!params.category ? !!params.subcategory ? subcategory == params.subcategory : category == params.category : true)
          .map((product, idx) => 
            <section key={idx} className={"grid_item"}>
                <img alt="" src={placeholder} className={"item_img"}/>
                <div className={"item_info"}>
                  <Link to={`/${product.id}`} className={"item_link"}>{product.name}</Link>
                  <p className={"item_price"}>{product.price}$</p>
                </div>
            </section>
        )}
          </div>
  </ScrollToTop>
  );
}

export default ProductsPage;