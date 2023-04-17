import * as React from "react";
import * as classNames from "classnames";
import "./button.css"

type Role = "default" | "secondary" | "important" | "error" 

type PropsButton = {
    className?: string;
    role?: Role;
    children?: React.ReactNode;
};  
  
type Props = PropsButton &  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ role = "default", className, children, ...props}: Props) => {

    return (
        <button 
            className={classNames("button", role, className)}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;