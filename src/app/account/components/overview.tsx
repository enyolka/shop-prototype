import * as React from "react";
import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";


const Overview =( props: any) => {
    return (
      <article className="overview">
        <h2>Witaj!</h2>
        <div>
            <span>Na Twoim profilu możesz zarządzać swoimi zamówieniami, zwrotami oraz ustawieniami konta.</span>
        </div>

     </article>
    );
  };

export default Overview;