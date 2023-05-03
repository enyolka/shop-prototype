import * as React from "react";
import { StepIndicator } from "./stepIndicator";

export default (): React.ReactElement => {
  const activeStepIdx = "0"
  const size = "md"
  const [labelOne, subLabelOne, disabledOne] = useStepControls(1);
  const [labelTwo, subLabelTwo, disabledTwo] = useStepControls(2);
  const [labelThree, subLabelThree, disabledThree] = useStepControls(3);
  const [labelFour, subLabelFour, disabledFour] = useStepControls(4);

  return (
    <StepIndicator
      activeStepIdx={parseInt(activeStepIdx, 10)}
      ariaLabel={{
        completed: "Completed",
        current: "Current",
      }}
      steps={[
        { label: labelOne, subLabel: subLabelOne, disabled: disabledOne },
        { label: labelTwo, subLabel: subLabelTwo, disabled: disabledTwo },
        { label: labelThree, subLabel: subLabelThree, disabled: disabledThree },
        { label: labelFour, subLabel: subLabelFour, disabled: disabledFour },
      ]}
      size={size}
    />
  );
};

const useStepControls = (
  stepNumber: number,
): [label: string, subLabel: string, disabled: boolean] => {
  const label =  `Step ${stepNumber}`;
  const subLabel =  "Sub-label";
  const disabled = false;
  return [label, subLabel, disabled];
};
