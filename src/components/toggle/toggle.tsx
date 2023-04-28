import * as React from "react";
import * as classNames from "classnames";
import "./toggle.css"

export type Props = {
  className?: string;
  options: Array<Option>;
  size?: Size;
  disabled?: boolean;
  value: string;
  icon?: boolean;
  onChange?: (newValue: string) => void;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
};

export type Option = {
  className?: string;
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type Size = "default" | "condensed";
 
const Toggle = ({
  onChange,
  options,
  value,
  className,
  disabled,
  size = "default",
  icon,
  onBlur,
  onFocus,
}: Props): React.ReactElement => {
  return (
    <div className={classNames(className, "toggle-group")}>
      {options.map(({ label, className, ...it }) => (
        <label
          key={it.value}
          className={classNames(
            "toggle",
            {
              "toggle--xs": size === "condensed",
            },
            className,
          )}
        >
          <input
            className="toggle__input"
            type="radio"
            checked={value === it.value}
            aria-label={label}
            onChange={() => onChange?.(it.value)}
            disabled={disabled}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <span className="label">{icon ? it.icon : label}</span>
        </label>
      ))}
    </div>
  );
}

export default Toggle;
