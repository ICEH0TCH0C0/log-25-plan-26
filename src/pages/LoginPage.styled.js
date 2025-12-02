import { Link } from "react-router-dom";
import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 40vh;
    width: 50vw;
    background: #b3c0d1ff;
`

export const LoginTitleH1 = styled.h1`
    font-size: 26px;
    font-weight: bold;
    color: #333;
`

export const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #333;
    padding: 12px;
`

export const LoginInput = styled.input`
    padding: 6px;
`

export const SignupAndIdPwdFind = styled.div`
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
    margin-top: 12px;
    padding: 6px;
`

export const LoginBtn = styled.button`
    margin-top: 12px;
    display: flex;
    width: auto;
    justify-content: center;
    background: #3B3B3B;
    border: none;
    color: #fff;
    font-size: 16px;
    padding: 6px 12px;
    cursor: pointer;

    &:hover {
        background: #505050;
    }

`

export const ATag = styled(Link)`
    text-decoration: none;
    color: #333;
    cursor: pointer;

    &:hover {
        color: #fff;
    }
`