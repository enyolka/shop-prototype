import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductContext} from '../../contexts/Product'

type Props = {
    className?: string;
    children?: React.ReactNode;
  };  

const ProductInfo = ({ children }: Props) => {
  const [product, setProduct] = useState(null)
  const { items } = React.useContext(ProductContext)
  let { id } = useParams();

  useEffect(() => {
    setProduct(items[parseInt(id)])
  }, [useParams(), items])


return (
  <>
    { product != null 
    ? <p>{product.name}</p> 
    : <p>loading</p>
    }
  </>

  );
}

export default ProductInfo;

