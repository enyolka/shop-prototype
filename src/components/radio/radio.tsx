import * as classNames from "classnames";
import * as React from "react";
import "./radio.css";

type PropsRadio = {
  label: string;
  id: string;
  groupName: string;
  children?: React.ReactNode;
  className?: string;
};

type Props = PropsRadio & React.InputHTMLAttributes<HTMLInputElement>;

const Radio = ({
  label,
  id,
  groupName,
  children,
  className,
  ...props
}: Props) => {
  return (
    <label htmlFor={id} className={classNames("radio_group", className)}>
      <input
        type="radio"
        id={id}
        value={id}
        name={groupName}
        className="radio_button"
        {...props}
      />
      <span className="radio_label">{label}</span>
      {children}
    </label>
  );
};

export default Radio;
