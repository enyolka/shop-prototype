import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Product, ProductContext } from "../../contexts/GlobalState";
import MenuItem from "../menuItem/menuItem";
import HeaderCompact from "./headerCompact";
import categories from "../../data/categories.json"

export type Option = {
    value: string;
    label: string;
    description?: string,
    category: string;
    subcategory?: string;
    icon?: React.ReactElement;
    disabled?: boolean;
}

type Props = {
    className?: string;
    children?: React.ReactNode;
  };
  
const Header = ({  children }: Props) => {
    const context = useContext(ProductContext);
    const options = ["compact", "icon", "wide", "right"]
    const [option, setOption] = useState(options[0])    
    const productOptions = context.products.map(({name, category, subcategory, id}: Product) => {
        return {
            value: id,
            label: name,
            category,
            subcategory
        }
    })
  
    const groupedProducts  = productOptions.reduce((soFar: any, item: any) => {
        if (soFar[item.category] == undefined) soFar[item.category] = [];
        soFar[item.category].push(item);
        return soFar;
        }, {});

    const headerItems = [
        <MenuItem to="/ulubione"><FaHeart/></MenuItem>,
        <MenuItem to="/koszyk"><FaShoppingCart/></MenuItem>,
        <MenuItem to="/konto"><FaUser/></MenuItem>
    ]
    
    const menuItems = [
        <MenuItem to="/produkty">Produkty</MenuItem>
    ]
    
    return (
        <>
            {option == "compact" 
            ? <HeaderCompact 
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setOption}
            />
            : null}
        
        </>  
    )
}

export default Header;