import * as React from "react";
import "./footer.css"
import Newsletter from "../../app/home/newsletter";
import Link from "../link/link";

const Footer = () => {
    return (
        <footer className="footer">
            <Newsletter size="small"/>
            <div className="footer__menu">
                <Link to="/">O nas</Link>
                <Link to="/">Regulamin</Link>
                <Link to="/">Polityka prywatności</Link>
            </div>
            <div>
                <h4>Kontakt</h4>
                <div className="contact__info">
                  <span>+48 000 000 000</span>
                  <span>sklep-minerva@testowy.com</span>
                </div>
                <div className="contact__info">
                  <span>ul. Kazimierza Testowego 25</span>
                  <span>38-391 Kraków</span>
                </div>   
            </div>
        </footer>
    )
}

export default Footer;