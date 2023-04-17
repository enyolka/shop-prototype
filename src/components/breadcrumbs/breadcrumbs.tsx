import * as React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "./breadcrumbs.css"

type BreadCrumb = {
    name: string;
    link: string;
}

type Props = {
    navs: BreadCrumb[];
    className?: string;
}

const Breadcrumbs = ({ navs, className }: Props) => {
    return (
        <div className={className}>
            {navs.map((item, id) => 
                <Link to={item.link} className="breadcrumb">
                    {item.name } 
                    {id != navs.length - 1 ? <IoIosArrowForward className="breadcrumb__icon"/> : null }
                </Link>)  
            } 
        </div>
    );
}

export default Breadcrumbs;