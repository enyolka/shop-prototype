import * as React from "react";
import Button from "../../../components/button/button";
import "./loyalty.css"
import loyalty from "/public/images/loyalty.png"

const Loyalty = ( props: any) => {
    return (
      <article className="loyalty">
        <div className="loyalty_header" style={{backgroundImage: `url(${loyalty})`}}>
            <h2>Programy zniżkowe i kupony</h2>
        </div>
        <div className="card loyalty_programs">
            <h3>Aktualne programy</h3>
            <span>Obecnie nie ma aktywowanych programów zniżkowych</span>
        </div>
        <div className="card loyalty_vouchers">
            <h3>Kupony</h3>
            <div className="vouchers_list">
                <div className="voucher card">
                    <h4>Zniżka 10$</h4>
                    <span>Kupon ważny do 10.01.2023</span>
                    <span>Minimalna kwota zamówienia 50$</span>
                    <Button disabled>Aktywuj</Button>
                </div>
                <div className="voucher card">
                    <h4>Zniżka 20%</h4>
                    <span>Kupon ważny do 05.12.2022</span>
                    <span>Minimalna kwota zamówienia 150$</span>
                    <Button disabled>Aktywuj</Button>
                </div>
                <div className="voucher card">
                    <h4>Zniżka 20$</h4>
                    <span>Kupon ważny do 10.10.2022</span>
                    <span>Minimalna kwota zamówienia 100$</span>
                    <Button disabled>Aktywuj</Button>
                </div>
            </div>
        </div>

     </article>
    );
};


export default Loyalty;

