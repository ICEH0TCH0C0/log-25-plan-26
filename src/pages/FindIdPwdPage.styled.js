import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const FindContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 0px;
    gap: 30px;
    border-radius: 8px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #333;
`

export const FindBox = styled.div`
    border-radius: 8px;
    background-color: #f8f9fa;
    width: 400px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 15px;
`

export const FindTitle = styled.h2`
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin: 0 0 10px 0;
    text-align: center;
`

export const FindInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`

export const FindButton = styled.button`
    padding: 10px 15px;
    font-size: 16px;
    color: white;
    background-color: #3b3b3b;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #505050;
    }
`

export const BackToLoginLink = styled(Link)`
    font-size: 16px;
    color: #333;
    text-decoration: none;
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
    padding: 6px 12px;

    &:hover {
        color: #b6bee4ff;
    }
`