import * as React from "react";
import { useContext, useEffect, useState } from "react";
import "./buyPage.css"
import { StepIndicator } from "../../components/steps/stepIndicator";
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
}

const BuyPage =( props: any) => {
    const [activeStepIdx, setActiveStepIdx] = useState(0)

    return (
      <>
        <article className="buy">
        <StepIndicator
          activeStepIdx={activeStepIdx}
          ariaLabel={{
            completed: "Completed",
            current: "Current",
          }}
          steps={[
            { label: "Adres dostwy" },
            { label: "Forma dostawy" },
            { label: "Podsumowanie" }
          ]}
          size="md"
        />

        {activeStepIdx === 0 && <DeliveryPage onNext={setActiveStepIdx}/>}
        {activeStepIdx === 1 && <DeliveryOptionPage onNext={setActiveStepIdx}/>}
        {activeStepIdx === 2 && <SummaryPage onNext={setActiveStepIdx}/>}


        </article>
      </>
    );
  };  

export default BuyPage;