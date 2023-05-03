import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import placeholder from "/public/placeholder.png";
import { Product, ProductContext } from "../../contexts/GlobalState";

type Props = {
  onNext: (idx: number) => void;
}

const SummaryPage =( { onNext }: Props) => {
    const context = useContext(ProductContext);
    const navigate = useNavigate();
    const [cost, setCost] = useState(0);

    const sumUp = () => {
      context.removeAllProductsFromCart()
      navigate("/podsumowanie");
    }
    
    useEffect(() => {
      let sum = 0
      context.cart.forEach(({price, quantity}: Product) => sum += price * quantity)
      setCost(sum)
    }, [context.cart]) 

  
    return (           
      <div className="summary">
        <h3>Podsumowanie zamówienia</h3>
        <ul className="summary_list">
          {context.cart.map(cartItem => (
            <li key={cartItem.id} className="summary_item">
                <img alt="" src={placeholder} className="summary_item__img"/>
                <Link to={`/${cartItem.id}`} className="summary_item__link">{cartItem.name}</Link>
                <p className="summary_item__price">{(cartItem.price * cartItem.quantity).toFixed(2)}$</p>
            </li>
          ))}
        </ul>
        <div >
          <p className="summary_cost">Do zapłaty: {cost.toFixed(2)}$</p>
        </div>
          <Button role="default" onClick={() => onNext(1)}>
              Poprzedni
          </Button>
          <Button role="important" onClick={() => sumUp()}>Potwierdź</Button>
      </div>
    );
  };

export default SummaryPage;