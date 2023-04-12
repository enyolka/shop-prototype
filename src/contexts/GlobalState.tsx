import { useState, useReducer, useEffect, ReactElement } from "react";
import * as React from "react";
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT, ADD_LIKED, REMOVE_LIKED } from "./reducers";
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json"

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

export type Category = {
  name: string;
  subcategories: Subcategory[];
}

export type Subcategory = {
  name: string;
}

interface ProductContextInterface {
  products: Product[],
  cart: Product[],
  liked: Product[],
  categories: Category[],
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
  categories: [],
  addProductToCart: (product: Product) => {},
  removeProductFromCart: (productId: string) => {},
  addProductToLiked: (product: Product) => {},
  removeProductFromLiked: (productId: string) => {},
});

const GlobalState = ({ children }: Props) => {
  const[products, setProducts] = useState<Product[]>([])
  const[categories, setCategories] = useState<Category[]>([])
  const [cartState, dispatchCart] = useReducer(shopReducer, { cart: sessionStorage.getItem("cartItems") != null ? JSON.parse(sessionStorage.getItem("cartItems")) : []  });
  const [likedState, dispatchLiked] = useReducer(shopReducer, { liked: sessionStorage.getItem("likedItems") != null ? JSON.parse(sessionStorage.getItem("likedItems")) : [] });

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

  
  const translateCategory = (category: any) => {
    return {
      name: category.name,
      subcategories: category.subcategories//(subcategory => subcategory.name)
    }
  }

  useEffect(() => {
    const ungroupedProducts = productsData.products.data.items.map(translateProduct);
    setProducts(ungroupedProducts);
    // const x = groupBy(ungroupedProducts, (product : Product) => product.category);
    // console.log([... x.bags, ...x.office]);
  }, [productsData])  

  useEffect(() => setCategories(categoriesData.map(translateCategory)), [categoriesData])

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
    categories,
    addProductToCart,
    removeProductFromCart,
    addProductToLiked,
    removeProductFromLiked,
  }

  return <ProductContext.Provider value={context}>{children}</ProductContext.Provider>
};

function groupBy<T>(arr: T[], fn: (item: T) => any) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
      const groupKey = fn(curr);
      const group = prev[groupKey] || [];
      group.push(curr);
      return { ...prev, [groupKey]: group };
  }, {});
}

export default GlobalState;
