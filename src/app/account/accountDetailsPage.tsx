import * as React from "react";
import * as Yup from "yup";
import { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";
import "./accountDetailsPage.css";
import AccountData from "./components/accountData";
import MenuItem from "../../components/menuItem/menuItem";
import ContactForm from "../additional/ContactForm";
import SettingsPage from "../additional/Settings";
import Loyalty from "./components/loyalty";
import DeliveryData from "./components/deliveryData";


const AccountDetailsPage =( props: any) => {
  const menu = ["accountData", "deliveryData", "loyalty", "settings", "contact"]
    const [menuOption, setMenuOption] = useState(menu[0])

    return (
      <article className="accountDetails">
      <nav className="accountDetails_menu">
        <MenuItem 
            header="Dane konta" 
            className="accountDetails_menuItem"
            onClick={() => setMenuOption("accountData")}
          />
          <MenuItem 
            header="Dane adresowe do wysyłki" 
            className="accountDetails_menuItem"
            onClick={() => setMenuOption("deliveryData")}
          />
          <MenuItem 
            header="Programy lojalnościowe" 
            className="accountDetails_menuItem"
            onClick={() => setMenuOption("loyalty")}
          />
          <MenuItem 
            header="Kontakt i pomoc" 
            className="accountDetails_menuItem"
            onClick={() => setMenuOption("contact")}
            />
      </nav>
        {menuOption === "accountData" && <AccountData/>}
        {menuOption === "deliveryData" && <DeliveryData/>}
        {menuOption === "loyalty" && <Loyalty/>}
        {menuOption === "contact" && <ContactForm/>}
     </article>
    );
  };

export default AccountDetailsPage;