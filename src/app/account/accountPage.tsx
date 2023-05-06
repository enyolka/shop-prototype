import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";
import AccountDetailsPage from "./accountDetailsPage";
import "./accountPage.css"
import LoginForm from "./components/loginForm";
import Toggle from "../../components/toggle/toggle";
import bg from "/public/bg-light2.png";
import RegisterForm from "./components/registerForm";
import { DeliveryFormModel } from "./components/deliveryData";


export type AccountFormModel = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  deliverytData?: DeliveryFormModel;
}

const AccountPage =( props: any) => {
    const context = useContext(ProductContext);
    const [logged, setLogged] = useState(sessionStorage.getItem('logged') === "true");    
    const [list, setList] = useState(JSON.parse(localStorage.getItem("accounts")) || [])
    const [idx, setIdx] = useState(list.findIndex((account: AccountFormModel) => JSON.parse(sessionStorage.getItem("account"))?.name === account?.name) || null)
    const [value, setValue] = useState("login");
    //  const [initialModel, setInitialModel] = useState<DeliveryFormModel>()
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
      sessionStorage.setItem('logged', JSON.stringify(logged))
      console.log(sessionStorage.getItem("account"))
    }, [logged])

    useEffect(() => {
      setIdx(list.findIndex((account: AccountFormModel) => JSON.parse(sessionStorage.getItem("account"))?.name === account?.name) || null)
    },[JSON.parse(localStorage.getItem("accounts"))])

    return (
      <>
        <article className="account">
          {logged && idx != null
          ? <>
            <Button 
              className="button_logout" 
              onClick={() => {
                setLogged(false)
                sessionStorage.removeItem("account")
              }}
            >
              Wyloguj się
            </Button>
            <AccountDetailsPage />
          </>
          : <div className="account_forms" /*style={{backgroundImage: `url(${bg})`}}*/>
          <Toggle
              className="login_toggle"
              options={options} 
              value={value}      
              onChange={setValue}    
            />
          { value === "login" 
          ? <LoginForm 
              setLogged={setLogged} 
              // setAccount={() => setAccount}
            /> 
          :  <RegisterForm setLogged={setLogged}/>}
          </div>
        }
        </article>
      </>
    );
  };

export default AccountPage;