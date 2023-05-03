import * as React from "react";
import * as Yup from "yup";
import { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";

const SettingsPage =( props: any) => {
  const menu = ["accountData", "settings", "contact"]
    const [menuOption, setMenuOption] = useState(menu[0])

    const context = useContext(ProductContext);
    const navigate = useNavigate();

    return (
      <article className="settings">

     </article>
    );
  };

export default SettingsPage;