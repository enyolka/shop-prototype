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
import { Category, ProductContext, Subcategory } from "../../../contexts/GlobalState";
import "./headerExtensive.css";
import logo from "/public/images/logo2-bg.png"

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
  
const HeaderExtensive = ({ 
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
    const context = React.useContext(ProductContext)

    let sum = 0
    context.cart.forEach((a) => sum += a.quantity)

    const navigateAndClose = (url: string) => {
         navigate(url);
        //  setActive(false)
    }
        
    const toggleLogged = (x: string) => {
        sessionStorage.removeItem("account")
        sessionStorage.setItem('logged', JSON.stringify(false))
        window.location.reload()
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
            to="/ustawienia"
            role="popup" 
            options={settingOptions} 
            onOptionSelect={onSettingOptionSelect}
            className="header_bar__item"
            header="ustawienia"/>,
        <MenuItem 
            to="/ulubione" 
            className="header_bar__item"  
            header="polubione"
        />,
        <MenuItem 
            to="/koszyk" 
            className={classNames("header_bar__item")}
            header={`koszyk (${sum})`}
        />,
        <MenuItem 
            to="/konto" 
            options={sessionStorage.getItem('account') != null? ["Wyloguj"] : null}
            onOptionSelect={toggleLogged}
            onClick={() => navigate(`/konto`)} 
            className="header_bar__item" 
            header="konto"
        />
    ]
    
    const menuItems = [
        <AccordionSection header={"Strona główna"} onAdditionalClick={() => navigateAndClose(`/`)} expandable={false}/>,
        <AccordionSection header={"Wszystkie produkty"} onAdditionalClick={() => navigateAndClose(`/produkty`)} expandable={false}/>,
        <AccordionSection header={"Promocje"} onAdditionalClick={() => navigateAndClose(`/promocje`)} expandable={false}/>
    ]
    
    return (
        <header className={classNames("header--extensive")}>

            <div 
                className={classNames("menu__toggler--extensive", active ? "active" : null)}
                onClick={() => setActive(!active)}
                ref={togglerRef}
            >
                <span></span>
            </div>
            <div className={classNames("menu--extensive", active ? "active" : null)}
                ref={menuRef}> 
            <div className="menu__horizontalMenu">
                <MenuItem className="menu__horizontalMenu_item" onClick={()=> navigateAndClose("/ulubione")} showActive={false} header={<FaHeart/>}/>
                <MenuItem className="menu__horizontalMenu_item" onClick={()=> navigateAndClose("/koszyk")} showActive={false} header={<FaShoppingCart/>}/>
            </div>
            <Accordion>
                    
                {menuItems.concat(categories.map((item: Category) => {
                    return (!!groupedProducts[item.name] 
                        ? <AccordionSection className="item_name" header={item.name} onAdditionalClick={() => navigateAndClose(`/produkty/${item.name}`)} color="default">{
                            item.subcategories.map(({ name }: Subcategory) => 
                                <div onClick={()=> navigateAndClose(`/produkty/${item.name}/${name}`)} className={"item_link"}>{name}</div>)
                        }
                        </AccordionSection> 
                        : null)
                    }))
             }
            </Accordion>
            </div>


            <span className={classNames("logo--extensive")} onClick={() => navigate("/")}>
                <img alt="logo" src={logo} className={classNames("logo_item")}/>
            </span>

            <AutoSuggest
                className="search--extensive"
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
            <nav className={classNames("header_horizontalMenu--extensive", "header_important--extensive")}>
                
            <MenuItem to="/" className="header_bar__item" header="strona główna"/>
            <MenuItem to="/produkty" className="header_bar__item" header="Produkty"/>
            <MenuItem to="/promocje" className="header_bar__item" header="promocje"/>
            </nav>

            <nav className={classNames("header_bar--text")} role="navigation">
                {/* <div className={classNames("bar_menu")}> */}
                    {headerItems.map(item => item)}
                {/* </div> */}
            </nav>
            
            <hr className="header__hr"/>

            <nav className={classNames("header_horizontalMenu--extensive")} role="navigation">
            {categories.map((item: Category) => {
                
                    return (!!groupedProducts[item.name] 
                        ? <MenuItem 
                            className="header_bar__item"
                            onClick={() => navigateAndClose(`/produkty/${item.name}`)} 
                            header={item.name}
                            to={`/produkty/${item.name}`}
                            options={item.subcategories.map(({ name }: Subcategory) => name)}
                            onOptionSelect={(name)=> {
                                console.log(`/produkty/${item.name}/${name}`)
                                navigateAndClose(`/produkty/${item.name}/${name}`)}
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

export default HeaderExtensive;