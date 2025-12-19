import styled from "styled-components";
// 필요한 경우 BaseCard 등을 상속받아 스타일 확장 가능

export const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px; /* 폼 너비 제한 */
`

export const SignupAndIdPwdFind = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    border-top: 1px solid #ccc;
    padding-top: 20px;
    margin-top: 10px;
`