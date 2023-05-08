import * as React from "react";
import * as classNames from "classnames";
import "./spinner.css"

type Props = {
  size: "small" | "medium" | "big" 
}

const Spinner = ({size}: Props): React.ReactElement => {
  return (
    <span className={classNames("loader", size)}></span>
  )
}

export default Spinner;
