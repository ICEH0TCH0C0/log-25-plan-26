import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const Header = styled.header`
  width: 90vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #333;
`

export const HeaderTitle = styled.h1`
  font-size: 24px;
  color: #333;
`

export const HeaderButton = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 14px;
  background-color: #3b3b3b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #505050;
  }
`