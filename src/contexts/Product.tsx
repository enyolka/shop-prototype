import { FC, createContext, useState, useEffect, ReactElement, useCallback } from 'react';
import * as React from 'react';
import data from "../data/products.json";

export type Product = {
    name: string,
    price: number,
    category: string,
    subcategory: string,
    description: string,
    image: string
}

interface Product_Context {
  items: Product[],
}

interface Props {
  children: ReactElement
}

export const ProductContext = createContext<Product_Context>({
  items: []
})

const ProductProvider: FC<Props> = ({ children }): ReactElement => {
  // Stan
  const [items, setItems] = useState<Product[]>([])

  const translateProduct = (product: any) => {
    return {
      name: product.name,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      image: product.url
    }
  }

  useEffect(() => 
    setItems(data.products.data.items.map(translateProduct)), [data])

  const context = {
    items
  }

  return <ProductContext.Provider value={context}>{children}</ProductContext.Provider>
}

export default ProductProvider