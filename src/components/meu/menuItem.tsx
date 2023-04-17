import * as classnames from "classnames";
import * as React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./menuItem.css"


export const MenuItem = ({ to, children, ...props }: any) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <Link to={to} className={classnames("menu_link", isActive && "active" )} {...props}>
            {children}
        </Link>
    )
}