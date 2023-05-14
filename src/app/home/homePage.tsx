import * as React from "react";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import Newsletter from "../additional/newsletter";
import "./homePage.css";
import cash from "/public/images/cash.png";
import guarantee from "/public/images/delivery.png";
import delivery from "/public/images/delivery1.png";
import { ProductContext } from "../../contexts/GlobalState";
import Link from "../../components/link/link";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const context = React.useContext(ProductContext);

  return (
    <div className="home">
      <h1>Minerva.</h1>
      <article className="home__info">
        <h4>O nas</h4>
        <p>
          Firma powstała z pasji do zakupów online i z potrzeby zaspokojenia
          rosnącej w Polsce potrzeby na tego typu usługi. Założyciele firmy
          mieli na celu stworzenie miejsca, w którym klienci mogą znaleźć
          wszystko, czego potrzebują, bez wychodzenia z domu. W ciągu kilku lat
          firma stała się jednym z największych sklepów internetowych w Polsce,
          oferującym tysiące produktów w różnych kategoriach.
        </p>
        <p>
          Dziś firma "Minerva" to zespół doświadczonych specjalistów z różnych
          dziedzin, którzy stale pracują nad rozwojem oferty, aby spełnić
          oczekiwania klientów. Dzięki nieustannej pracy nad jakością usług i
          ofertą, firma zyskała zaufanie wielu klientów i zdobyła wiele nagród w
          branży e-commerce.
        </p>
      </article>
      <div className="home__cards">
        <div className="card home__card">
          <img className="home__img" alt="" src={cash} />
          <h4>Najniższe ceny</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque iste
            debitis eaque aut labore? Soluta quo tenetur facere odit doloremque.
          </p>
        </div>
        <div className="card home__card">
          <img className="home__img" alt="" src={guarantee} />
          <h4>Szeroki wybór produktów</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque iste
            debitis eaque aut labore? Soluta quo tenetur facere odit doloremque.
          </p>
        </div>
        <div className="card home__card">
          <img className="home__img" alt="" src={delivery} />
          <h4>Darmowe dostawy</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque iste
            debitis eaque aut labore? Soluta quo tenetur facere odit doloremque.
          </p>
        </div>
      </div>

      <div className={"card home_propositions"}>
        <article className={"home_propositions__grid"}>
          {context.products.slice(0, 3).map((product, idx) => (
            <section key={idx} className={"grid_item"}>
              <img alt="" src={product.image} className={"item_img"} />
              <div className={"item_info"}>
                <Link to={`/${product.id}`} className={"item_link"}>
                  {product.name}
                </Link>
                <p className={"item_price"}>{product.price}$</p>
              </div>
            </section>
          ))}
        </article>
        <Link to="/promocje" className="home_propositions__link">
          Zobacz więcej...
        </Link>
      </div>

      {Math.floor(Math.random() * 4) > 2 ? (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          className="modal_newsletter"
        >
          <Newsletter />
        </Modal>
      ) : null}
    </div>
  );
};

export default HomePage;
