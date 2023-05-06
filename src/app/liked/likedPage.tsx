import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import Message from "../../components/message/message";
import { ProductContext } from "../../contexts/GlobalState";
import placeholder from "/public/placeholder.png";
import { IoTrashBinSharp } from "react-icons/io5";
import "./likedPage.css"
import liked from "/public/img/loved.png"

const LikedPage =( props: any) => {
    const context = useContext(ProductContext);
  
    return (
      <>
        <article className="liked">
          <h2 className="liked_header"  style={{backgroundImage: `url(${liked})`}}>Polubione produkty</h2>
          {context.liked.length <= 0 && (
              <>
                <Message type="info">Brak elementów w sekcji ulubionych.</Message>
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
                    <IoTrashBinSharp className="button_remove__icon"/>
                  </Button>
              </li>
            ))}
          </ul>
        </article>
      </>
    );
  };

export default LikedPage;