import * as React from "react";
import { Product } from "../../app";
import { Link, useParams } from "react-router-dom";

type Props = {
    data: Product[];
    className?: string;
    children?: React.ReactNode;
  };  

const ProductInfo = ({ data, children }: Props) => {
    let { id } = useParams();
    const product: Product = data[parseInt(id)]

    return (<p>{product.name}</p>);
}

export default ProductInfo;