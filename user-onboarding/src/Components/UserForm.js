import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = props => {
  const { status, touched, errors } = props;

  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div>
      <Form>
        <h1>User Onboarding</h1>
        <Field name="name" placeholder="name" />

        {touched.name && errors.name ? (
          <span className="error">{errors.name}</span>
        ) : null}

        <Field name="email" placeholder="email" />

        {touched.email && errors.email ? (
          <span className="error">{errors.email}</span>
        ) : null}

        <Field name="password" placeholder="password" />

        {touched.password && errors.password ? (
          <span className="error">{errors.password}</span>
        ) : null}

        <label className="tos" htmlFor="tos">Read the TOS?:</label>

        <Field  className="checkbox" type="checkbox" name="tos" />

        {touched.tos && errors.tos ? (
          <span className="error">{errors.tos}</span>
        ) : null}

        <button className="submit" type="submit">Add User!</button>
      </Form>

      {users.map(note => (
        <div className="note-list">
          <div className="note" key={note.id}>
            <p> Name : {note.name}</p>
            <p> Email : {note.email}</p>
            <p> Password : {note.password}</p>
            <p>{note.tos}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      tos: props.tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please Enter a Name"),
    email: Yup.string().email("Please use a valid Email"),
    password: Yup.string().min(5, "Must be at least 5 characters long"),
    tos: Yup.boolean().oneOf([true], "Must read Terms of Service to Continue")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users", values)

      .then(res => {
        console.log("success", res);
        setStatus(res.data);

        resetForm();
      })
      .catch(err => console.log(err));
  }
})(UserForm);

/*handleSubmit: (values, formikBag) => {
  formikBag.props.newUser({
    ...values,
    id: Date.now()
  });
  formikBag.setStatus("form submitting");
  formikBag.resetForm();
}*/
