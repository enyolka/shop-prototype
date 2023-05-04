import * as classNames from "classnames";
import * as React from "react";
import { useState } from "react";
import { Link as RDLink } from "react-router-dom";
import "./link.css"


type Props = {
    to: string;
    children?: React.ReactNode;
    className?: string;
}

const Link = ({ 
    to,  
    children,
    className
}: Props) => {

    return (
        <RDLink to={to} className={classNames("link", className)}>
            {children}
        </RDLink>
    );
}

export default Link;