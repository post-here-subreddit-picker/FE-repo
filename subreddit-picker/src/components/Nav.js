import React from 'react'
import {Link} from "react-router-dom"
import styled from "styled-components"

const NavDiv = styled.div`

`

const NavBar = styled.nav`
    background:white;
    height:63px;
    display:flex;
    align-items:center;
    justify-content:space-evenly;

    a{
        text-decoration:none;
    }
`


function Nav() {
    return (
        <NavDiv>
            <NavBar>
                <Link to="/home">Home</Link>
                <Link to="/">Login</Link>
                <Link to="./sign-up">Sign Up</Link>
            </NavBar>
        </NavDiv>
    )
}

export default Nav
