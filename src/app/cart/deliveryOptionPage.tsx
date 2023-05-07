import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";
import Radio from "../../components/radio/radio";
import * as classNames from "classnames";

type Props = {
    onNext: (idx: number) => void;
}
  
type Option = "personal" | "courierDPD" | "courierGLS" | "parcelLocker";

const delivery_optionPage =({ onNext } : Props) => {
    const context = useContext(ProductContext);
    const [option, setOption] = useState("personal")
    const [displayed, setDisplayed] = useState(false)

    return ( 
      <div className="buy">

            <form className="delivery_options__form card">
                <div className={classNames("delivery_option", {"delivery_option--active": option === "personal"})} onClick={() => setOption("personal")}>
                    <Radio id="personal" label="Odbiór osobisty" groupName="delivery" checked={"personal" === option}/>
                    <span className="delivery_option_info">1-5 dni roboczych</span>
                    <span className="delivery_option_price">Za darmo</span>
                </div>
                
                <div className={classNames("delivery_option", {"delivery_option--active": option === "courierDPD"})} onClick={() => setOption("courierDPD")}>
                    <Radio className="delivery_option_radio" id="courierDPD" label="Kurier DPD" groupName="delivery" checked={"courierDPD" === option}/>
                    <span className="delivery_option_info">2-7 dni roboczych</span>
                    <span className="delivery_option_price">Za darmo</span>
                </div>
                
                <div className={classNames("delivery_option", {"delivery_option--active": option === "courierGLS"})} onClick={() => setOption("courierGLS")}>
                    <Radio id="courierGLS" label="Kurier GLS" groupName="delivery" checked={"courierGLS" === option}/>
                    <span className="delivery_option_info">2-7 dni roboczych</span>
                    <span className="delivery_option_price">Za darmo</span>
                </div>
                
                <div 
                    className="delivery_option disabled" 
                    onMouseEnter={() => setDisplayed(true)}
                    onMouseLeave={() => setDisplayed(false)}
                >
                    <Radio id="parcelLocker" label="Paczkomat" groupName="delivery" checked={"parcelLocker" === option} disabled={true}/>
                    <span className="delivery_option_info">1-3 dni roboczych</span>
                    <span className="delivery_option_price">Za darmo</span>
                    {displayed && <div className="message--float" >Obecnie opcja ta jest chwilowo niedostępna</div>}
                </div>
            </form>

         <div className={"submit_button submit_button--delivery"}>
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

export default delivery_optionPage;