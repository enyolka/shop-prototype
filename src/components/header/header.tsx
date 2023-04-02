import * as React from "react";
import { useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MenuItem } from "../meu/menuItem";
import HeaderCompact from "./headerCompact";


type Props = {
    className?: string;
    children?: React.ReactNode;
  };
  

const Header = ({  children }: Props) => {
    const options = ["compact", "icon", "wide", "right"]
    const [option, setOption] = useState(options[0])

    const headerItems = [
        <MenuItem to="/ulubione"><FaHeart/></MenuItem>,
        <MenuItem to="/koszyk"><FaShoppingCart/></MenuItem>
    ]
    
    const menuItems = [
        <MenuItem to="/produkty">Produkty</MenuItem>
    ]
    
    return (
        <>
            {option == "compact" 
            ? <HeaderCompact />
            : null}
        
        </>  
    )
}

export default Header;