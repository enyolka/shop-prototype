import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as classNames from "classnames";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import MenuItem from "../../menuItem/menuItem";
import { AutoSuggest } from "../../autoSuggest/autoSuggest";
import { Accordion, AccordionSection } from "../../accordionMenu/accordionMenu";
import { AccountMenuOption, Option } from "../header";
import {
  Category,
  ProductContext,
  Subcategory,
} from "../../../contexts/GlobalState";
import "./headerRightside.css";
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

const HeaderRightside = ({
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
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const togglerRef = useRef(null);
  const context = React.useContext(ProductContext);

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
    />,
    <MenuItem to="/ulubione" className="header_bar__item" header="polubione" />,
    <MenuItem
      to="/koszyk"
      className={classNames("header_bar__item", {
        "txt--dot": context.cart.length > 0,
      })}
      header="koszyk"
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
      onClick={() => navigate(`/konto`)}
      className="header_bar__item"
      header="konto"
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
    <header className={classNames("header--right")}>
      <div
        className={classNames("menu__toggler--right", active ? "active" : null)}
        onClick={() => setActive(!active)}
        ref={togglerRef}
      >
        <span></span>
      </div>
      <div
        className={classNames("menu--right", active ? "active" : null)}
        ref={menuRef}
      >
        <div className="menu__important">
          <MenuItem
            className="menu__important_item"
            onClick={() => navigateAndClose("/ulubione")}
            showActive={false}
            header={<FaHeart />}
          />
          <MenuItem
            className="menu__important_item"
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

      <span className={classNames("logo--right")} onClick={() => navigate("/")}>
        <img alt="logo" src={logo} className={classNames("logo_item")} />
      </span>

      <AutoSuggest
        className="search--right"
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

      <hr className="header__hr--right" />

      <nav className={classNames("header_important--right")} role="navigation">
        <MenuItem to="/" className="header_bar__item" header="strona główna" />
        <MenuItem
          to="/produkty"
          className="header_bar__item"
          header="Produkty"
        />
        <MenuItem
          to="/promocje"
          className="header_bar__item"
          header="promocje"
        />
      </nav>
      {children}
    </header>
  );
};

export default HeaderRightside;
