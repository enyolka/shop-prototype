import * as React from "react";
import { useState } from "react";
import "./accountDetailsPage.css";
import AccountData from "./components/accountData";
import MenuItem from "../../components/menuItem/menuItem";
import Loyalty from "./components/loyalty";
import DeliveryData from "./components/deliveryData";
import ContactPage from "../additional/contactPage";

type Props = {
  option?: "accountData" | "deliveryData" | "loyalty" | "contact";
};

const AccountDetailsPage = ({ option }: Props) => {
  const menu = [
    "accountData",
    "deliveryData",
    "loyalty",
    "contact",
    "settings",
  ];
  const [menuOption, setMenuOption] = useState(option || menu[0]);

  React.useEffect(() => setMenuOption(option || menu[0]), [option]);

  return (
    <article className="accountDetails">
      <nav className="accountDetails_menu">
        <MenuItem
          to="/konto/informacje"
          header="Dane konta"
          className="accountDetails_menuItem"
          onClick={() => setMenuOption("accountData")}
          showActive={menuOption == "accountData"}
        />
        <MenuItem
          to="/konto/adres"
          header="Dane adresowe do wysyłki"
          className="accountDetails_menuItem"
          onClick={() => setMenuOption("deliveryData")}
          showActive={menuOption === "deliveryData"}
        />
        <MenuItem
          to="/konto/programy-lojalnosciowe"
          header="Programy lojalnościowe"
          className="accountDetails_menuItem"
          onClick={() => setMenuOption("loyalty")}
          showActive={menuOption === "loyalty"}
        />
        <MenuItem
          to="/konto/kontakt"
          header="Kontakt i pomoc"
          className="accountDetails_menuItem"
          onClick={() => setMenuOption("contact")}
          showActive={menuOption === "contact"}
        />
      </nav>
      {menuOption === "accountData" && <AccountData />}
      {menuOption === "deliveryData" && <DeliveryData />}
      {menuOption === "loyalty" && <Loyalty />}
      {menuOption === "contact" && <ContactPage />}
    </article>
  );
};

export default AccountDetailsPage;
