import { ErrorMessage, Field, FieldInputProps, FieldMetaProps, Form, Formik, FormikProps } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import Message from "../../../components/message/message";
import { AccountFormModel } from "../accountPage";
import bg from "/public/images/test.png"
import Spinner from "../../../components/spinner/spinner";
import { BsCheckCircle } from "react-icons/bs";

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>;
  meta: FieldMetaProps<V>;
}

export type DeliveryFormModel = {
  name: string
  city: string;
  street: string;
  zipCode: string;
}

const MyInput = ({ field, form, ...props }: FieldProps) => {
  return <input className="form_input" {...field} {...props} />;
  
};

const DeliveryData =( props: any) => {
    const [list, setList] = useState(JSON.parse(localStorage.getItem("accounts")) || [])
    const [idx, setIdx] = useState(list.findIndex((account: AccountFormModel) => JSON.parse(sessionStorage.getItem("account"))?.name === account?.name) || null)
    const [valid, setValid] = useState(false)
    const [component, setComponent] = useState(null)

    useEffect(() => {
      setIdx(list.findIndex((account: AccountFormModel) => JSON.parse(sessionStorage.getItem("account"))?.name === account?.name) || null)
    },[JSON.parse(localStorage.getItem("accounts"))])

    const initialModel = {
      name: list[idx]?.deliveryData?.name || "",
      city: list[idx]?.deliveryData?.city || "",
      street: list[idx]?.deliveryData?.street || "",
      zipCode: list[idx]?.deliveryData?.zipCode || ""
    }

    const validationSchema = Yup.object({
      name: Yup.string()
      .max(40, "Musi składać się z co najwyżej 40 znaków")
      .required("Pole wymagane"),
      street: Yup.string()
        .max(40, "Musi składać się z co najwyżej 40 znaków")
        .required("Pole wymagane"),
      zipCode: Yup.string().required("Pole wymagane"),
      city: Yup.string()
        .max(30, "Musi składać się z co najwyżej 30 znaków")
        .required("Pole wymagane"),
    });
    
    const onSubmit = (values: any) => {
      // const idx = list.findIndex((account: AccountFormModel) => JSON.parse(sessionStorage.getItem("account")).name === account.name)
      const updatedItem = {
        ...list[idx],
        deliveryData: {
          name: values.name,
          city: values.city,
          street: values.street,
          zipCode: values.zipCode
        }
      };

      list[idx] = updatedItem;
      localStorage.setItem("accounts", JSON.stringify(list))
      setValid(true)
    }

    useEffect(() => {
      setComponent(<Spinner size="big"/>)
      setTimeout(() => setComponent(<BsCheckCircle />), 3000) 
    }, [valid])
  
    return (
      <article className="accountDetails_form">
      <div 
      className="bg-image" 
      style={{
        backgroundImage: `url(${bg})`, 
      }}></div>
       <Formik<DeliveryFormModel>
          initialValues={initialModel}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values: any) => onSubmit(values)}
          validationSchema={validationSchema}
        >
          {({ errors, touched } : any) => (
            <Form className="form_account">
              <div className="form_account_items">
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
                
                <div className={"submit_button"}>
                <Button 
                    type="submit" 
                    role="secondary"
                    className="button--check"
                  >
                    Potwierdź
                    {valid && component}
                  </Button>
                </div>
          </Form>)}
      
      </Formik> 
      </article>
    );
  };

export default  DeliveryData;