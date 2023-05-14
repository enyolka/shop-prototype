import * as React from "react";
import Button from "../../components/button/button";
import "./newsletter.css";
import * as classNames from "classnames";
import { useState } from "react";
import Message from "../../components/message/message";
import { BsCheckCircle } from "react-icons/bs";

type Props = {
  size?: "small" | "default";
};

const Newsletter = ({ size }: Props) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [valid, setValid] = useState(true);

  return (
    <div className={classNames("newsletter", size)}>
      <h3>Newsletter</h3>
      <div className="newsletter_info">
        <p>
          Nie przegap żadnej promocji, zdobywaj i korzystaj z kuponów
          rabatowych!
        </p>
        <p>Zapisz się już teraz.</p>
      </div>
      <form
        className="newsletter_form"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          email.match(/\S+@\S+\.\S+/) ? setValid(true) : setValid(false);
        }}
      >
        <label htmlFor="newsletter">Twój e-mail:</label>
        <input
          className="form_input"
          type="email"
          name="newsletter"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {sent && !valid && (
          <Message
            type="error"
            size="small"
            wrapped
            className={"error_message--float"}
          >
            Podano niepoprawny email
          </Message>
        )}
        <Button role="important" type="submit" className="button--check">
          <span>Zapisz się</span>
          {sent && valid && <BsCheckCircle />}
        </Button>
      </form>
      {sent && valid && (
        <Message type="info">
          Dołączyłeś do naszej skrzynki newslettera! Od teraz jako pierwszy
          będziesz otrzymywał bieżące promocje i okazje.
        </Message>
      )}
    </div>
  );
};

export default Newsletter;
