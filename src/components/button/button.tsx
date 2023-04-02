import * as React from "react";
import * as classNames from "classnames";
import styles from "./button.module.css"

type PropsButton = {
    className?: string;
    children?: React.ReactNode;
};  
  
type Props = PropsButton &  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({className, children, ...props}: Props) => {

    return (
        <button 
            className={classNames(styles.button, className)}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;