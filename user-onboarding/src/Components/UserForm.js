import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";


const UserForm = ({ errors, touches, values, status }) => {
    const [users, setUsers] = useState([])


    useEffect(() => {

        status && setUsers(users => [...users, status]);
    }, [status]);


    return (

        <div>
            <h1>User Onboarding</h1>
            <Form>
                <Field
                    type="text"
                    name="user"
                    placeholder="username"
                    values={values.user}

                />


            </Form>



        </div>
    );
    export default UserForm;