import * as React from "react";
import { useEffect, useState } from "react";
import AccountDetailsPage from "./accountDetailsPage";
import "./accountPage.css";
import LoginForm from "./components/loginForm";
import Toggle from "../../components/toggle/toggle";
import bg from "/public/bg-light2.png";
import RegisterForm from "./components/registerForm";
import { DeliveryFormModel } from "./components/deliveryData";
import trust from "/public/images/trust.png";

export type AccountFormModel = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  deliverytData?: DeliveryFormModel;
};

type Props = {
  option?: "accountData" | "deliveryData" | "loyalty" | "contact";
};

const AccountPage = ({ option }: Props) => {
  const [logged, setLogged] = useState(
    sessionStorage.getItem("logged") === "true"
  );
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("accounts")) || []
  );
  const [idx, setIdx] = useState(
    list.findIndex(
      (account: AccountFormModel) =>
        JSON.parse(sessionStorage.getItem("account"))?.name === account?.name
    ) || null
  );
  const [value, setValue] = useState("login");

  const options = [
    {
      value: "login",
      label: "Zaloguj się",
    },
    {
      value: "register",
      label: "Zarejestruj się",
    },
  ];

  useEffect(() => {
    sessionStorage.setItem("logged", JSON.stringify(logged));
  }, [logged]);

  useEffect(() => {
    setIdx(
      list.findIndex(
        (account: AccountFormModel) =>
          JSON.parse(sessionStorage.getItem("account"))?.name === account?.name
      ) || null
    );
  }, [list]);

  return (
    <>
      <article className="account">
        {logged && idx != null ? (
          <>
            {/* <Button 
              className="button_logout" 
              onClick={() => {
                setLogged(false)
                sessionStorage.removeItem("account")
              }}
            >
              Wyloguj się
            </Button> */}
            <AccountDetailsPage option={option} />
          </>
        ) : (
          <>
            <div
              className="account_forms" /*style={{backgroundImage: `url(${bg})`}}*/
            >
              <Toggle
                className="login_toggle"
                options={options}
                value={value}
                onChange={setValue}
              />
              {value === "login" ? (
                <LoginForm setLogged={setLogged} />
              ) : (
                <RegisterForm setLogged={setLogged} />
              )}
            </div>
            <img
              alt="loginPage-image"
              src={trust}
              className="account_forms__img"
            />
          </>
        )}
      </article>
    </>
  );
};

export default AccountPage;
