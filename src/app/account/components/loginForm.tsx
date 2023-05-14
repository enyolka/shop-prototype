import * as React from "react";
import { useState } from "react";
import Button from "../../../components/button/button";
import { AccountFormModel } from "../accountPage";
import Message from "../../../components/message/message";

type Props = {
  setLogged: (value: boolean) => void;
};

const LoginForm = ({ setLogged }: Props) => {
  const accounts = [
    {
      name: "admin",
      password: "admin",
      email: "admin",
    },
  ].concat(JSON.parse(localStorage.getItem("accounts")));

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  return (
    <form className="account_form">
      <div className="login_item">
        <label htmlFor="login">Login</label>
        <input
          type="text"
          required
          name="login"
          className="form_input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>

      <div className="login_item">
        <label htmlFor="password">Hasło</label>
        <input
          type="password"
          required
          name="password"
          className="form_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        className="login_button"
        onClick={(event) => {
          event.preventDefault();
          const selected = accounts.find(
            (account: AccountFormModel) => account.name === login
          );
          if (selected && selected.password === password) {
            setLogged(true);
            sessionStorage.setItem("account", JSON.stringify(selected));
            setFailed(false);
          } else setFailed(true);
        }}
      >
        Zaloguj się
      </Button>
      {failed && (
        <Message type="error" wrapped>
          Logowanie nie powiodło się. Niepoprawny login i/lub hasło.
        </Message>
      )}
    </form>
  );
};

export default LoginForm;
