import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import Message from "../../components/message/message";
import { ProductContext } from "../../contexts/GlobalState";
import placeholder from "/public/placeholder.png";
import { RiDeleteBin2Fill } from "react-icons/ri";
import "./likedPage.css"

const LikedPage =( props: any) => {
    const context = useContext(ProductContext);
  
    return (
      <>
        <article className="liked">
          <h2 className="liked_header">Polubione produkty</h2>
          {context.liked.length <= 0 && (
              <>
                <Message type="error">Brak elementów w sekcji ulubionych.</Message>
                <Link to={`/produkty`} className="liked_link">Przeglądaj produkty i dodawaj do swojej listy.</Link>
              </>
            )}
          <ul className="liked_list">
            {context.liked.map(item => (
              <li key={item.id} className="liked_item">
                  <img alt="" src={placeholder} className="liked_item__img"/>
                  <Link to={`/${item.id}`} className="liked_item__link">{item.name}</Link>
                  <Button
                    onClick={() =>
                      context.removeProductFromLiked(item.id)}
                      className="button_remove"
                  >
                    <RiDeleteBin2Fill className="button_remove__icon"/>
                  </Button>
              </li>
            ))}
          </ul>
        </article>
      </>
    );
  };

export default LikedPage;