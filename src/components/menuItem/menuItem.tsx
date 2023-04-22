import * as classnames from "classnames";
import * as React from "react";
import { useState } from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import "./menuItem.css"

type MenuItemRole = "redirect" | "popup";

type Props = {
    role?: MenuItemRole;
    to?: string;
    children?: React.ReactNode;
    options?: string[];
    onOptionSelect?: (value: string) => void;
}

const MenuItem = ({ 
    to, 
    role = "redirect", 
    options,
    onOptionSelect,
    children, 
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
            className={classnames("menuLink")} 
            onClick={() => navigate(to)} 
            onMouseEnter={() => setOpen(true)} 
            onMouseLeave={() => setOpen(false)}
            >
                {children}
                <ul className={classnames("menuLink__listbox", {open: open})}>
                    {options.map(option => 
                        <li 
                            onClick={() => onOptionSelect(option)}
                            className={classnames("menuLink__listItem")}
                        >
                           {option}
                        </li>
                    )}
                </ul>
            </div>
        : <div onClick={() => navigate(to)} className={classnames("menuLink", isActive && "active" )} {...props}>
            {children}
        </div> 
        }
        </>
    );
}

export default MenuItem;