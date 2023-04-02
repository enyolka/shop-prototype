import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./headerCompact.module.css";
import * as classNames from "classnames";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { MenuItem } from "../meu/menuItem";
import * as classnames from "classnames";

type Props = {
    className?: string;
    menuItems?: React.ReactElement[];
    children?: React.ReactNode;
  };
  

const HeaderCompact = ({ children }: Props) => {
    const [active, setActive] = useState(false)

    const headerItems = [
        <MenuItem to="/ulubione"><FaHeart/></MenuItem>,
        <MenuItem to="/koszyk"><FaShoppingCart/></MenuItem>
    ]
    
    const menuItems = [
        <MenuItem to="/produkty"  onClick={() => setActive(false)}>Produkty</MenuItem>
    ]
    
    return (
        <header className={classNames(styles.header)}>

            <div 
                className={classnames(styles.menu__toggler, active ? styles.active : null)}
                onClick={() => setActive(!active)}
            >
                <span></span>
            </div>
            <div className={classnames(styles.menu, active ? styles.active : null)}> 
                <ul>
                    {menuItems.map(item => <li>{item}</li>)}
                </ul>
            </div>


            <span className={classNames(styles.logo)}>
                <i className={classNames(styles.logo_item)}>LOGO</i>
            </span>
            
            <nav className={classNames(styles.header_bar)} role="navigation">
                <div className={classNames(styles.bar_menu)}>
                    {headerItems.map(item => item)}
                </div>
            </nav>
                {children}
        </header>
    )
}

export default HeaderCompact;