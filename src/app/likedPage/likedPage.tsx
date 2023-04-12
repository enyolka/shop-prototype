import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import { ProductContext } from "../../contexts/GlobalState";

const LikedPage =( props: any) => {
    const context = useContext(ProductContext);
  
    return (
      <>
        <main className="cart">
          {context.liked.length <= 0 && <p>No Item in the Liked!</p>}
          <ul>
            {context.liked.map(item => (
              <li key={item.id}>
                <div>
                  <Link to={`/${item.id}`}>{item.name}</Link>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      context.removeProductFromLiked(item.id)}
                  >
                    Remove from Liked
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </>
    );
  };

export default LikedPage;