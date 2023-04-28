import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";
import AccountDetailsPage from "./accountDetailsPage";
import "./accountPage.css"
import LoginForm from "./loginForm";
import Toggle from "../../components/toggle/toggle";

const AccountPage =( props: any) => {
    const context = useContext(ProductContext);
    const [logged, setLogged] = useState(sessionStorage.getItem('logged') === "true");
    const [value, setValue] = useState("login");

    const options = [
      {
        value: "login",
        label: "Zaloguj się"
      },
      {
        value: "register",
        label: "Zarejestruj się"
      }
    ]

    useEffect(() => {
    console.log(JSON.stringify(logged)) 
    sessionStorage.setItem('logged', JSON.stringify(logged))}, [logged])

    return (
      <>
        <article className="account">
          {logged 
          ? <>
            <h3>Witaj!</h3>
            <AccountDetailsPage/>
            <Button onClick={() =>  setLogged(false)}>Wyloguj się</Button>
          </>
          : <>
          <Toggle
              options={options} 
              value={value}      
              onChange={setValue}    
            />
          { value === "login" 
          ? <LoginForm setLogged={setLogged} /> 
          :  null}
          </>
        }
        </article>
      </>
    );
  };

export default AccountPage;