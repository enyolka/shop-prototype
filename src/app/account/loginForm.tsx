import * as React from "react";
import { useState } from "react";
import Button from "../../components/button/button";

type Props = {
    setLogged: (value: boolean) => void;
}

const LoginForm = ({setLogged}: Props) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")

 return (
    <form className="login_form">
      <div  className="login_item">
        <label htmlFor="login">Login</label>
        <input type="text" required name="login" className="form_input" value={login} onChange={e => setLogin(e.target.value)}/>
      </div>
      
      <div  className="login_item">
        <label htmlFor="password">Hasło</label>
        <input type="password" required name="password" className="form_input" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      
       <Button 
        className="login_button"
        onClick={() => {
          if (login === "admin" && password === "admin") setLogged(true)
          else console.log("Błędne logowanie")
        }
      }>Zaloguj się</Button>
    </form>
    )
}

export default LoginForm;