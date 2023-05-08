import * as React from "react";
import * as Yup from "yup";
import { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";
import "./accountDetailsPage.css";
import AccountData from "./components/accountData";
import MenuItem from "../../components/menuItem/menuItem";
import Loyalty from "./components/loyalty";
import DeliveryData from "./components/deliveryData";
import ContactPage from "../additional/contactPage";


const AccountDetailsPage =( props: any) => {
  const menu = ["accountData", "deliveryData", "loyalty", "contact", "settings",]
    const [menuOption, setMenuOption] = useState(menu[0])

    return (
      <article className="accountDetails">
      <nav className="accountDetails_menu">
        <MenuItem 
            header="Dane konta" 
            className="accountDetails_menuItem"
            onClick={() => setMenuOption("accountData")}
            showActive={menuOption === "accountData"}
          />
          <MenuItem 
            header="Dane adresowe do wysyłki" 
            className="accountDetails_menuItem"
            onClick={() => setMenuOption("deliveryData")}
            showActive={menuOption === "deliveryData"}
          />
          <MenuItem 
            header="Programy lojalnościowe" 
            className="accountDetails_menuItem"
            onClick={() => setMenuOption("loyalty")}
            showActive={menuOption === "loyalty"}
          />
          <MenuItem 
            // to="/kontakt"
            header="Kontakt i pomoc" 
            className="accountDetails_menuItem"
            onClick={() => setMenuOption("contact")}
            showActive={menuOption === "contact"}
            />
      </nav>
        {menuOption === "accountData" && <AccountData/>}
        {menuOption === "deliveryData" && <DeliveryData/>}
        {menuOption === "loyalty" && <Loyalty/>}
        {menuOption === "contact" && <ContactPage/>}
     </article>
    );
  };

export default AccountDetailsPage;