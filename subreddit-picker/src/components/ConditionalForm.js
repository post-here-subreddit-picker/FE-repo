import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import styled from "styled-components"
import {axiosWithAuth} from '../utils/AxiosWithAuth'
import { useForm } from 'react-hook-form'
import {deletePost, setPastPost} from '../actions'

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
export default function ConditionalForm(props){
    const {handleSubmit, register, errors, reset} = useForm();





return (
  <FormDiv onSubmit={handleSubmit(props.updateHandler)}>
  <FormStyle>
    <Label>
      <Input 
        type="text" 
        name="headline" 
      placeholder="Title"
        ref={register({
            required: true,
            minLength: 4
              })
          }
        />
    </Label>
    <Label>
      <TextArea 
        component="textarea" 
        type="content" 
        name="content" 
        placeholder="Post" rows="6" cols="50"
        ref={register({
      required: true,
      minLength: 10
      })
        }
      />
    </Label>
    <Button type="submit">Update post</Button>
    <Button onClick={() => props.setEditing(false)}>Cancel</Button>
  </FormStyle>
</FormDiv>
)
    }