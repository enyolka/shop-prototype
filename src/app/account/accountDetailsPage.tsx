import { ErrorMessage, Field, FieldInputProps, FieldMetaProps, Form, Formik, FormikProps } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import { Product, ProductContext } from "../../contexts/GlobalState";
import Message from "../../components/message/message";


export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>;
  meta: FieldMetaProps<V>;
}
export type AccountFormModel = {
  login: string;
  password: string;
}


const MyInput = ({ field, form, ...props }: FieldProps) => {
  return <input className="form_input" style={{ marginRight: 10 }} {...field} {...props} />;
  
};


const AccountDetailsPage =( props: any) => {
    const context = useContext(ProductContext);
    const [logged, setLogged] = useState(!!sessionStorage.getItem('logged'));
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")

    const initialModel: AccountFormModel = {
      login: "",
      password: ""
    };

    useEffect(() => 
    sessionStorage.setItem('logged', JSON.stringify(logged)), [logged])

    const validationSchema = Yup.object({
      login: Yup.string().required("Required"),
      password: Yup.string().required("Required")});
    
  
    return (
      <>
        <Formik<AccountFormModel>
          initialValues={props.initialValues ?? initialModel}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values: any, { resetForm }: any) => {
            console.log("ok")
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
                </div>
          </Form>)}
      
      </Formik> 
      </>
    );
  };

export default AccountDetailsPage;