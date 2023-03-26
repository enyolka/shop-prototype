import * as React from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"


export const MenuItem = ({ to, children, ...props }: any) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}