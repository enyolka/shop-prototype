import * as React from "react";
import Button from "../../components/button/button";
import "./newsletter.css";

const Newsletter = () => {
    return ( 
        <div className="newsletter">
            <h3>Newsletter</h3>
            <div className="newsletter_info">
                <p>Nie przegap żadnej promocji, zdobywaj i korzystaj z kuponów rabatowych!</p>
                <p>Zapisz się już teraz.</p>
            </div>
            <form className="newsletter_form">
                <label htmlFor="newsletter">Twój e-mail:</label>
                <input className="form_input" type="email" name="newsletter"/>
                <Button role="important">Zapisz się</Button>
            </form>
        </div>
    )
}

export default Newsletter;