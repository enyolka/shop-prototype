import { useState, useReducer, useEffect, ReactElement } from "react";
import * as React from "react";
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT, ADD_LIKED, REMOVE_LIKED } from "./reducers";
import data from "../data/products.json";

export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    subcategory: string;
    description: string;
    image: string;
    quantity: number;
    isLiked: boolean;
}

interface ProductContextInterface {
  products: Product[],
  cart: Product[],
  liked: Product[],
  addProductToCart(product: Product): void,
  removeProductFromCart(id: string): void,
  addProductToLiked(product: Product): void,
  removeProductFromLiked(id: string): void,
}

interface Props {
  children: ReactElement
}

export const ProductContext =  React.createContext<ProductContextInterface>({
  products: [],
  cart: [],
  liked: [],
  addProductToCart: (product: Product) => {},
  removeProductFromCart: (productId: string) => {},
  addProductToLiked: (product: Product) => {},
  removeProductFromLiked: (productId: string) => {},
});

const GlobalState = ({ children }: Props) => {
  const[products, setProducts] = useState<Product[]>([])

  const translateProduct = (product: any) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      image: product.url
    }
  }

  useEffect(() => 
    setProducts(data.products.data.items.map(translateProduct)), [data])

    const [cartState, dispatchCart] = useReducer(shopReducer, { cart: [] });
    const [likedState, dispatchLiked] = useReducer(shopReducer, { liked: [] });

    const addProductToCart = (product: Product) => {
        dispatchCart({ type: ADD_PRODUCT, product: product });
    };

    const removeProductFromCart = (productId: string) => {
        dispatchCart({ type: REMOVE_PRODUCT, productId: productId });
    };

    const addProductToLiked = (product: Product) => {
      dispatchLiked({ type: ADD_LIKED, product: product });
    };

    const removeProductFromLiked = (productId: String) => {
      dispatchLiked({ type: REMOVE_LIKED, productId: productId });
    };

    const context = {
      products,
      cart: cartState.cart,
      liked: likedState.liked,
      addProductToCart,
      removeProductFromCart,
      addProductToLiked,
      removeProductFromLiked,
    }

  return <ProductContext.Provider value={context}>{children}</ProductContext.Provider>
};

export default GlobalState;
