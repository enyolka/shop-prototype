import * as React from "react";
import "./notFound.css";
import notFound from "/public/images/404.png"

const NotFound =( props: any) => {
    return (
      <article className="not_found">
        <img alt="not-found" src={notFound}/>
     </article>
    );
  };

export default NotFound;