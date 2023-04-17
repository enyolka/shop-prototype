import { ErrorMessage, Field, FieldInputProps, FieldMetaProps, Form, Formik, FormikProps } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";
import placeholder from "/public/placeholder.png";
import Message from "../../components/message/message";
import "./buyPage.css"

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>;
  meta: FieldMetaProps<V>;
}
export type ClientFormModel = {
  id: number;
  name: string;
  nip: string;
  phone?: string;
  email?: string;
  city: string;
  street: string;
  zipCode: string;
}


const MyInput = ({ field, form, ...props }: FieldProps) => {
  return <input className="form_input" style={{ marginRight: 10 }} {...field} {...props} />;
  
};

const BuyPage =( props: any) => {
    const context = useContext(ProductContext);
    const [cost, setCost] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
      let sum = 0
      context.cart.forEach(({price, quantity}: Product) => sum += price * quantity)
      setCost(sum)
    }, [context.cart]) 

    const sumUp = () => {
      context.cart = []
      sessionStorage.setItem('cartItems', JSON.stringify([]))
      navigate("/podsumowanie");
    }

    // const { suppliersState, customersState } = useState();
    const initialModel: ClientFormModel = {
      id: 0,
      name: "",
      nip: "",
      city: "",
      street: "",
      zipCode: "",
      phone: "",
      email: "",
    };
  
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const streetRegExp = /^([0-9]+|([0-9]+[/][0-9]+))$/;
  
  
    const validationSchema = Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
      email: Yup.string().email("Email is not valid"),
      streetName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      streetNumber: Yup.string()
        .matches(streetRegExp, "Street number is not valid")
        .required("Required"),
      zipCode: Yup.string().required("Required"),
      city: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    });



  
    return (
      <>
        <main className="buy">
          {/* <section className="form">
            <form>
              <h4>Adres dostawy</h4>

              <label htmlFor="name">Imię</label>
              <input type="text" required name="name"/>
              <label htmlFor="surname">Nazwisko</label>
              <input type="text" required name="surname"/>
              <label htmlFor="street">Ulica</label>
              <input type="text" required name="street"/>
              <label htmlFor="zipCode">Kod pocztowy</label>
              <input type="text" required name="zipCode"/>
              <label htmlFor="city">Miejscowość</label>
              <input type="text" required name="city"/>

              <h4>Dane kontaktowe</h4>

              <label htmlFor="phone">Numer telefonu</label>
              <input type="tel" required name="phone"/>
              <label htmlFor="email">E-mail</label>
              <input type="email" required name="email"/>
              
            <input type="submit" onClick={() => sumUp()} disabled={context.cart.length == 0} />
            </form>
          </section> */}


          <Formik<ClientFormModel>
          initialValues={props.initialValues ?? initialModel}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values: any, { resetForm }: any) => {
            console.log("ok")
            sumUp()
            resetForm({});
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched } : any) => (
            <Form className="form_cart">
              <div className="form_cart_items">
                <div className={"field"}>
                  <label htmlFor="name">Imię i nazwisko</label>
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    component={MyInput}
                    error={errors.name && touched.name}
                  />
                  <ErrorMessage name="name">
                    {(msg: string) => <Message className={"error_message"}>{msg}</Message>}
                  </ErrorMessage>
                </div>
                <div className={"field"}>
                  <label htmlFor="phone">Telefon</label>
                  <Field
                    label="Phone"
                    name="phone"
                    type="text"
                    component={MyInput}
                    error={errors.phone && touched.phone}
                  />
                  <ErrorMessage name="phone">
                    {(msg: string) => (
                      <Message className={"error_message"}>{msg}</Message>
                    )}
                  </ErrorMessage>
                </div>

                <div className={"field"}>
                <label htmlFor="email">Email</label>
                  <Field
                    label="Email"
                    name="email"
                    type="text"
                    component={MyInput}
                    error={errors.email && touched.email}
                  />
                  <ErrorMessage name="email">
                    {(msg: string) => (
                      <Message className={"error_message"}>{msg}</Message>
                    )}
                  </ErrorMessage>
                </div>
                <div className={"field"}>
                  <label htmlFor="street">Ulica</label>
                  <Field
                    label="Street"
                    name="street"
                    type="text"
                    component={MyInput}
                    error={errors.street && touched.street}
                  />
                  <ErrorMessage name="street">
                    {(msg: string) => (
                      <Message className={"error_message"}>{msg}</Message>
                    )}
                  </ErrorMessage>
                </div>
                <div className={"fields_row"}>
                  <div className={"field"}>
                  <label htmlFor="zipCode">Kod pocztowy</label>
                    <Field
                      label="Zip code"
                      name="zipCode"
                      type="text"
                      component={MyInput}
                      error={errors.zipCode && touched.zipCode}
                    />
                    <ErrorMessage name="zipCode">
                      {(msg: string) => (
                        <Message className={"error_message"}>{msg}</Message>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className={"field"}>
                    <label htmlFor="city">Miejscowość</label>
                    <Field
                      label="City"
                      name="city"
                      type="text"
                      component={MyInput}
                      error={errors.city && touched.city}
                    />
                    <ErrorMessage name="city">
                      {(msg: string) => (
                        <Message className={"error_message"}>{msg}</Message>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                </div>
                
                <section className="summary">
                  <h3>Podsumowanie zamówienia</h3>
                  <ul className="summary_list">
                    {context.cart.map(cartItem => (
                      <li key={cartItem.id} className="summary_item">
                          <img alt="" src={placeholder} className="summary_item__img"/>
                          <Link to={`/${cartItem.id}`} className="summary_item__link">{cartItem.name}</Link>
                          <p className="summary_item__price">{cartItem.price * cartItem.quantity}$</p>
                      </li>
                    ))}
                  </ul>
                  <div >
                    <p className="summary_cost">Do zapłaty: {cost}$</p>
                  </div>
                </section>

                <div className={"submit_button"}>
                  <Button role="secondary">
                    Potwierdź
                  </Button>
                </div>
            </Form>
          )}
        </Formik>



        </main>
      </>
    );
  };

export default BuyPage;