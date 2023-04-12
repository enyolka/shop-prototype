import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import { ProductContext } from "../../contexts/GlobalState";

const CartPage =( props: any) => {
    const context = useContext(ProductContext);
  
    return (
      <>
        <main className="cart">
          {context.cart.length <= 0 && <p>No Item in the Cart!</p>}
          <ul>
            {context.cart.map(cartItem => (
              <li key={cartItem.id}>
                <div>
                  <Link to={`/${cartItem.id}`}>{cartItem.name}</Link> - ${cartItem.price} (
                  {cartItem.quantity})
                </div>
                <div>
                  <Button
                    onClick={context.removeProductFromCart.bind(
                      this,
                      cartItem.id
                    )}
                  >
                    Remove from Cart
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </>
    );
  };

export default CartPage;