import * as React from "react";
import { useState } from "react";
import "./buyPage.css";
import { Steps } from "../../components/steps/steps";
import DeliveryPage from "./deliveryFormPage";
import DeliveryOptionPage from "./deliveryOptionPage";
import SummaryPage from "./summaryPage";

export type ClientFormModel = {
  name: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  zipCode: string;
};

const BuyPage = (props: any) => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  return (
    <>
      <article className="buy">
        <Steps
          activeStepIdx={activeStepIdx}
          ariaLabelCompleted="Completed"
          ariaLabelCurrent="Current"
          steps={[
            { label: "Adres dostwy" },
            { label: "Forma dostawy" },
            { label: "Podsumowanie" },
          ]}
        />

        {activeStepIdx === 0 && <DeliveryPage onNext={setActiveStepIdx} />}
        {activeStepIdx === 1 && (
          <DeliveryOptionPage onNext={setActiveStepIdx} />
        )}
        {activeStepIdx === 2 && <SummaryPage onNext={setActiveStepIdx} />}
      </article>
    </>
  );
};

export default BuyPage;
