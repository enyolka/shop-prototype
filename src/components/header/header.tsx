import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

type Props = {
    options: string[];
    option: string;
    setOption: (value: string) => void;
    className?: string;
    children?: React.ReactNode;
  };
  
const Header = ({ options, option ,setOption, children }: Props) => {
    const context = useContext(ProductContext);
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
            />
            : 
            option === "simple" 
            ? <HeaderSimple
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setOption}
                /> : 
            option === "extensive" 
            ? <HeaderExtensive
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setOption}
            /> : 
            <HeaderRightside
                categories={context.categories} 
                options={productOptions} 
                groupedProducts={groupedProducts}
                settingOptions={options}
                onSettingOptionSelect={setOption}
            />
        }
        
        </>  
    )
}

export default Header;