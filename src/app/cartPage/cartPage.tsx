import * as React from "react";
import { useContext } from "react";
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
                  <strong>{cartItem.name}</strong> - ${cartItem.price} (
                  {cartItem.quantity})
                </div>
                <div>
                  <button
                    onClick={context.removeProductFromCart.bind(
                      this,
                      cartItem.id
                    )}
                  >
                    Remove from Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </>
    );
  };

export default CartPage;