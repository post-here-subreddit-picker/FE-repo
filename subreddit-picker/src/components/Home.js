import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import styled from "styled-components"
import {axiosWithAuth} from '../utils/AxiosWithAuth'
import { useForm } from 'react-hook-form'
import axios from "axios"
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

  h2{
    color:#ffffff;
    font-weight:400;
    font-family: 'Poppins:600', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top:0;
  }
`

const FormStyle = styled.form`
    display:flex;
    flex-direction: column;
    padding:20px;
    align-items: center;
    width:100%;

    p{
        color:white;
        font-size:.8rem;
    }
`
const Input = styled.input`
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

const TextArea = styled.textarea`
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



 function Home(props) {
  const {handleSubmit, register, errors} = useForm();
  const [userId, setUserId] = useState(null)
  const [newPost, setNewPost] = useState({
    headline: "",
    content: ""
  });
  const [pastPosts, setPastPosts] = useState([
    { headline: "",
      content: "" }
  ]);

// 

  useEffect(() => {
    axiosWithAuth()
        .get("users/")
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


// gets posts by specific user

    useEffect(() => {
      console.log("This is user id in the second use effect hook", userId)
      if(userId) {
      axiosWithAuth()
            .get(`users/${userId}/posts`)
            .then(res => {
              console.log("this is the response when we look for a specific users past posts", res)
              setPastPosts(res.data)
            })
            .catch(error => {
              console.log(error)
            })
          }
    }, [userId])

    const handleChange = e => {
        setNewPost({
            ...newPost,
            [e.target.name]: [e.target.value]
        })
    }


// 

    const submissionHandler = values => {
      console.log("This is the new post before being sent to the backend", values)
      axiosWithAuth()
        .post(`posts/${userId}`, values)
        .then(res => {
          console.log("This should display the post that we want to send to the backend", values)
          console.log("This is the response from the post post request", res)
        })
        .catch(err => {
          console.log("An error occurred while trying to post", err)
        })
    }
    console.log(`These are the past posts for the user ${props.username}`, pastPosts)


    return (
        <FormDiv onSubmit={handleSubmit(submissionHandler)}>
            <FormStyle>
            <h1>Welcome to PostHere</h1>
            <h2>The Subreddit Suggester</h2>
            <Label>
              <Input 
              type="text" 
              name="headline" 
              placeholder="Title"
              ref={register({
                required: true,
                minLength: {
                  value: 4,
                  message: "Title must contain 4 or more characters"
              },
              })
              }
              />
              <p>{errors.headline && errors.headline.message}</p>
            </Label>

             <Label>
                <TextArea 
                component="textarea" 
                type="content" 
                name="content" 
                placeholder="Post" rows="6" cols="50"
                ref={register({
                  required: true,
                  minLength: {
                    value: 10,
                    message: "Post must contain 10 or more characters"
                },
                 })

                }
                />
                <p>{errors.content && errors.content.message}</p>
            </Label>

            <Button type="submit">Submit</Button>
            </FormStyle>

            <div className="card-container">
                <h2>Previous Posts</h2>
                <div className="cards">
                    {pastPosts.map(post =>{
                        return (
                        <div className="eachcard">
                            <h3>{post.headline}</h3>
                            <p>{post.content}</p>
                        </div>
                    )
                    })}
                </div>
            </div>
        </FormDiv>
    )
};


//validation
const mapStateTOProps = state => {
  return {
    username: state.username
  }
}

export default connect(
  mapStateTOProps,
  {}
)(Home);


