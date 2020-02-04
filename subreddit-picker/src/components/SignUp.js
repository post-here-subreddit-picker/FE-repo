import React, {useState, useEffect} from 'react'
import {withFormik, Form, Field} from "formik"
import axios from "axios"
import * as Yup from 'yup'
import styled from "styled-components"
import {Link} from "react-router-dom"

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
    background:none;
    outline:none;
    border-bottom: 1px solid white;
    color:white;
    width:200px;

    ::placeholder{
        color:white;
    }
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
    transition: all 0.3s ease-in;
    cursor:pointer;
  }
`

const FormContainer = styled.div`
    width:500px;
    margin:auto;
    border-radius: 15px;
    margin-bottom:220px;
    background: #0079d3;
    border:1px solid white;
    box-shadow: 10px 8px 20px #2b2b2b7c;

    h2{
        font-size:2.2rem;
        font-family: 'Poppins:600', sans-serif;
        font-weight: bold;
        color:white;
        text-transform:uppercase;
        letter-spacing:2px;
        font-weight:400;
    }
`


function SignUp({ values, errors, touched, state, history}) {

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    return (
        <FormContainer>
            <h2>Sign Up</h2>
            <FormStyle>
                    <label>
                        Email
                        <Inputs 
                        className="inputs"
                        type="text"
                        name="email" 
                        placeholder="email address"
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
                        autoComplete="off"
                        />
                        {touched.password && errors.password && (<p>{errors.password}</p>)}
                    </label>

                    <Button type="submit">Sign Up</Button>
                    <Link className="linktologin" to={'/'}>Already have an account?</Link>
                </FormStyle>

        </FormContainer>
    )
}

//validation setup
const FormikSignUp = withFormik({
    mapPropsToValues(email, password){
        return{
            email: "",
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
}) (SignUp)



export default FormikSignUp
