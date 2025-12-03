import styled from 'styled-components'

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  text-align: center;
  background-color: #f8f9fa;
  border: 1px solid #333;
border-radius: 8px;
`

export const ErrorTitle = styled.h1`
  font-size: 32px;
  color: #dc3545;
  margin-bottom: 16px;
`

export const ErrorMessage = styled.p`
  font-size: 18px;
  color: #6c757d;
  margin-bottom: 24px;
`

export const HomeButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`