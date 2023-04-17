import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";

const AccountPage =( props: any) => {
    const context = useContext(ProductContext);
    const [logged, setLogged] = useState(false)
    
  
    return (
      <>
        <main className="account">
          {logged 
          ? <>
            <h3>Witaj!</h3>
          </>
          : <>
            <h3>Zaloguj się</h3>
            <form>
              <label htmlFor="login">Login</label>
              <input type="text" required name="login" className="form_input"/>
              <label htmlFor="password">Hasło</label>
              <input type="password" required name="password" className="form_input"/>
              <input type="submit" value="Zaloguj się"/>
            </form>
          </> 
        }
        </main>
      </>
    );
  };

export default AccountPage;