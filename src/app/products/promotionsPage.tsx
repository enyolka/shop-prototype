import * as React from "react";
import placeholder from "/public/placeholder.png";
import "./productsPage.css";
import { Link, Params, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";
import { ScrollToTop } from "../../components/scroll/scroll";
import bg from "/public/images/sale2.png";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const PromotionsPage = ({ children }: Props) => {
  const context = React.useContext(ProductContext);
  const promotions = context.products
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  return (
    <ScrollToTop className={"products"}>
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: "40% 0%",
          height: "200px",
          margin: "2rem 0",
        }}
      ></div>
      <div className={"grid"}>
        {promotions.map((product, idx) => (
          <section key={idx} className={"grid_item"}>
            <img alt="" src={product.image} className={"item_img"} />
            <div className={"item_info"}>
              <Link to={`/${product.id}`} className={"item_link"}>
                {product.name}
              </Link>
              <p className={"item_price"}>{product.price}$</p>
            </div>
          </section>
        ))}
      </div>
    </ScrollToTop>
  );
};

export default PromotionsPage;
