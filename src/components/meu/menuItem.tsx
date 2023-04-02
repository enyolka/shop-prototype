import * as classnames from "classnames";
import * as React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./menuItem.module.css"


export const MenuItem = ({ to, children, ...props }: any) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <Link to={to} className={classnames(styles.menu_link, isActive ? styles.active : "")} {...props}>
            {children}
        </Link>
    )
}