import React, {useState} from 'react'
import styled from "styled-components"

//styles




export default function Home() {

    const [newPost, setNewPost] = useState({
        title: "",
        body: ""
    });
    const [pastPosts, setpastPosts] = useState([]);

    const handleChange = e => {
        setNewPost({
            ...newPost,
            [e.target.name]: [e.target.value]
        })
    }
    return (
        <div>
            <h1>Welcome to the subreddit selector </h1>
            <input
             type="text"
             name="title"
             placeholder="Title"
             value={newPost.title}
             onChange={handleChange}
             />
            <textarea
            type="text"
            name="redditPost"
            placeholder="Write your post here"
            value={newPost.body}
            onChange={handleChange}
            rows="6"
            cols="50"
            />

        </div>
    )
}
