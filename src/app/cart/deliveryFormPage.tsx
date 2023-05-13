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
import { AccountFormModel } from "../account/accountPage";

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>;
  meta: FieldMetaProps<V>;
}

type Props = {
  onNext: (idx: number) => void;
}

export type ClientFormModel = {
  name: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  zipCode: string;
}


const MyInput = ({ field, form, ...props }: FieldProps) => {
  return <input className="form_input" {...field} {...props} />;
  
};

const DeliveryPage =({ onNext }: Props) => {
    const [data, setData] = useState((JSON.parse(localStorage.getItem("accounts")) || []).find(((account: AccountFormModel) => JSON.parse(sessionStorage.getItem("account"))?.name === account.name)));
    const [initialModel, setInitialModel] = useState<ClientFormModel>();
    const [submitted, setSubmitted] = useState(false)
    const [editable, setEditable] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
      setInitialModel({
      name: data?.deliveryData?.name || "",
      city: data?.deliveryData?.city || "",
      street: data?.deliveryData?.street || "",
      zipCode: data?.deliveryData?.zipCode || "",
      phone: data?.phone || "",
      email: data?.email|| "",
    });}, [])

    useEffect(() => {
      setSubmitted(initialModel && (Object.values(initialModel).filter(item => item != '').length === 6))
    }, [initialModel])
  
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = Yup.object({
      name: Yup.string()
      .max(40, "Musi składać się z co najwyżej 40 znaków")
      .required("Pole wymagane"),
      phone: Yup.string().matches(phoneRegExp, "Numer telefonu niepoprawmy")
      .required("Pole wymagane"),
      email: Yup.string().email("Email niepoprawny")
      .required("Pole wymagane"),
      street: Yup.string()
        .max(40, "Musi składać się z co najwyżej 40 znaków")
        .required("Pole wymagane"),
      zipCode: Yup.string().required("Pole wymagane"),
      city: Yup.string()
        .max(30, "Musi składać się z co najwyżej 30 znaków")
    });

    return (
      <>
     {!editable && !!data
        && (
        <div className="form_cart__actual card"> 
          <div className="form_cart__info">
            <p>Imię i nazwisko:  <b>{initialModel?.name || "-"}</b></p>
            <p>Telefon:  <b>{initialModel?.phone || "-"}</b></p>
            <p>Email:  <b>{initialModel?.email || "-"}</b></p>
            <p>Ulica:  <b>{initialModel?.street || "-"}</b></p>
            <p>Kod pocztowy:  <b>{initialModel?.zipCode || "-"}</b></p>
            <p>Miejscowowść:   <b>{initialModel?.city || "-"}</b></p>
          </div>
          <Button onClick={() => setEditable(true)} className="form_cart__button">Edytuj dane</Button>
        </div>)
}
         {(editable || !data) && <Formik<ClientFormModel>
          initialValues={initialModel}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values: any, { resetForm }: any) => {
            setInitialModel({...values})
            setEditable(false)
            setSubmitted(true)
            // onNext(1);
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched, } : any) => (
            <Form className="form_cart card">
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
                    {(msg: string) => <Message  type="error" size="small" className={"error_message"}>{msg}</Message>}
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
                      <Message  type="error" size="small" className={"error_message"}>{msg}</Message>
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
                      <Message  type="error" size="small" className={"error_message"}>{msg}</Message>
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
                      <Message  type="error" size="small" className={"error_message"}>{msg}</Message>
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
                        <Message  type="error" size="small" className={"error_message"}>{msg}</Message>
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
                        <Message  type="error" size="small" className={"error_message"}>{msg}</Message>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                
                </div>

                <Button type="submit">
                  Potwierdź
                </Button>
            </Form>
          )}
        </Formik>}
                        
        <div className={"submit_button"}>
          <Button role="default" onClick={() => navigate("/koszyk")}>
            Poprzedni
          </Button>
          <Button role="secondary" onClick={() => onNext(1)} disabled={!submitted}>
            Dalej
          </Button>
        </div>
      </>
    );
  };

export default DeliveryPage;