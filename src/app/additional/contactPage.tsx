import * as React from "react";
import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/GlobalState";
import { BsTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./contactPage.css"
import bg from "/public/img/contact2.png"

const ContactPage =( props: any) => {

    const context = useContext(ProductContext);
    const navigate = useNavigate();

    return (
      <>
        <article className="contact">
          <div className="contact__header" style={{backgroundImage: `url(${bg})`}}>
            {/* <h2>Skontaktuj się z nami!</h2> */}
          </div>
          <div className="contact_cards">
            <div className="card">
              <div className="card__header">
                <BsTelephoneFill/>
                <h4>Kontakt</h4>
              </div>
                <p>Potrzebujesz informacji dotyczących zamówienia, produktu czy samego sklepu? Zadzwoń lub napisz do nas, chętnie udzielimy ci wszelkich niezbędnych informacji.</p>
                <div className="contact__info">
                  <span>+48 000 000 000</span>
                  <span>sklep-minerva@testowy.com</span>
                </div>
            </div>
            <div className="card">
              <div className="card__header">
                <FaMapMarkerAlt/>
                <h4>Adres</h4>
              </div>    
                <p>Sklep stacjonarny znajdziesz pod poniższym adresem. Odwiedź nas koniecznie!</p>
                <div className="contact__info">
                  <span>ul. Kazimierza Testowego 25</span>
                  <span>38-391 Kraków</span>
                </div>          
              </div>
          </div>
      </article>
      <article className="help">

      </article>
      </>
    );
  };

export default ContactPage;