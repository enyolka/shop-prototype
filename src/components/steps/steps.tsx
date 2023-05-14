import * as React from "react";
import * as classNames from "classnames";
import "./steps.css";

export type Step = {
  label: string;
  subLabel?: string;
  link?: string;
  disabled?: boolean;
};

export type Props = {
  steps: Step[];
  activeStepIdx: number;
  ariaLabelCompleted: string;
  ariaLabelCurrent: string;
};

const Steps = ({
  activeStepIdx,
  steps,
  ariaLabelCompleted,
  ariaLabelCurrent,
}: Props) => {
  return (
    <div className="steps__list">
      {steps.map(({ label, subLabel, disabled }, idx) => (
        <Step
          key={idx}
          idx={idx}
          label={label}
          subLabel={subLabel}
          completed={idx < activeStepIdx}
          current={idx === activeStepIdx}
          ariaLabelCompleted={ariaLabelCompleted}
          ariaLabelCurrent={ariaLabelCurrent}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

type StepProps = {
  idx: number;
  label: string;
  subLabel?: string;
  link?: string;
  completed?: boolean;
  current?: boolean;
  disabled?: boolean;
  ariaLabelCompleted: string;
  ariaLabelCurrent: string;
};

export const Step = ({
  idx,
  label,
  subLabel,
  link,
  completed,
  current,
  disabled,
  ariaLabelCompleted,
  ariaLabelCurrent,
}: StepProps) => {
  return (
    <a
      href={link ?? "#"}
      onClick={(e) => e.preventDefault()}
      className={classNames("steps__item", { completed, current, disabled })}
      tabIndex={disabled ? -1 : undefined}
    >
      <span
        className="steps__icon"
        aria-label={completed ? ariaLabelCompleted : ariaLabelCurrent}
      >
        {idx + 1}
      </span>
      <span className="steps__text">
        {label}
        {subLabel && <small className="steps__subtext">{subLabel}</small>}
      </span>
    </a>
  );
};

export { Steps };
