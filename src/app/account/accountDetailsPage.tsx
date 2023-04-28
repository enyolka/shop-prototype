import { ErrorMessage, Field, FieldInputProps, FieldMetaProps, Form, Formik, FormikProps } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";
import Message from "../../components/message/message";
import { ClientFormModel } from "../cart/buyPageo";
import "./accountDetailsPage.css";

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>;
  meta: FieldMetaProps<V>;
}

const MyInput = ({ field, form, ...props }: FieldProps) => {
  return <input className="form_input" style={{ marginRight: 10 }} {...field} {...props} />;
  
};

const AccountDetailsPage =( props: any) => {
    const context = useContext(ProductContext);
    const [logged, setLogged] = useState(!!sessionStorage.getItem('logged'));
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    useEffect(() => 
    sessionStorage.setItem('logged', JSON.stringify(logged)), [logged])

    const sumUp = () => {
      context.cart = []
      sessionStorage.setItem('cartItems', JSON.stringify([]))
      navigate("/podsumowanie");
    }

    // const { suppliersState, customersState } = useState();
    const initialModel: ClientFormModel = {
      name: "",
      city: "",
      street: "",
      zipCode: "",
      phone: "",
      email: "",
    };
  
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      phone: Yup.string().matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
      email: Yup.string().email("Email is not valid")
      .required("Required"),
      street: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      zipCode: Yup.string().required("Required"),
      city: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    });
    
  
    return (
      <>
       <Formik<ClientFormModel>
          initialValues={props.initialValues ?? initialModel}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values: any, { resetForm }: any) => {
            resetForm({});
          }}
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
                
                <div className={"submit_button"}>
                  <Button role="secondary">
                    Potwierdź
                  </Button>
                </div>
          </Form>)}
      
      </Formik> 
      </>
    );
  };

export default AccountDetailsPage;