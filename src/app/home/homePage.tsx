import * as React from "react";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import Newsletter from "./newsletter";
import "./homePage.css"
import cash from "/public/images/cash.png"
import guarantee from "/public/images/delivery.png"
import delivery from "/public/images/delivery1.png"
import { ProductContext } from "../../contexts/GlobalState";
import { Link } from "react-router-dom";
import MenuItem from "../../components/menuItem/menuItem";

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(true)
    const context = React.useContext(ProductContext)

    return (
        <>
            <h1>Minerva.</h1>
            <div className="home__cards">
                <div className="card home__card">
                    <img className="home__img" alt="" src={cash}/>
                    <h4>Najniższe ceny</h4>
                </div>
                <div className="card home__card">
                    <img className="home__img" alt="" src={guarantee}/>
                    <h4>Szeroki wybór produktów</h4>
                </div>
                <div className="card home__card">
                    <img className="home__img" alt="" src={delivery}/>
                    <h4>Darmowe dostawy</h4>
                </div>
            </div>

            <div className={"grid card home__propositions"} >
                {context.products.slice(0, 3).map((product, idx) => 
                    <section key={idx} className={"grid_item"}>
                        <img alt="" src={product.image} className={"item_img"}/>
                        <div className={"item_info"}>
                            <Link to={`/${product.id}`} className={"item_link"}>{product.name}</Link>
                            <p className={"item_price"}>{product.price}$</p>
                        </div>
                    </section>
                )}
                <MenuItem to="/products" header="Zobacz więcej..."/>
            </div>


            {Math.floor(Math.random()*4) > 2  ? (
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} className="modal_newsletter">
                    <Newsletter/>
                </Modal>
            ) : null}

        </>
    )
}

export default HomePage;