import * as React from "react";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import Message from "../../../components/message/message";
import { ErrorMessage, Field, FieldInputProps, FieldMetaProps, Form, Formik, FormikProps } from "formik";
import { AccountFormModel } from "../accountPage";


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
  const [registered, setRegistered] = useState(false)
  const [tried, setTried] = useState(false)
  const validatedNames = [...list?.map((account: AccountFormModel) => account.name)]

  useEffect(() => setTried(false),[])

  const initialModel: AccountFormModel = {
    name: "",
    email: "",
    password: ""
  };

  const passRegExp = /^(?=.*[^A-Za-z0-9]).+$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .notOneOf(validatedNames, "This name already exist")
      .required("Required"),
    password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Required"),
    email: Yup.string().email("Email is not valid")
    .required("Required"),

  });

 return (
  <Formik<AccountFormModel>
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
  {({ errors, touched, values } : any) => (
    <Form className="account_form">
        <div className={"register_item"}>
          <label htmlFor="name">Login</label>
          <Field
            label="Name"
            name="name"
            type="text"
            component={MyInput}
            // error={errors.name && touched.name}
          />
         {errors.name && touched.name ? <ErrorMessage name="name">
            {(msg: string) => <Message  type="error" wrapped size="small" className={"error_message--float"}>{msg}</Message>}
          </ErrorMessage> : null}
        </div>

        <div className={"register_item"}>
        <label htmlFor="email">Email</label>
          <Field
            label="Email"
            name="email"
            type="text"
            component={MyInput}
            // error={errors.email && touched.email}
          />
          {errors.email && touched.email ? <ErrorMessage name="email">
            {(msg: string) => (
              <Message  type="error" size="small" wrapped className={"error_message--float"}>{msg}</Message>
            )}
          </ErrorMessage> : null}
        </div>
        
        <div className={"register_item"}>
          <label htmlFor="password">Hasło</label>
          <Field
            label="Password"
            name="password"
            type="password"
            component={MyInput}
            // error={errors.password && touched.password}
          />
          {errors.password && touched.password ? <ErrorMessage name="password">
            {(msg: string) => (
              <Message  type="error" size="small"  wrapped className={"error_message--float"}>{msg}</Message>
            )}
          </ErrorMessage> : null}
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