import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import styled from "styled-components"
import {axiosWithAuth} from '../utils/AxiosWithAuth'
import {useLocalStorage} from "../hooks/useLocalStorage"
import axios from "axios"
//styles
const FormDiv = styled.div`
width:500px;
  margin:auto;
  border-radius: 15px;
  margin-bottom:220px;
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


 function Home(props) {
  // const [username, setUsername] = useLocalStorage(username, props.username)
  const [userId, setUserId] = useState(null)
  const [newPost, setNewPost] = useState({
    title: "",
    body: ""
  });
  const [pastPosts, setPastPosts] = useState([]);

  useEffect(() => {
    axiosWithAuth()
        .get("users")
        .then(res => {
          console.log("this is the data from the user get request", res)
          console.log(res.data.filter(user => {
              return user.username === props.username
          }))
          const user = res.data.filter(user => {
            return user.username === props.username
        })
          console.log("This is the id that should be set as userId", user[0].id)
          setUserId(user[0].id)
          console.log("this is used ID", userId)
        })
        .catch(err => {
          console.log("An error occurred while trying to retrieve the user data", err)
        })
  }, [])

    useEffect(() => {
      console.log("This is user id in the second use effect hook", userId)
      if(userId) {
      axiosWithAuth()
            .get(`users/${userId}/posts`)
            .then(res => {
              console.log("this is the response when we look for a specific users past posts", res)
            })
          }
    }, [userId])

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
            <h1>Welcome to the Subreddit Selector </h1>
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
};

const mapStateTOProps =state=> {
  return {
    username: state.username
  }
}

export default connect(
  mapStateTOProps,
  {}
)(Home);
