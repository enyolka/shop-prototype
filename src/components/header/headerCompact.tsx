import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./headerCompact.css";
import * as classNames from "classnames";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { MenuItem } from "../meu/menuItem";
import * as classnames from "classnames";
import { ReactComponent } from "@uirouter/react";
import { AutoSuggest } from "../autoSuggest/autoSuggest";
import { Accordion, AccordionSection } from "../accordionMenu/accordionMenu";
import { Option } from "./header";
import { Category, Subcategory } from "../../contexts/GlobalState";

type Props = {
    options: Option[];
    categories: Category[];
    groupedProducts: any;
    className?: string;
    menuItems?: React.ReactElement[];
    children?: React.ReactNode;
  };
  
const HeaderCompact = ({ categories, options, children, groupedProducts}: Props) => {
    const [active, setActive] = useState(false)
    const [grouped, setGrouped] = useState(groupedProducts)
    const [value, setValue] = useState<string | any>("");
    const navigate = useNavigate();

    useEffect(() => setGrouped(groupedProducts),[groupedProducts])

    const naviagateAndClose = (url: string) => {
         navigate(url);
         setActive(false)
    }

    const headerItems = [
        <MenuItem to="/ulubione"><FaHeart className="header_bar__icon"/></MenuItem>,
        <MenuItem to="/koszyk"><FaShoppingCart className="header_bar__icon"/></MenuItem>,
        <MenuItem to="/konto"><FaUser className="header_bar__icon"/></MenuItem>
    ]
    
    const menuItems = [
        <AccordionSection header={"Strona główna"} onAdditionalClick={() => naviagateAndClose(`/`)} expandable={false}/>,
        <AccordionSection header={"Wszystkie produkty"} onAdditionalClick={() => naviagateAndClose(`/produkty`)} expandable={false}/>
    ]
    
    return (
        <header className={classNames("header")}>

            <div 
                className={classnames("menu__toggler", active ? "active" : null)}
                onClick={() => setActive(!active)}
            >
                <span></span>
            </div>
            <div className={classnames("menu", active ? "active" : null)}> 
            <Accordion>
                {menuItems.concat(categories.map((item: Category) => {
                    return (!!groupedProducts[item.name] 
                        ? <AccordionSection className="item_name" header={item.name} onAdditionalClick={() => naviagateAndClose(`/produkty/${item.name}`)} color="default">{
                            item.subcategories.map(({ name }: Subcategory) => 
                                <div onClick={()=> naviagateAndClose(`/produkty/${item.name}/${name}`)} className={"item_link"}>{name}</div>)
                        }
                        </AccordionSection> 
                        : null)
                    }))
             }
            </Accordion>
            </div>


            <span className={classNames("logo")}>
                <i className={classNames("logo_item")}>LOGO</i>
            </span>

            <AutoSuggest
                className="search"
                autoSuggestTerms={options}
                value={value}
                onChange={setValue}
                onSelection={(newValue) => {
                    setValue(newValue);
                    navigate(`/${newValue.value}`)
                }}
                label=""
                placeholder="Szukaj..."
            />

            <nav className={classNames("header_bar")} role="navigation">
                {/* <div className={classNames("bar_menu")}> */}
                    {headerItems.map(item => item)}
                {/* </div> */}
            </nav>
                {children}
        </header>
    )
}

export default HeaderCompact;