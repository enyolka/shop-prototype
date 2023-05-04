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
import "./headerSimple.css";
import Button from "../../button/button";

type Props = {
    options: Option[];
    categories: Category[];
    groupedProducts: any;
    settingOptions: string[];
    onSettingOptionSelect: (value: string) => void;
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
        //  setActive(false)
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
            className="header_bar__item"
            header="ustawienia"
            icon={<IoSettings className="header_bar__icon"/>}
        />,
        <MenuItem to="/ulubione" className="header_bar__item"  header="polubione"  icon={<FaHeart className="header_bar__icon"/>}/>,
        <MenuItem to="/koszyk" className="header_bar__item" header="koszyk (0)" icon={<FaShoppingCart className="header_bar__icon"/>}/>,
        <MenuItem to="/konto" className="header_bar__item" header="konto" icon={<FaUser className="header_bar__icon"/>}/>
    ]
    
    const menuItems = [
        <AccordionSection header={"Strona główna"} onAdditionalClick={() => naviagateAndClose(`/`)} expandable={false}/>,
        <AccordionSection header={"Wszystkie produkty"} onAdditionalClick={() => naviagateAndClose(`/produkty`)} expandable={false}/>,
        <AccordionSection header={"Promocje"} onAdditionalClick={() => naviagateAndClose(`/promocje`)} expandable={false}/>
    ]
    
    return (
        <header className={classNames("header--simple")}>
        {/* <Button onClick={() => document.documentElement.style.setProperty('--main-light-max', 'red')}>change color</Button> */}

            <div 
                className={classNames("menu__toggler--simple", active ? "active" : null)}
                onClick={() => setActive(!active)}
                ref={togglerRef}
            >
                <span></span>
            </div>
            <div className={classNames("menu--simple", active ? "active" : null)}
                ref={menuRef}> 
            <div className="menu__horizontalMenu">
                <MenuItem className="menu__horizontalMenu_item" onClick={()=> naviagateAndClose("/ulubione")} showActive={false} header={<FaHeart/>}/>
                <MenuItem className="menu__horizontalMenu_item" onClick={()=> naviagateAndClose("/koszyk")} showActive={false} header={<FaShoppingCart/>}/>
            </div>
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


            <span className={classNames("logo--simple")}>
                <i className={classNames("logo_item")}>LOGO</i>
            </span>

            <AutoSuggest
                className="search--simple"
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

            <nav className={classNames("header_bar--text")} role="navigation">
                {/* <div className={classNames("bar_menu")}> */}
                    {headerItems.map(item => item)}
                {/* </div> */}
            </nav>
            
            <hr className="header__hr"/>

            <nav className={classNames("header_horizontalMenu--simple")} role="navigation">
            {/* <MenuItem to="/" className="header_bar__item" header="strona główna"/>
            <MenuItem to="/produkty" className="header_bar__item" header="Produkty"/>
            <MenuItem to="/promocje" className="header_bar__item" header="promocje"/> */}
            {categories.map((item: Category) => {
                
                    return (!!groupedProducts[item.name] 
                        ? <MenuItem 
                            className="header_bar__item"
                            onClick={() => naviagateAndClose(`/produkty/${item.name}`)} 
                            icon={<i className={item.icon}/>}
                            header={item.name}
                            to={`/produkty/${item.name}`}
                            options={item.subcategories.map(({ name }: Subcategory) => name)}
                            onOptionSelect={(name)=> {
                                console.log(`/produkty/${item.name}/${name}`)
                                naviagateAndClose(`/produkty/${item.name}/${name}`)}
                                }>
                            {/* {item.name} */}
                        </MenuItem> 
                        : null)
                    })
             }
            </nav>
                {children}
        </header>
    )
}

export default HeaderSimple;