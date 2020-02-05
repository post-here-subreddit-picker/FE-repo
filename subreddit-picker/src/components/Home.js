import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import {axioswithAuth, axiosWithAuth} from '../utils/AxiosWithAuth'
import axios from "axios"
import {withFormik, Form, Field} from "formik"
import * as Yup from "yup"


//styles
const FormDiv = styled.div`
width:600px;
  margin:auto;
  display:flex;
  flex-direction:column;
  margin-bottom:40px;

  h1{
    color:#ffffff;
    font-weight:400;
    font-family: 'Poppins:600', sans-serif;
    text-transform: uppercase;
    letter-spacing: 4px;
  }
`

const FormStyle = styled(Form)`
    display:flex;
    flex-direction: column;
    padding:20px;
    align-items: center;
    width:100%;
`
const Input = styled(Field)`
  color:white;
  font-size: 1rem;
  border-radius: 5px;
  line-height: 22px;
  background:none;
  outline:none;
  border:2px solid #0079d3;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width:100%;
  box-sizing: border-box;

  :focus { 
  border:2px solid white;
  }

  ::placeholder{
        color:white;
    }
`

const Label = styled.label`
  width:100%;
`

const TextArea = styled(Field)`
  height: 150px;
  line-height: 150%;
  resize:vertical;
  color:white;
  font-weight:500;
  font-size: 1rem;
  border-radius: 5px;
  line-height: 22px;
  background:none;
  outline:none;
  border:2px solid #0079d3;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width:100%;
  box-sizing: border-box;

  :focus { 
  border:2px solid white; 
  }

  ::placeholder{
        color:white;
        font-weight:400;
    
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



function Home({values, errors, touched, status}) {

  useEffect(() => {
    axiosWithAuth()
        .get("users")
        .then(res => {
          console.log("this is the data from the user get request", res)
        })
        .catch(err => {
          console.log("An error occurred while trying to retrieve the user data", err)
        })
  }, [])

    const [newPost, setNewPost] = useState({
        title: "",
        body: ""
    });

    const [pastPosts, setPastPosts] = useState([]);

    const handleChange = e => {
        setNewPost({
            ...newPost,
            [e.target.name]: [e.target.value]
        })
    }

    const submissionHandler = e => {
      e.preventDefault();
      axiosWithAuth()
        .post(`posts/`, newPost)
        .then(res => {
          console.log("This should display the post that we want to send to the backend", newPost)
        })
        .catch(err => {
          console.log("An error occurred while trying to post", err)
        })
    }

    return (
        <FormDiv>
            <FormStyle>
            <h1>Welcome to PostHere</h1>
            
            <Label>
              <Input type="text" name="title" placeholder="Title"/>
              {touched.title && errors.title && (<p>{errors.title}</p>)}
            </Label>

             <Label>
                <TextArea component="textarea" type="text" name="body" placeholder="Post" rows="6" cols="50"/>
                {touched.body && errors.body && (<p>{errors.body}</p>)}
            </Label>

            <Button type="submit">Submit</Button>
            </FormStyle>
        </FormDiv>
    )
}


//validation setup
const FormikHome = withFormik({
  mapPropsToValues(title, body){
      return{
          title: "",
          body: ""
      }
  },
  //validation set up with error messages
  validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      body: Yup.string().required("Content is required"),
  }),
  
}) (Home)
export default FormikHome