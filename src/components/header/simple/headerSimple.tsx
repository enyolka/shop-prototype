import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as classNames from "classnames";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import MenuItem from "../../menuItem/menuItem";
import { AutoSuggest } from "../../autoSuggest/autoSuggest";
import { Accordion, AccordionSection } from "../../accordionMenu/accordionMenu";
import { AccountMenuOption, Option } from "../header";
import {
  Category,
  ProductContext,
  Subcategory,
} from "../../../contexts/GlobalState";
import "./headerSimple.css";
import logo from "/public/images/logo2-bg.png";

type Props = {
  options: Option[];
  categories: Category[];
  groupedProducts: any;
  settingOptions: string[];
  onSettingOptionSelect: (value: string) => void;
  accountMenuOptions: AccountMenuOption[];
  className?: string;
  menuItems?: React.ReactElement[];
  children?: React.ReactNode;
};

const HeaderSimple = ({
  categories,
  options,
  groupedProducts,
  settingOptions,
  onSettingOptionSelect,
  accountMenuOptions,
  children,
}: Props) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState<string | any>("");
  const context = React.useContext(ProductContext);

  const navigate = useNavigate();
  const menuRef = useRef(null);
  const togglerRef = useRef(null);

  const navigateAndClose = (url: string) => {
    navigate(url);
    setActive(false);
  };

  const handleClickOutside = (event: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !togglerRef.current.contains(event.target)
    ) {
      setActive(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const headerItems = [
    <MenuItem
      role="popup"
      to="/ustawienia"
      options={settingOptions}
      onOptionSelect={onSettingOptionSelect}
      className="header_bar__item"
      header="ustawienia"
      icon={<IoSettings className="header_bar__icon" />}
    />,
    <MenuItem
      to="/ulubione"
      className="header_bar__item"
      header="polubione"
      icon={<FaHeart className="header_bar__icon" />}
    />,
    <MenuItem
      to="/koszyk"
      className={classNames("header_bar__item", {
        "header_bar__item--dot": context.cart.length > 0,
      })}
      header="koszyk"
      icon={<FaShoppingCart className="header_bar__icon" />}
    />,
    <MenuItem
      to="/konto"
      options={
        sessionStorage.getItem("account") != null
          ? accountMenuOptions.map((item) => item.name)
          : null
      }
      onOptionSelect={(option) =>
        accountMenuOptions.find((item) => option == item.name).link()
      }
      // options={sessionStorage.getItem('account') != null ? ["Wyloguj"] : null}
      // onOptionSelect={toggleLogged}
      onClick={() => navigate(`/konto`)}
      className="header_bar__item"
      header="konto"
      icon={<FaUser className="header_bar__icon" />}
    />,
  ];

  const menuItems = [
    <AccordionSection
      header={"Strona główna"}
      onAdditionalClick={() => navigateAndClose(`/`)}
      expandable={false}
      color="main"
      headerColor="main"
    />,
    <AccordionSection
      header={"Wszystkie produkty"}
      onAdditionalClick={() => navigateAndClose(`/produkty`)}
      expandable={false}
      color="main"
      headerColor="main"
    />,
    <AccordionSection
      header={"Promocje"}
      onAdditionalClick={() => navigateAndClose(`/promocje`)}
      expandable={false}
      color="main"
      headerColor="main"
    />,
  ];

  return (
    <header className={classNames("header--simple")}>
      {/* <Button onClick={() => document.documentElement.style.setProperty('--main-light-max', 'red')}>change color</Button> */}

      <div
        className={classNames(
          "menu__toggler--simple",
          active ? "active" : null
        )}
        onClick={() => setActive(!active)}
        ref={togglerRef}
      >
        <span></span>
      </div>
      <div
        className={classNames("menu--simple", active ? "active" : null)}
        ref={menuRef}
      >
        <div className="menu__horizontalMenu">
          <MenuItem
            className="menu__horizontalMenu_item"
            onClick={() => navigateAndClose("/ulubione")}
            showActive={false}
            header={<FaHeart />}
          />
          <MenuItem
            className="menu__horizontalMenu_item"
            onClick={() => navigateAndClose("/koszyk")}
            showActive={false}
            header={<FaShoppingCart />}
          />
        </div>
        <Accordion>
          {menuItems.concat(
            categories.map((item: Category) => {
              return !!groupedProducts[item.name] ? (
                <AccordionSection
                  className="item_name"
                  header={item.name}
                  onAdditionalClick={() =>
                    navigateAndClose(`/produkty/${item.name}`)
                  }
                  color="main"
                  headerColor="main"
                >
                  {item.subcategories.map(({ name }: Subcategory) => (
                    <div
                      onClick={() =>
                        navigateAndClose(`/produkty/${item.name}/${name}`)
                      }
                      className={"item_link"}
                    >
                      {name}
                    </div>
                  ))}
                </AccordionSection>
              ) : null;
            })
          )}
        </Accordion>
      </div>

      <span
        className={classNames("logo--simple")}
        onClick={() => navigate("/")}
      >
        <img alt="logo" src={logo} className={classNames("logo_item")} />
      </span>

      <AutoSuggest
        className="search--simple"
        autoSuggestTerms={options}
        value={value}
        onChange={setValue}
        onSelection={(newValue) => {
          setValue(newValue);
          navigate(`/${newValue.value}`);
        }}
        label=""
        placeholder="Szukaj..."
      />

      <nav className={classNames("header_bar--text")} role="navigation">
        {/* <div className={classNames("bar_menu")}> */}
        {headerItems.map((item) => item)}
        {/* </div> */}
      </nav>

      <hr className="header__hr" />

      <nav
        className={classNames("header_horizontalMenu--simple")}
        role="navigation"
      >
        {/* <MenuItem to="/" className="header_bar__item" header="strona główna"/>
            <MenuItem to="/produkty" className="header_bar__item" header="Produkty"/>
            <MenuItem to="/promocje" className="header_bar__item" header="promocje"/> */}
        {categories.map((item: Category) => {
          return !!groupedProducts[item.name] ? (
            <MenuItem
              className="header_bar__item"
              onClick={() => navigate(`/produkty/${item.name}`)}
              icon={<i className={item.icon} />}
              header={item.name}
              to={`/produkty/${item.name}`}
              options={item.subcategories.map(({ name }: Subcategory) => name)}
              onOptionSelect={(name) => {
                navigateAndClose(`/produkty/${item.name}/${name}`);
              }}
            >
              {/* {item.name} */}
            </MenuItem>
          ) : null;
        })}
      </nav>
      {children}
    </header>
  );
};

export default HeaderSimple;
