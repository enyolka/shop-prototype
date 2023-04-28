import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product, ProductContext } from "../../contexts/GlobalState";
import HeaderLeftside from "./leftside/headerLeftside";
import categories from "../../data/categories.json"
import HeaderRightside from "./rightside/headerRightside";
import HeaderSimple from "./simple/headerSimple";
import HeaderExtensive from "./extensive/headerExtensive";

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
    const options = ["leftside", "simple", "extensive", "rightside"]
    const accountOptions = ["logowanie", "rejestracja"]
    const [option, setOption] = useState(sessionStorage.getItem("header") != null ? sessionStorage.getItem("header") : options[0] )    
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

    const setHeaderOption = (newOption: string) => {
        setOption(newOption)
        sessionStorage.setItem("header", newOption)
    }    

    return (
        <>
        {
            option === "leftside" 
            ? <HeaderLeftside
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setHeaderOption}
                accountOptions={accountOptions}
            />
            : 
            option === "simple" 
            ? <HeaderSimple
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setHeaderOption}
                /> : 
            option === "extensive" 
            ? <HeaderExtensive
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setHeaderOption}
            /> : 
            <HeaderRightside
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setHeaderOption}
            />
        }
        
        </>  
    )
}

export default Header;