import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import {axioswithAuth, axiosWithAuth} from '../utils/AxiosWithAuth'
import axios from "axios"
//styles
const FormDiv = styled.div`
width:500px;
  margin:auto;
  border-radius: 15px;
  margin-top:220px;
  background:rgba(194, 210, 223, 0.9);
  border:1px solid white;
  box-shadow: 10px 8px 20px #2b2b2b7c;
`

const FormStyle = styled.form`
    display:flex;
    flex-direction: column;
    padding:20px;
    align-items: center;
    width:100%;
`
const Input = styled.input`
  margin:10px;
  padding:7px;
  display: flex;
  border-style: none;
  border-radius: 3px;
`
const TextArea = styled.textarea`
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



export default function Home() {

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
            <h1>Welcome to the subreddit selector </h1>
            <FormStyle>
            <Input
             type="text"
             name="title"
             placeholder="Title"
             value={newPost.title}
             onChange={handleChange}
             />
            <TextArea
            type="text"
            name="redditPost"
            placeholder="Write your post here"
            value={newPost.body}
            onChange={handleChange}
            rows="6"
            cols="50"
            />
            <Button>Submit</Button>
            </FormStyle>
        </FormDiv>
    )
}
