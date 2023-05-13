import * as React from "react";
import { Link, useParams } from "react-router-dom";
import placeholder from "/public/placeholder.png";
import { useEffect, useState } from "react";
import { ProductContext } from "../../contexts/GlobalState";
import Button from "../../components/button/button";
import "./productInfo.css"
import * as classNames from "classnames";
import NotFound from "../additional/notFound";

type Props = {
    className?: string;
    children?: React.ReactNode;
  };  

const ProductInfo = ({ children }: Props) => {
  const context = React.useContext(ProductContext)
  let { id } = useParams();
  const [product, setProduct] = useState(null)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    setProduct(context.products.find(product => product.id === id))
  }, [id, context])

  useEffect(() => {
    setIsLiked(context.liked.find((item) => item?.id === product?.id)?.isLiked)
  }, [product, context])

  return (
    <>
      { product != null 
      ? <article className="itemInfo">
        
          <h2 className="itemInfo_header">{product.name}</h2> 
          <hr className="itemInfo_header__hr"/>
          <img alt="" src={product.image} className="itemInfo_img"/>

          <div className="itemInfo_info">
            <p className="itemInfo_info__price">{product.price}$</p>
            <p className="itemInfo_info__description">{product.description}</p>
            <p className="itemInfo_info__description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque molestiae vitae odit repellat impedit enim aliquam, doloribus corporis! Similique obcaecati accusamus quam vitae non eum, voluptatum veniam repellendus odio sit consequuntur. Ipsam fugiat reiciendis quam ex ad eos quidem libero accusantium, cum atque provident pariatur corporis, nostrum obcaecati animi voluptatem.</p>
          </div>

          <div className="itemInfo_buttons">
            <Button
              className={classNames({"dislike": isLiked})}
              effect={true}
              onClick={() => {
                isLiked ? context.removeProductFromLiked(product.id) : context.addProductToLiked(product)}}
            >
              {isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
              <span></span>
            </Button>
            <Button
              role="secondary"
              effect={true}
              onClick={() => context.addProductToCart(product)}
            >
              Dodaj do koszyka
            </Button>
          </div>
        </article>
      : <NotFound/>
      }
    </>

  );
}

export default ProductInfo;

