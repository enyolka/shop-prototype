import * as classnames from "classnames";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import "./menuItem.css"

type MenuItemRole = "redirect" | "popup";

type MenuItemOption = {
    name: string;
    suboptions?: string[];
}

type Props = {
    header: string | React.ReactNode;
    icon?: React.ReactNode;
    role?: MenuItemRole;
    to?: string;
    showActive?: boolean;
    options?: string[];//MenuItemOption[];
    onOptionSelect?: (value: string | boolean) => void;
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
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const ref = useRef(null);
    const resolvedPath = useResolvedPath(to)
    const navigate = useNavigate();
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })


    const detectMousePosition =() => {
    
    const handleMouseMove = React.useCallback((event: any) => {
        if ( ref?.current?.clientWidth && event.clientX + ref.current.clientWidth > screen.width )
            setX(event.clientX + ref.current.clientWidth - screen.width + 20)
        if (ref?.current?.clientHeight && event.clientY + ref.current.clientHeight > screen.height) 
            setY(event.clientY + ref.current.clientHeight - screen.height + 20)
        event.stopPropagation();
        event.preventDefault();
    }, []);  

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
      window.removeEventListener('mousemove', handleMouseMove);}
    }

    return (
       <>
        { options && options.length > 0 
        ? <div 
            className={classnames("menuLink", className)}             
            onMouseEnter={() => {
                () => detectMousePosition();
                // setOpen(true)
            }} 
            onMouseOver={() => setOpen(true)}
            onMouseLeave={() => {
                setOpen(false)
            }}
            >
                <div 
                    className="menuLink_header"
                    onClick={() => {
                        navigate(to);
                        onClick();
                }}>
                    {icon}
                    <span >{header}</span>
                </div>

                <ul 
                    ref={ref} 
                    className={classnames("menuLink__listbox", {open: open})}
                    style={{top: ref?.current?.clientHeight + ref?.current?.clientX + y, right: ref?.current?.clientWidth + ref?.current?.clientY + x}}
                >
                    {options.map(option => 
                        <li 
                            onClick={() => {
                                onOptionSelect(option)}}
                            className={classnames("menuLink__listItem")}
                        >
                           {option}
                           {/* {option.suboptions.length > 0 && (
                            <ul 
                                ref={ref} 
                                className={classnames("menuLink__listbox", {open: open})}
                                style={{top: ref?.current?.clientHeight + ref?.current?.clientX + y, right: ref?.current?.clientWidth + ref?.current?.clientY + x}}
                            >
                                {option.suboptions.map(suboption => 
                                    <li 
                                        onClick={() => {
                                            console.log(suboption)
                                            onOptionSelect(suboption)}}
                                        className={classnames("menuLink__listItem")}
                                    >
                                    {suboption}</li>)}</ul>
                           )} */}
                        </li>
                    )}
                </ul>
            </div>
        : <div className={classnames("menuLink", showActive && isActive && "active", className )} {...props}>
                <div 
                    className="menuLink_header"
                    onClick={() => {
                        navigate(to);
                        onClick();
                }}>
                    {icon}
                    <span >{header}</span>
                </div>
        </div> 
        }
        </>
    );
}

export default MenuItem;