import * as React from "react";
import { Link, useParams } from "react-router-dom";
import placeholder from "/public/placeholder.png";
import { useEffect, useState } from "react";
import { ProductContext } from "../../contexts/GlobalState";
import Button from "../../components/button/button";
import "./productInfo.css"

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
          <img alt="" src={placeholder} className="itemInfo_img"/>
          <div className="itemInfo_info">
            <p className="itemInfo_info__price">{product.price}$</p>
            <p className="itemInfo_info__description">{product.description}</p>
          </div>
          <div className="itemInfo_buttons">
            <Button
              onClick={() => {
                isLiked ? context.removeProductFromLiked(product.id) : context.addProductToLiked(product)}}
            >
              {isLiked ? "Remove from liked" : "Add to Liked"}
            </Button>
            <Button
              role="secondary"
              effect={true}
              onClick={() => context.addProductToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        </article>
      : <p>loading product</p>
      }
    </>

  );
}

export default ProductInfo;

