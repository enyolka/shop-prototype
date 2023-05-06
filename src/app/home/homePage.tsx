import * as React from "react";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import Newsletter from "./newsletter";
import "./homePage.css"

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <>
            <h1>Minerva.</h1>
            <div>
                Najniższe ceny
            </div>
            <div>
                Produkty na pełnej gwarancji.
            </div>
            <div>
                Darmowe dostawy
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