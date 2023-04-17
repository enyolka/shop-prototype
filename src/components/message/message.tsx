import * as classNames from "classnames";
import * as React from "react";
import "./message.css";

type messageType = "default" | "important" | "info" | "error";

type Props = {
    // info: string;
    type?: messageType;
    children?: React.ReactNode; 
    className?: string;
}

const Message = ({ type, children, className }: Props) => {

    return (<p className={classNames("message", type, className)}>{children}</p>)
}

export default Message;""