import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";

const SummaryPage =( props: any) => {
    const context = useContext(ProductContext);
    const [cost, setCost] = useState(0);
    
    useEffect(() => {
      let sum = 0
      context.cart.forEach(({price, quantity}: Product) => sum += price * quantity)
      setCost(sum)
    }, [context.cart]) 
  
    return (
      <>
        <main className="buy">
         <div>Dziękujemy za zakupy!</div>
        </main>
      </>
    );
  };

export default SummaryPage;