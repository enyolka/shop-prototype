import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import Message from "../../components/message/message";
import { Product, ProductContext } from "../../contexts/GlobalState";
import placeholder from "/public/placeholder.png";
import "./cartPage.css";
import { RiDeleteBin2Fill } from "react-icons/ri";

const CartPage =( props: any) => {
    const context = useContext(ProductContext);
    const [cost, setCost] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
      let sum = 0
      context.cart.forEach(({price, quantity}: Product) => sum += price * quantity)
      setCost(sum)
    }, [context.cart]) 
  
    return (
      <>
        <main className="cart">
          <h2 className="cart_header">Twój koszyk</h2>
          {context.cart.length <= 0 && (
              <>
                <Message type="error">Brak elementów w koszyku.</Message>
                <Link to={`/produkty`} className="cart_link">Przeglądaj produkty i dodawaj do swojej listy zakupowej.</Link>
              </>
            )}
          <ul className="cart_list">
            {context.cart.map(cartItem => (
              <li key={cartItem.id} className="cart_item">
                <img alt="" src={placeholder} className="cart_item__img"/>
                <Link to={`/${cartItem.id}`} className="cart_item__link">{cartItem.name}</Link>
                
                <Button
                  onClick={context.removeProductFromCart.bind(
                    this,
                    cartItem.id
                  )}
                  className="button_remove"
                >
                  <RiDeleteBin2Fill className="button_remove__icon"/>
                </Button>
                <div className="counter">
                  <Button className="counter__button">-</Button>
                  <p className="counter__value">{cartItem.quantity}</p>
                  <Button className="counter__button">+</Button>
                </div>

                <p>{cartItem.price * cartItem.quantity}$</p>
              </li>
            ))}
          </ul>
          <div className="cart_summary">
            <p>Do zapłaty: {cost}$</p>
            <Button onClick={() => navigate("/realizuj-zamowienie")} disabled={context.cart.length == 0}>Przejdź do kasy</Button>
          </div>
        </main>
      </>
    );
  };

export default CartPage;