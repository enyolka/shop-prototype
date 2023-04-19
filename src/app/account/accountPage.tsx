import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";
import AccountDetailsPage from "./accountDetailsPage";

const AccountPage =( props: any) => {
    const context = useContext(ProductContext);
    const [logged, setLogged] = useState(!!sessionStorage.getItem('logged'));
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")

    useEffect(() => 
    sessionStorage.setItem('logged', JSON.stringify(logged)), [logged])

    return (
      <>
        <article className="account">
          {logged 
          ? <>
            <h3>Witaj!</h3>
            <AccountDetailsPage/>
          </>
          : <>
            <h3>Zaloguj się</h3>
            <form>
              <label htmlFor="login">Login</label>
              <input type="text" required name="login" className="form_input" value={login} onChange={e => setLogin(e.target.value)}/>
              <label htmlFor="password">Hasło</label>
              <input type="password" required name="password" className="form_input" value={password} onChange={e => setPassword(e.target.value)}/>
              <Button onClick={() => {
                if (login === "admin" && password === "admin") setLogged(true)
                else console.log("Błędne logowanie")
              }
              }>Zaloguj się</Button>
            </form>
          </>
        }
        </article>
      </>
    );
  };

export default AccountPage;