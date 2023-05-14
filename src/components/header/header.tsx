import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product, ProductContext } from "../../contexts/GlobalState";
import HeaderLeftside from "./leftside/headerLeftside";
import categories from "../../data/categories.json"
import HeaderRightside from "./rightside/headerRightside";
import HeaderSimple from "./simple/headerSimple";
import HeaderExtensive from "./extensive/headerExtensive";
import Button from "../button/button";

export type Option = {
    value: string;
    label: string;
    description?: string,
    category: string;
    subcategory?: string;
    icon?: React.ReactElement;
    disabled?: boolean;
}

export type AccountMenuOption = {
    name: string;
    link: () => void;
}

type Props = {
    options: string[];
    option: string;
    setOption: (value: string) => void;
    className?: string;
    children?: React.ReactNode;
  };
  
const Header = ({ options, option ,setOption, children }: Props) => {
    const context = useContext(ProductContext);
    const navigate = useNavigate();

    const accountOptions = ["logowanie", "rejestracja"] 
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
    
    const toggleLogged = () => {
        sessionStorage.removeItem("account")
        sessionStorage.setItem('logged', JSON.stringify(false))
        window.location.reload()
    }

    const accountMenuOptions = [
        {
            name: "Informacje",
            link: () => navigate("/konto/informacje"),
        },
        {
            name: "Adres",
            link: () => navigate("/konto/adres") ,
        },
        {
            name: "Kupony",
            link: () => navigate("/konto/programy-lojalnosciowe"),
        },
        {
            name: "Kontakt i pomoc",
            link: () => navigate("/konto/kontakt"),
        },
        {
            name: "Wyloguj",
            link: toggleLogged,
        },
    ]

    return (
        <>
        {
            option === "leftside" 
            ? <HeaderLeftside
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setOption}
                accountOptions={accountOptions}
                accountMenuOptions={accountMenuOptions}
            />
            : 
            option === "simple" 
            ? <HeaderSimple
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setOption}
                accountMenuOptions={accountMenuOptions}
                /> : 
            option === "extensive" 
            ? <HeaderExtensive
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setOption}
                accountMenuOptions={accountMenuOptions}
            /> : 
            <HeaderRightside
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setOption}
                accountMenuOptions={accountMenuOptions}
            />
        }
        
        </>  
    )
}

export default Header;