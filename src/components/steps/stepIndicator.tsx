import * as React from "react";
import  * as classNames from "classnames";
import "./stepIndicator.css"

export type Props = {
  size?: "md" | "lg";
  steps: Step[];
  activeStepIdx: number;
  ariaLabel: {
    completed: string;
    current: string;
  };
};

export type Step = {
  label: string;
  subLabel?: string;
  disabled?: boolean;
};

function StepIndicator({
  size = "lg",
  activeStepIdx,
  steps,
  ariaLabel,
}: Props): React.ReactElement {
  const typeData = {
    "data-type": size === "lg" ? "large" : "standard-dropdown",
  };

  return (
    <div className="spark-step-indicator" {...typeData}>
      <div className="spark-step-indicator__body">
        <div className="spark-step-indicator__list">
          {steps.map(({ label, subLabel, disabled }, idx) => (
            <Step
              key={idx}
              ariaLabel={ariaLabel}
              idx={idx}
              label={label}
              subLabel={subLabel}
              completed={idx < activeStepIdx}
              current={idx === activeStepIdx}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


type StepProps = {
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
}: StepProps): React.ReactElement {
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


export { StepIndicator };
