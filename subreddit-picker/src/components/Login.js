import React, { useState, useEffect } from 'react';
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
`

const FormContainer = styled.div`
    width:500px;
    margin:auto;
    border-radius: 15px;
    margin-top:220px;
    background:rgba(194, 210, 223, 0.9);
    border:1px solid white;
    box-shadow: 10px 8px 20px #2b2b2b7c;
`


function Login({ values,
     errors,
     touched,
     status,
     history}) {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    // const handleChange = e => {
    //     setCredentials({
    //         ...credentials,
    //         [e.target.name]: e.target.value
    //     });
    // };

    useEffect(() => {
        console.log("status has changed", status);

        status &&
            setCredentials({
                ...credentials,
                status
            });
    }, [status])

    return (
        <FormContainer>
            <h2>Login</h2>
            <FormStyle autoComplete="off">
                    <label>
                        Username
                        <Inputs 
                        className="inputs"
                        type="text"
                        name="username" 
                        placeholder="username"
                        // value={credentials.username}
                        // onChange={handleChange}
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
                        // value={credentials.password}
                        // onChange={handleChange}
                        autoComplete="off"
                        />
                        {touched.password && errors.password && (<p>{errors.password}</p>)}
                    </label>

                    <Button type="submit">Login</Button>
                </FormStyle>
                <Link to={'/sign-up'}>Create your account here</Link>
        </FormContainer>
    )
}

//validation setup
const FormikLogin = withFormik({
    mapPropsToValues(username, password){
        return{
            username: username || "",
            password: ""
        }
    },
    //validation set up with error messages
    validationSchema: Yup.object().shape({
        username: Yup.string().required("username is required"),
        password: Yup.string().required("Password is required"),
    }),
    //POSTing values submitted, to axios site
    handleSubmit(values, {setStatus, resetForm}){
        console.log("this is values", values)
        axios.post("http://post-here3.herokuapp.com/api/auth/login", values)
        .then(response => {
            console.log("Successful log in", response)
            resetForm()
            setStatus(response.data)
            localStorage.setItem("token", response.data.token)
        })
        .catch(error =>{
            console.log(error)
        })
    }
}) (Login)
export default FormikLogin