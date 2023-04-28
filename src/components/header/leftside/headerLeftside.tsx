import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as classNames from "classnames";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import MenuItem from "../../menuItem/menuItem";
import { ReactComponent } from "@uirouter/react";
import { AutoSuggest } from "../../autoSuggest/autoSuggest";
import { Accordion, AccordionSection } from "../../accordionMenu/accordionMenu";
import { Option } from "../header";
import { Category, Subcategory } from "../../../contexts/GlobalState";
import "./headerLeftside.css";

type Props = {
    options: Option[];
    categories: Category[];
    groupedProducts: any;
    accountOptions: string[];
    settingOptions: string[];
    onSettingOptionSelect: (value: string) => void;
    className?: string;
    menuItems?: React.ReactElement[];
    children?: React.ReactNode;
  };
  
const HeaderLeftside = ({ 
    categories, 
    accountOptions,
    options, 
    groupedProducts, 
    settingOptions, 
    onSettingOptionSelect,
    children
}: Props) => {
    const [active, setActive] = useState(false)
    const [grouped, setGrouped] = useState(groupedProducts)
    const [value, setValue] = useState<string | any>("");
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const togglerRef = useRef(null);

    const naviagateAndClose = (url: string) => {
         navigate(url);
         setActive(false)
    }

    const handleClickOutside = (event: any) => {
        if (menuRef.current 
            && !menuRef.current.contains(event.target) 
            && !togglerRef.current.contains(event.target)) {
            setActive(false);
        }
    };

    useEffect(() => setGrouped(groupedProducts),[groupedProducts])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const headerItems = [
        <MenuItem 
            role="popup" 
            options={settingOptions} 
            onOptionSelect={onSettingOptionSelect}  
            // header="ustawienia"
            header={<IoSettings className="header_bar__icon"/>}
        />,
        <MenuItem 
            to="/ulubione" 
            // header="polubione" 
            header={<FaHeart className="header_bar__icon"/>}
        />,
        <MenuItem 
            to="/koszyk" 
            // header="koszyk (0)" 
            header={<FaShoppingCart className="header_bar__icon"/>}
        />,
        <MenuItem 
            to="/konto" 
            // options={accountOptions}
            // onOptionSelect={(option) => navigate(`/konto/${option}`)}
            // header="konto" 
            header={<FaUser className="header_bar__icon"/>}
        />
    ]
    
    const menuItems = [
        <AccordionSection header={"Strona główna"} onAdditionalClick={() => naviagateAndClose(`/`)} expandable={false}/>,
        <AccordionSection header={"Wszystkie produkty"} onAdditionalClick={() => naviagateAndClose(`/produkty`)} expandable={false}/>
    ]
    
    return (
        <header className={classNames("header")}>

            <div 
                className={classNames("menu__toggler", active ? "active" : null)}
                onClick={() => setActive(!active)}
                ref={togglerRef}
            >
                <span></span>
            </div>
            <div 
                className={classNames("menu", active ? "active" : null)}
                ref={menuRef}> 
            <Accordion>
                {menuItems.concat(categories.map((item: Category) => {
                    return (!!groupedProducts[item.name] 
                        ? <AccordionSection 
                            className="item_name" 
                            icon={<i className={item.icon}/>}
                            header={item.name} 
                            onAdditionalClick={() => naviagateAndClose(`/produkty/${item.name}`)} 
                            color="default">
                                { item.subcategories.map(({ name }: Subcategory) => 
                                <div 
                                    onClick={() => naviagateAndClose(`/produkty/${item.name}/${name}`)} 
                                    className={"item_link"}>
                                        {name}
                                </div>)
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

export default HeaderLeftside;