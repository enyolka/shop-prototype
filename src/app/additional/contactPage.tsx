import * as React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./contactPage.css";
import bg from "/public/images/contact2.png";
import {
  Accordion,
  AccordionSection,
} from "../../components/accordionMenu/accordionMenu";

const ContactPage = (props: any) => {
  return (
    <>
      <article className="contact">
        <div
          className="contact__header"
          style={{ backgroundImage: `url(${bg})` }}
        >
          {/* <h2>Skontaktuj się z nami!</h2> */}
        </div>
        <div className="contact_cards">
          <div className="card">
            <div className="card__header">
              <BsTelephoneFill />
              <h4>Kontakt</h4>
            </div>
            <p>
              Potrzebujesz informacji dotyczących zamówienia, produktu czy
              samego sklepu? Zadzwoń lub napisz do nas, chętnie udzielimy ci
              wszelkich niezbędnych informacji.
            </p>
            <div className="contact__info">
              <span>+48 000 000 000</span>
              <span>sklep-minerva@testowy.com</span>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <FaMapMarkerAlt />
              <h4>Adres</h4>
            </div>
            <p>
              Sklep stacjonarny znajdziesz pod poniższym adresem. Odwiedź nas
              koniecznie!
            </p>
            <div className="contact__info">
              <span>ul. Kazimierza Testowego 25</span>
              <span>38-391 Kraków</span>
            </div>
          </div>
        </div>
      </article>
      <article className="help">
        <h2>Pomoc</h2>
        <p>
          Szukasz pomocy? Sprawdź najczęsciej zadawane pytania lub skontaktuj
          się z nami!
        </p>
        <Accordion>
          <AccordionSection header={"Jakie są warunki dostawy?"}>
            <p>Wszystkie dostawy są za darmo!</p>
          </AccordionSection>
          <AccordionSection header="Chcę zwrócić produkt. Czy to możliwe?">
            <p>
              Oczywiście! Skontaktuj się z nami, a my omówimy Twoją sytuację i
              wskażemy najlepszą formę zwrotu.
            </p>
          </AccordionSection>
          <AccordionSection header="Programy lojalnościowe i kupony - komu przysługują?">
            <p>
              Jedynie zalogowani użytkownicy mają dostęp do programów
              lojalnościowych i kuponów. Pojawiają się one cyklicznie,
              użytkownicy otrzymują powiadomienie na ich temat
            </p>
          </AccordionSection>
        </Accordion>
      </article>
    </>
  );
};

export default ContactPage;
