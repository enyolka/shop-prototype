import * as React from "react";
import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";


const ContactForm =( props: any) => {
  const menu = ["accountData", "settings", "contact"]
    const [menuOption, setMenuOption] = useState(menu[0])

    const context = useContext(ProductContext);
    const navigate = useNavigate();

    return (
      <article className="contact">
        <h2>Skontaktuj się z nami!</h2>

     </article>
    );
  };

export default ContactForm;