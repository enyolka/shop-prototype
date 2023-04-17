import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductContext } from "../../contexts/GlobalState";
import Button from "../../components/button/button";

type Props = {
    className?: string;
    children?: React.ReactNode;
  };  

const ProductInfo = ({ children }: Props) => {
  const [product, setProduct] = useState(null)
  const context = React.useContext(ProductContext)
  let { id } = useParams();

  useEffect(() => {
    setProduct(context.products.find(product => product.id === id))
  }, [useParams(), context])

  return (
    <>
      { product != null 
      ? <main>
          <p>{product.name}</p> 
          <div>
                  <Button
                    onClick={() => context.addProductToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => context.addProductToLiked(product)}
                  >
                    Add to Liked
                  </Button>
                </div>
        </main>
      : <p>loading product</p>
      }
    </>

  );
}

export default ProductInfo;

