import  * as classNames from "classnames";
import * as React from "react";

type Props = {
  idx: number;
  label: string;
  subLabel?: string;
  completed?: boolean;
  current?: boolean;
  disabled?: boolean;
  ariaLabel: {
    completed: string;
    current: string;
  };
};

function Step({
  ariaLabel,
  idx,
  label,
  completed,
  subLabel,
  current,
  disabled,
}: Props): React.ReactElement {
  const stepId = `o-${idx}`;
  return (
    <a
      aria-labelledby={stepId}
      tabIndex={disabled ? -1 : undefined}
      href="#"
      onClick={(e) => e.preventDefault()}
      className={classNames("spark-step-indicator__item", {
        "spark-step-indicator__item--completed": completed,
        "spark-step-indicator__item--current": current,
        "spark-step-indicator__item--disabled": disabled,
      })}
    >
      <span
        className="spark-step-indicator__icon"
        aria-label={
          completed
            ? ariaLabel.completed
            : current
            ? ariaLabel.current
            : undefined
        }
        aria-hidden={!completed || !current}
      >
        {idx + 1}
      </span>
      <span id={stepId} className="spark-step-indicator__text">
        {label}
        {subLabel && (
          <small className="spark-step-indicator__subtext">{subLabel}</small>
        )}
      </span>
    </a>
  );
}

export { Step };
