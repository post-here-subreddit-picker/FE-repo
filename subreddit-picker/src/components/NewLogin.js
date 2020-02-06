import React from "react";
import {useForm } from "react-hook-form"
import axios from "axios"
import styled from "styled-components"
import { Link } from "react-router-dom";

//styles
const FormStyle = styled.form`
    display:flex;
    flex-direction: column;
    padding:20px;
    align-items: center;
`
const Inputs = styled.input`
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

const Login = () => {
    const {handleSubmit, register, errors} = useForm();
    const onSubmit = values => {
        console.log("These are the values being passed to the backend", values)
        axios.post("http://post-here3.herokuapp.com/api/auth/login", values)
            .then(response => {
                console.log("successful log in ", response)
                localStorage.setItem("token", response.data.password)
                props.history.push("/home")
            })
            .catch(err => {
                console.log("An error occurred while trying to log in", error)
            })
    }
};

return (
    <FormContainer>
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <Inputs 
            type="text"
            name="username"
            placeholder="Username"
            ref={register({
                required: true,
            minLength: 4,
            maxLength: {
                value: 15,
                message: "The username cannot exceed 15 characters"
            }
            })}
        />
        {errors.username && errors.username.message}

        <Inputs 
            name="password"
            type="password"
            placeholder="Password"
            ref={register({
                required: true,
                minLength: {
                    value: 5,
                    message: "The password must be at least 5 characters long"
                },
                pattern: {
                    value:  /A-Z 0-9/i,
                    message: "Only alphanumeric characters can be used in the password"
                }
            })}
        />
        {errors.password && errors.password.message}

        <Button type="submit">Sign Up</Button>
        </FormStyle>
        <Link to={'/sign-up'}>Create your account here</Link>
    </FormContainer>
)

export default Login