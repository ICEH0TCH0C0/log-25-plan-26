import { Link } from "react-router-dom";
import styled from "styled-components";

export const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: auto; 
    min-height: 40vh;
    width: 50vw;
    background: #f8f9fa;
    padding: 24px 0; 
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #333;
`

export const SignupTitleH1 = styled.h1`
    font-size: 26px;
    font-weight: bold;
    color: #333;
    margin-bottom: 24px;
`

export const SignupForm = styled.div`
    display: flex;
    flex-direction: column;
`

export const SignupInput = styled.input`
    padding: 10px;
    margin-bottom: 8px; 
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`

export const BackToLogin = styled.div`
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
    padding: 6px 12px;
    margin-top: 12px;
`

export const SignupBtn = styled.button`
    margin-top: 12px;
    display: flex;
    width: auto;
    justify-content: center;
    background: #3B3B3B;
    border: none;
    color: #fff;
    font-size: 16px;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #505050;
    }
`

export const ATag = styled(Link)`
    text-decoration: none;
    color: #333;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        color: #b6bee4ff;
    }
`