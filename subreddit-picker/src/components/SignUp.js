import React, {useState, useEffect} from 'react'
import {withFormik, Form, Field} from "formik"
import axios from "axios"
import * as Yup from 'yup'
import styled from "styled-components"
import {Link} from "react-router-dom"


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

function SignUp({ values, errors, touched, state}) {

    const [newUser, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    // useEffect(() => {
    //     console.log("status has hanged", status);
    //     status && setUser(newuser => [...newUser, status]);
    // }, [status])

    const handleChange = e => {
        setUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    // const onSubmit = e => {
    //     e.preventDefault();
    //     axios
    //         .post(//The post endpoint will be here when we get it  "", The post request takes the url and the new user that are being added to the server
    //         newUser)
    //         .then(res => {
    //             console.log("This is the response from the backend", res)
    //             this.history.push("/")
    //         })
    //         .catch(err => console.log("An error occurred while trying to add the new user", err));
    // };

    return (
        <FormContainer>
            <h1>Sign up here</h1>
            <FormStyle>
                <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={newUser.firstName}
                    onchange={handleChange}
                />
                <Inputs
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={newUser.lastName}
                    onchange={handleChange}
                />
                <Inputs
                    type="text"
                    name="email"
                    placeholder="email"
                    value={newUser.email}
                    onchange={handleChange}
                />
                <Inputs
                    type="text"
                    name="password"
                    placeholder="password"
                    value={newUser.password}
                    onchange={handleChange}
                />
                <Button> Create Your Account </Button>
            </FormStyle>
            <Link to={'/'}>If you already have an account click here</Link>
        </FormContainer>
    );
};

const ValidatedSignUp = withFormik ({
    mapPropsToValues({ FirstName, lastName, email, password}) {
        return{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
    },
    validationSchema: Yup.object().shape({// Yup still needs to be validated
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().email("invalid Email").required(),
        password: Yup.string().required
    }),
    handleSubmit(values, { setStatus, resetForm}) {
        console.log("Submitted values", values);
        axios
            .post(//the address of the api endpoint will go here,
                values)
            .then(res => {
                console.log("Successful post, new user registered", res);
                setStatus(res.data);
                resetForm()
    })
    .catch(err => console.log(err.response))
    }
})(SignUp);

export default SignUp
