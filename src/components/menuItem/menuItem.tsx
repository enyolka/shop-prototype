import * as classnames from "classnames";
import * as React from "react";
import { useState } from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import "./menuItem.css"

type MenuItemRole = "redirect" | "popup";

type Props = {
    header: string | React.ReactNode;
    icon?: React.ReactNode;
    role?: MenuItemRole;
    to?: string;
    showActive?: boolean;
    options?: string[];
    onOptionSelect?: (value: string) => void;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
}

const MenuItem = ({
    header,
    icon,
    to, 
    role = "redirect", 
    showActive = true,
    options,
    onOptionSelect,
    onClick, 
    children, 
    className,
    ...props 
}: Props) => {
    const [open, setOpen] = useState(false);
    const resolvedPath = useResolvedPath(to)
    const navigate = useNavigate();
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })


    return (
       <>
        { options && options.length > 1 
        ? <div 
            className={classnames("menuLink", className)} 
            
            onMouseEnter={() => setOpen(true)} 
            onMouseLeave={() => setOpen(false)}
            >
                <div 
                onClick={() => {
                    navigate(to);
                    onClick();
                }}>
                {icon}
                <span >{header}</span>
                </div>

                {children}

                <ul className={classnames("menuLink__listbox", {open: open})}>
                    {options.map(option => 
                        <li 
                            onClick={() => {
                                console.log(option)
                                onOptionSelect(option)}}
                            className={classnames("menuLink__listItem")}
                        >
                           {option}
                        </li>
                    )}
                </ul>
            </div>
        : <div className={classnames("menuLink", showActive && isActive && "active", className )} {...props}>
                <div 
                onClick={() => {
                    navigate(to);
                    onClick();
                }}>
                {icon}
                <span >{header}</span>
                </div>
            {children}
        </div> 
        }
        </>
    );
}

export default MenuItem;