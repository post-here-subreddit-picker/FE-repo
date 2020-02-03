import React, { useState } from 'react';
import axios from 'axios'

export default function Login() {

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const login = e => {
        e.preventDefault();
        axios
            .post("", credentials)
            .then(res => {
                console.log("This is the API response", res)
                localStorage.setItem("token", res.data.payload)
                props.history.push("/home")
            })
            .catch(err => console.log("An error while trying to log in", err))
    };
    return (
        <div>
            
        </div>
    )
}
