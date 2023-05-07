import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import Message from "../../components/message/message";
import { Product, ProductContext } from "../../contexts/GlobalState";
import placeholder from "/public/placeholder.png";
import "./cartPage.css";
import { IoTrashBinSharp } from "react-icons/io5";
import Link from "../../components/link/link";

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
        <article className="cart">
          <h2 className="cart_header">Twój koszyk</h2>
          {context.cart.length <= 0 ? (
              <>
                <Message type="info" size="big" wrapped className="cart__message">Brak elementów w koszyku.</Message>
                <Link to={`/produkty`} className="cart__link">Przeglądaj produkty i dodawaj do swojej listy zakupowej.</Link>
              </>
            ) :
          (<ul className="cart_list">
            {context.cart.map(cartItem => (
              <li key={cartItem.id} className="cart_item">
                <img alt="" src={cartItem.image} className="cart_item__img"/>
                <Link to={`/${cartItem.id}`} className="cart_item__link">{cartItem.name}</Link>
                
                <Button
                  onClick={() => context.removeAllProductFromCart(cartItem.id)}
                  className="button_remove"
                >

                  <IoTrashBinSharp className="button_remove__icon"/>

                </Button>
                <div className="counter">
                  <Button 
                    className="counter__button" 
                    onClick={() => context.removeProductFromCart(cartItem.id)}
                  >-</Button>
                  <p className="counter__value">{cartItem.quantity}</p>
                  <Button 
                    className="counter__button" 
                    onClick={() => context.addProductToCart(cartItem)}
                  >+</Button>
                </div>

                <p className="cart_item__price">{(cartItem.price * cartItem.quantity).toFixed(2)}$</p>
              </li>
            ))}
          </ul>)}
          { context.cart.length > 0 ? (
          <div className=" cart_summary">
            <p>Do zapłaty: {cost.toFixed(2)}$</p>
            <Button 
              onClick={() => navigate("/realizuj-zamowienie")} 
              disabled={context.cart.length == 0}
              role="important"
              className="cart_summary__button"
            >
              Przejdź do kasy
            </Button>
          </div>) : null}
        </article>
      </>
    );
  };

export default CartPage;