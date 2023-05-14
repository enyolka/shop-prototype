import * as React from "react";
import { useEffect, useState } from "react";
import Header from "../components/header/header";
import categories from "./data/categories.json";
import { Link, BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import ErrorPage from "./errorPage";
import ProductInfo from "./products/productInfo";
import GlobalState from "../contexts/GlobalState";
import ProductsPage from "./products/productsPage";
import CartPage from "./cart/cartPage";
import LikedPage from "./liked/likedPage";
import "./app.css";
import BuyPage from "./cart/buyPage";
import AccountPage from "./account/accountPage";
import PromotionsPage from "./products/promotionsPage";
import EndPage from "./cart/endPage";
import HomePage from "./home/homePage";
import Footer from "../components/footer/footer";
import ContactPage from "./additional/contactPage";
import NotFound from "./additional/notFound";
import SettingsPage from "./additional/settingsPage";

const App = () => {
  const headers = ["leftside", "simple", "extensive", "rightside"];
  const colors = ["mint", "blue", "white"];
  const [header, setHeader] = useState(
    sessionStorage.getItem("header") != null
      ? sessionStorage.getItem("header")
      : headers[0]
  );
  const [color, setColor] = useState(
    sessionStorage.getItem("color") != null
      ? sessionStorage.getItem("color")
      : colors[0]
  );

  const setHeaderOption = (newOption: string) => {
    setHeader(newOption);
    sessionStorage.setItem("header", newOption);
  };

  const setColorOption = (newOption: string) => {
    sessionStorage.setItem("color", newOption);
    setColor(newOption);
  };

  useEffect(() => handleColors(color), [color]);

  const handleColors = (color: string) => {
    if (color === "mint") {
      document.documentElement.style.setProperty(
        "--main-light-max",
        "rgb(232, 244, 244)"
      );
      document.documentElement.style.setProperty(
        "--main-light",
        "rgb(170, 219, 219)"
      );
      document.documentElement.style.setProperty(
        "--main-medium",
        "rgb(65, 164, 177)"
      );
      document.documentElement.style.setProperty(
        "--secondary",
        "rgb(23, 116, 139)"
      );
      document.documentElement.style.setProperty("--main", "rgb(41, 80, 98)");
    }

    if (color === "blue") {
      document.documentElement.style.setProperty(
        "--main-light-max",
        "rgb(236 249 255)"
      );
      document.documentElement.style.setProperty(
        "--main-light",
        "rgb(176 222 239)"
      );
      document.documentElement.style.setProperty(
        "--main-medium",
        "rgb(94, 166, 194)"
      );
      document.documentElement.style.setProperty(
        "--secondary",
        "rgb(49, 120, 183)"
      );
      document.documentElement.style.setProperty("--main", "rgb(59, 99, 135)");
    }

    if (color === "white") {
      document.documentElement.style.setProperty(
        "--main-light-max",
        "rgb(255 255 255)"
      );
    }
  };

  return (
    <GlobalState>
      <BrowserRouter>
        <Header options={headers} option={header} setOption={setHeaderOption} />
        <main className={"container"}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/produkty" element={<ProductsPage />} />
            <Route path="/promocje" element={<PromotionsPage />} />
            <Route path={`/:id`} element={<ProductInfo />} />
            <Route path={`produkty/:category`} element={<ProductsPage />} />
            <Route
              path={`produkty/:category/:subcategory`}
              element={<ProductsPage />}
            />
            <Route path="/ulubione" element={<LikedPage />} />
            <Route path="/koszyk" element={<CartPage />} />
            <Route path="/realizuj-zamowienie" element={<BuyPage />} />
            <Route path="/podsumowanie" element={<EndPage />} />
            <Route
              path="/konto/informacje"
              element={<AccountPage option="accountData" />}
            />
            <Route
              path="/konto/adres"
              element={<AccountPage option="deliveryData" />}
            />
            <Route
              path="/konto/programy-lojalnosciowe"
              element={<AccountPage option="loyalty" />}
            />
            <Route
              path="/konto/kontakt"
              element={<AccountPage option="contact" />}
            />
            <Route
              path="/konto/*"
              element={<AccountPage option="accountData" />}
            />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route
              path="/ustawienia"
              element={
                <SettingsPage
                  headerOptions={headers}
                  headerOption={header}
                  setHeaderOption={setHeaderOption}
                  colorOptions={colors}
                  colorOption={color}
                  setColorOption={setColorOption}
                />
              }
            />
            {/* <Route path="/konto/rejestracja" element={<AccountPage/>} />
              <Route path="/konto/logowanie" element={<AccountPage/>} /> */}
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </GlobalState>
  );
};
export default App;
