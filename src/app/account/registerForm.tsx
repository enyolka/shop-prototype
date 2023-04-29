import * as React from "react";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import Message from "../../components/message/message";
import { ErrorMessage, Field, FieldInputProps, FieldMetaProps, Form, Formik, FormikProps } from "formik";
import { AccountData } from "./accountPage";


export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>;
  meta: FieldMetaProps<V>;
}

const MyInput = ({ field, form, ...props }: FieldProps) =>  <input className="form_input" {...field} {...props} />

type Props = {
    setLogged: (value: boolean) => void;
}

const RegisterForm = ({}: Props) => {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("accounts")) || [])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [registered, setRegistered] = useState(false)
  const [password, setPassword] = useState("")
  const [tried, setTried] = useState(false)

  useEffect(() => setTried(false),[])

  const initialModel: AccountData = {
    name: "",
    email: "",
    password: "",
  };

  const passRegExp = /^(?=.*[^A-Za-z0-9]).+$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    password: Yup.string().matches(passRegExp, "Hasło musi zawierać znaki specjalne")
    .required("Required"),
    email: Yup.string().email("Email is not valid")
    .required("Required"),

  });

 return (
  <Formik<AccountData>
  initialValues={initialModel}
  enableReinitialize={true}
  validateOnChange={true}
  validateOnBlur={true}
  onSubmit={(values: any, { resetForm }: any) => {
    setList(list.push({name: values.name, email: values.email, password: values.password}))
    localStorage.setItem("accounts", JSON.stringify(list))
    setTried(true)
    setRegistered(true) 
    resetForm({});
  }}
  validationSchema={validationSchema}
>
  {({ errors, touched } : any) => (
    <Form className="account_form">
        <div className={"register_item"}>
          <label htmlFor="name">Nazwa</label>
          <Field
            label="Name"
            name="name"
            type="text"
            component={MyInput}
            error={errors.name && touched.name}
          />
          <ErrorMessage name="name">
            {(msg: string) => <Message  type="error" wrapped size="small" className={"error_message"}>{msg}</Message>}
          </ErrorMessage>
        </div>

        <div className={"register_item"}>
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
              <Message  type="error" size="small" wrapped className={"error_message"}>{msg}</Message>
            )}
          </ErrorMessage>
        </div>
        
        <div className={"register_item"}>
          <label htmlFor="password">Hasło</label>
          <Field
            label="Password"
            name="password"
            type="password"
            component={MyInput}
            error={errors.phone && touched.phone}
          />
          <ErrorMessage name="password">
            {(msg: string) => (
              <Message  type="error" size="small"  wrapped className={"error_message"}>{msg}</Message>
            )}
          </ErrorMessage>
        </div>
       <Button 
        className="login_button">Zarejestruj się</Button>

      {registered && 
        <Message 
          className="registered_info"
          type="info" 
          wrapped
        >
          Rejestracja przebiegła pomyślnie! Możesz się teraz zalogować.
        </Message>}
      { !registered && tried &&
        <Message 
        className="registered_info"
        type="error" 
        wrapped
      >
        Rejestracja nie powiodła się.
      </Message>
      }
    </Form>
    )}</Formik>
    )
}

export default RegisterForm;