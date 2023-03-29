import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductContext } from "../../contexts/GlobalState";

type Props = {
    className?: string;
    children?: React.ReactNode;
  };  

const ProductInfo = ({ children }: Props) => {
  const [product, setProduct] = useState(null)
  const context = React.useContext(ProductContext)
  let { id } = useParams();

  useEffect(() => {
    setProduct(context.products[parseInt(id)])
  }, [useParams(), context])


return (
  <>
    { product != null 
    ? <main>
        <p>{product.name}</p> 
        <div>
                <button
                  onClick={() => context.addProductToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => context.addProductToLiked(product)}
                >
                  Add to Liked
                </button>
              </div>
      </main>
    : <p>loading</p>
    }
  </>

  );
}

export default ProductInfo;

