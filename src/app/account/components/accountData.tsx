import * as React from "react";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import Message from "../../../components/message/message";
import {
  ErrorMessage,
  Field,
  FieldInputProps,
  FieldMetaProps,
  Form,
  Formik,
  FormikProps,
} from "formik";
import { AccountFormModel } from "../accountPage";
import bg from "/public/images/test.png";
import { BsCheckCircle } from "react-icons/bs";
import Spinner from "../../../components/spinner/spinner";

export interface FieldProps<V = any> {
  field: FieldInputProps<V>;
  form: FormikProps<V>;
  meta: FieldMetaProps<V>;
}

const MyInput = ({ field, form, ...props }: FieldProps) => (
  <input className="form_input" {...field} {...props} />
);

const AccountData = (props: any) => {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("accounts")) || []
  );
  const [idx, setIdx] = useState(
    list.findIndex(
      (account: AccountFormModel) =>
        JSON.parse(sessionStorage.getItem("account"))?.name === account?.name
    ) || 0
  );
  const [valid, setValid] = useState(false);
  const [component, setComponent] = useState(null);

  // const { suppliersState, customersState } = useState();
  const initialModel: AccountFormModel = {
    name: list[idx]?.name || "",
    phone: list[idx]?.phone || "",
    email: list[idx]?.email || "",
    password: list[idx]?.password || "",
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(phoneRegExp, "Numer telefonu niepoprawny")
      .required("Pole wymagane"),
    email: Yup.string().email("Email niepoprawny").required("Pole wymagane"),
    password: Yup.string()
      .required("pole wymagane")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Musi zawierać 8 znaków oraz przynajmniej jedną wielką i małą literę, liczbę i znak specjalny"
      ),
  });

  const onSubmit = (values: any) => {
    // const idx = list.findIndex((account: AccountFormModel) => JSON.parse(sessionStorage.getItem("account")).name === account.name)
    const updatedItem = {
      ...list[idx],
      phone: values.phone,
      email: values.email,
      password: values.password,
    };

    list[idx] = updatedItem;
    localStorage.setItem("accounts", JSON.stringify(list));
    setList(list);
    setValid(true);
  };

  useEffect(() => {
    setComponent(<Spinner size="big" />);
    setTimeout(() => setComponent(<BsCheckCircle />), 3000);
  }, [valid]);

  return (
    <article className="accountDetails_form">
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      ></div>
      <Formik<AccountFormModel>
        initialValues={initialModel}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values: any) => onSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ errors, touched }: any) => {
          return (
            <Form className="form_account">
              <div className="form_account_items">
                <div className={"field"}>
                  <label htmlFor="phone">Telefon</label>
                  <Field
                    label="Phone"
                    name="phone"
                    type="text"
                    component={MyInput}
                    // error={errors.phone && touched.phone}
                  />
                  {errors.phone && touched.phone ? (
                    <ErrorMessage name="phone">
                      {(msg: string) => (
                        <Message
                          type="error"
                          size="small"
                          className={"error_message"}
                        >
                          {msg}
                        </Message>
                      )}
                    </ErrorMessage>
                  ) : null}
                </div>

                <div className={"field"}>
                  <label htmlFor="email">Email</label>
                  <Field
                    label="Email"
                    name="email"
                    type="text"
                    component={MyInput}
                    // error={errors.email && touched.email}
                  />
                  {errors.email && touched.email ? (
                    <ErrorMessage name="email">
                      {(msg: string) => (
                        <Message
                          type="error"
                          size="small"
                          wrapped
                          className={"error_message"}
                        >
                          {msg}
                        </Message>
                      )}
                    </ErrorMessage>
                  ) : null}
                </div>

                <div className={"register_item"}>
                  <label htmlFor="password">Hasło</label>
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={MyInput}
                    // error={errors.password && touched.pawssword}
                  />
                  {errors.password && touched.pawssword ? (
                    <ErrorMessage name="password">
                      {(msg: string) => (
                        <Message
                          type="error"
                          size="small"
                          wrapped
                          className={"error_message"}
                        >
                          {msg}
                        </Message>
                      )}
                    </ErrorMessage>
                  ) : null}
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
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AccountData;
