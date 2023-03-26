import * as React from "react";
import { Link } from "react-router-dom";


type Props = {
    className?: string;
    menuItems: React.ReactElement[];
    children?: React.ReactNode;
  };
  

const Header = ({ menuItems, children }: Props) => {
    return (
        <header className="">
            <nav className="" role="navigation">
            <span className="">
                <i className="">LOGO</i>
            </span>
                <ul>
                    {menuItems.map(item => item)}
                </ul>
                {children}
            </nav>
        </header>
    )
}

export default Header;