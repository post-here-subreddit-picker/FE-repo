import React, { useState } from 'react';
import {withFormik, Form, Field} from "formik"
import {Link} from "react-router-dom"
import * as Yup from "yup"
import axios from 'axios'
import styled from "styled-components"

//styles
const FormStyle = styled(Form)`
    display:flex;
    flex-direction: column;
    padding:20px;
    align-items: center;
`
const Inputs = styled(Field)`
    margin:10px;
    padding:7px;
    display: flex;
    border-style: none;
    border-radius: 3px;
`

const Button = styled.button`
   color:white;
  border-style: none;
  border-radius: 8px;
  background:#FF4301;
  padding:5px 15px;
  margin:20px;
  font-size:1rem;

  &:hover{
    background:white;
    color:#FF4301;
    transition: all 0.3s ease-in
  }
`

const FormContainer = styled.div`
    width:500px;
    margin:auto;
    border-radius: 15px;
    margin-top:220px;
    background:#0079d3;
    border:1px solid white;
    box-shadow: 10px 8px 20px #2b2b2b7c;
`


function Login({ values, errors, touched, state, history}) {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <FormContainer>
            <h2>Login</h2>
            <FormStyle autoComplete="off">
                    <label>
                        Email
                        <Inputs 
                        className="inputs"
                        type="text"
                        name="email" 
                        placeholder="email address"
                        value={credentials.email}
                        onChange={handleChange}
                        autoComplete="off"
                          />
                        {touched.email && errors.email && (<p>{errors.email}</p>)}
                    </label>

                    <label>
                        Password
                        <Inputs 
                        className="inputs" 
                        type="password" 
                        name="password" 
                        placeholder="password"
                        value={credentials.password}
                        onChange={handleChange}
                        autoComplete="off"
                        />
                        {touched.password && errors.password && (<p>{errors.password}</p>)}
                    </label>

                    <Button type="submit">Login</Button>
                    <Link className="linktologin" to={'/sign-up'}>Create an account</Link>
                </FormStyle> 
        </FormContainer>
    )
}

//validation setup
const FormikLogin = withFormik({
    mapPropsToValues(email, password){
        return{
            email: email || "",
            password: "",
        }
    },
    //validation set up with error messages
    validationSchema: Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
    }),
    //POSTing values submitted, to axios site
    handleSubmit(values, {setStatus, resetForm}){
        axios.post(" ", values)
        .then(response => {
            console.log("Success!", response)
            resetForm()
            setStatus(response.data)
        })
        .catch(error =>{
            console.log(error)
        })
    }
}) (Login)
export default FormikLogin