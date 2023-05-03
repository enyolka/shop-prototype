import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";
import Radio from "../../components/radio/radio";

type Props = {
    onNext: (idx: number) => void;
}
  
type Option = "personal" | "courierDPD" | "courierGLS" | "parcelLocker";

const DeliveryOptionPage =({ onNext } : Props) => {
    const context = useContext(ProductContext);
    const [option, setOption] = useState("personal")
    const [displayed, setDisplayed] = useState(false)

    return ( 
      <div className="buy">
        <h2>Dostawa</h2>

            <form className="deliveryOptionsForm card">
                <div className="deliveryOption" onClick={() => setOption("personal")}>
                    <Radio id="personal" label="Odbiór osobisty" groupName="delivery" checked={"personal" === option}/>
                    <span className="deliveryOption_info">1-5 dni roboczych</span>
                    <span className="deliveryOption_info--important">Za darmo</span>
                </div>
                
                <div className="deliveryOption" onClick={() => setOption("courierDPD")}>
                    <Radio id="courierDPD" label="Kurier DPD" groupName="delivery" checked={"courierDPD" === option}/>
                    <span className="deliveryOption_info">2-7 dni roboczych</span>
                    <span className="deliveryOption_info--important">Za darmo</span>
                </div>
                
                <div className="deliveryOption" onClick={() => setOption("courierGLS")}>
                    <Radio id="courierGLS" label="Kurier GLS" groupName="delivery" checked={"courierGLS" === option}/>
                    <span className="deliveryOption_info">2-7 dni roboczych</span>
                    <span className="deliveryOption_info--important">Za darmo</span>
                </div>
                
                <div 
                    className="deliveryOption disabled" 
                    onMouseEnter={() => setDisplayed(true)}
                    onMouseLeave={() => setDisplayed(false)}
                >
                    <Radio id="parcelLocker" label="Paczkomat" groupName="delivery" checked={"parcelLocker" === option} disabled={true}/>
                    <span className="deliveryOption_info">1-3 dni roboczych</span>
                    <span className="deliveryOption_info--important">Za darmo</span>
                    {displayed && <div className="message--float" >Obecnie opcja ta jest chwilowo niedostępna</div>}
                </div>
            </form>

         <div className={"submit_button"}>
            <Button role="default" onClick={() => onNext(0)}>
                Poprzedni
            </Button>
            <Button role="secondary" onClick={() => onNext(2)}>
            Dalej
            </Button>
        </div>

      </div>
    );
  };

export default DeliveryOptionPage;