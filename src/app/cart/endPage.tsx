import * as React from "react";
import shopping from "/public/images/shopping.png";
import "./buyPage.css";

const EndPage = (props: any) => {
  return (
    <div className="ending">
      <h1 className="ending__header">Dziękujemy za zakupy!</h1>
      <h4 className="ending__header">Twoje zamówienie zostało złożone.</h4>
      <img alt="shopping" src={shopping} className="ending__img" />
    </div>
  );
};

export default EndPage;
