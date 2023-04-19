import * as React from "react";
import placeholder from "/public/placeholder.png";
import "./productsPage.css";
import { Link, Params, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";
import { ScrollToTop } from "../../components/scroll/scroll";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import Button from "../../components/button/button";
import { RiCloseCircleLine } from "react-icons/ri";
import { useState } from "react";
import * as classNames from "classnames";

type Props = {
  className?: string;
  children?: React.ReactNode;
};  

const ProductsPage = ({  children }: Props) => {
  const context = React.useContext(ProductContext)
  let params = useParams();
  const navigate = useNavigate();

  const [popupDisplay, setPopupDisplay] = useState(true) 
  
  let linked = "/produkty/"
  const breadcrumbs = Object.values(params).map(item => {
    linked += item + "/"
    return {name: item, link: linked }})
  
  breadcrumbs.unshift({name: "produkty", link: "/produkty/"});

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
       {Math.floor(Math.random()*4) == 2  ? <div className={classNames("popup", {displayed: popupDisplay})} id="myForm">
          <RiCloseCircleLine className="popup_closeIcon" onClick={() =>  setPopupDisplay(false)}/>
          <div className="popup_info">
            <p>Wyjątkowa okazja!</p>
            <Button 
              role="important" 
              onClick={() => 
                navigate(`/${context.products[Math.floor(Math.random()*context.products.length)].id}`)
              }
            >
                Sprawdź tutaj
            </Button>
          </div>
          </div> : null}
      </div>
  </ScrollToTop>
  );
}

export default ProductsPage;