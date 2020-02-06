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
export default function NewSignup(props) {
    const {handleSubmit, register, errors} = useForm();
    const onSubmit = values => {
        console.log("These are the values being passed to the backend", values)
        axios.post("http://post-here3.herokuapp.com/api/auth/register", values)
            .then(res => {
                console.log("successful sign in ", res)
                props.history.push("/")
            })
            .catch(err => {
                console.log("An error occurred while trying to log in", err)
            })
    }


    return (
        <FormContainer>
            <h2>Sign Up here</h2>
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <Inputs 
            type="text"
            name="username"
            placeholder="Username"
            ref={register({
                required: true,
            minLength: 4,
            maxLength: 14
            })}
        />
        {errors.username && errors.username.message}

        <Inputs 
            type="password"
            name="password"
            placeholder="Password"
            ref={register({
                required: true,
                minLength: {
                    value: 5,
                    message: "The password must be at least 5 characters long"
                },
                // pattern: {
                //     value:  /A-Z 0-9/i,
                //     message: "Only alphanumeric characters can be used in the password"
                // }
            })}
        />
        {errors.password && errors.password.message}

        <Button type="submit">Log in</Button>
        </FormStyle>
            <Link to={'/sign-up'}>Already have an account? Log in here</Link>
        </FormContainer>
    )

}
