import { FieldInputProps, FieldMetaProps, FormikProps } from "formik";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";


const BuyPage =( props: any) => {
    const context = useContext(ProductContext);
    const [cost, setCost] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
      let sum = 0
      context.cart.forEach(({price, quantity}: Product) => sum += price * quantity)
      setCost(sum)
    }, [context.cart]) 

    const sumUp = () => {
      context.cart = []
      sessionStorage.setItem('cartItems', JSON.stringify([]))
      navigate("/podsumowanie");
    }


  
    return (
      <>
        <article className="buy">
          <div className="form">
            <form>
              <h4>Adres dostawy</h4>

              <label htmlFor="name">Imię</label>
              <input type="text" name="name"/>
              <label htmlFor="surname">Nazwisko</label>
              <input type="text" name="surname"/>
              <label htmlFor="street">Ulica</label>
              <input type="text" name="street"/>
              <label htmlFor="zipCode">Kod pocztowy</label>
              <input type="text" name="zipCode"/>
              <label htmlFor="city">Miejscowość</label>
              <input type="text" name="city"/>

              <h4>Dane kontaktowe</h4>

              <label htmlFor="phone">Numer telefonu</label>
              <input type="tel" name="phone"/>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email"/>
            </form>
          </div>
          <div className="summary">
            <h3>Podsumowanie zamówienia</h3>
            <ul>
              {context.cart.map(cartItem => (
                <li key={cartItem.id}>
                  <div>
                    <Link to={`/${cartItem.id}`}>{cartItem.name}</Link> - ${cartItem.price} (
                    {cartItem.quantity})
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p>Do zapłaty: {cost}$</p>
            <Button onClick={() => sumUp()} disabled={!!context.cart}>Kup produkty</Button>
          </div>
        </article>
      </>
    );
  };

export default BuyPage;