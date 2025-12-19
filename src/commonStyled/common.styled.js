import styled from "styled-components";
import { Link } from "react-router-dom";

// 1. 텍스트 관련
export const Strong = styled.strong`
    font-weight: bold;
    color: #333;
`

export const PageTitle = styled.h1`
    font-size: 26px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 24px;
`

// 2. 컨테이너 관련
// 기본 카드 스타일 (배경, 테두리, 그림자, 패딩)
export const BaseCard = styled.div`
    background-color: #f8f9fa;
    border: 1px solid #333;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
`

// 중앙 정렬 컨테이너 (로그인, 회원가입, 비밀번호 찾기 등)
export const CenteredContainer = styled(BaseCard)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50vw;
    min-height: 40vh;
    margin: 50px auto;
    gap: 20px;
`

// 와이드 컨테이너 (메인, 상세, 마이페이지 등)
export const WideContainer = styled(BaseCard)`
    width: 90vw;
    max-width: 1200px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
`

// 3. 폼 요소 관련
export const BaseInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box; /* padding이 width에 포함되도록 */
    margin-bottom: 10px;

    &:focus {
        outline: none;
        border-color: #333;
    }
`

export const BaseSelect = styled.select`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-right: 8px;
`

export const BaseButton = styled.button`
    padding: 10px 16px;
    font-size: 16px;
    color: white;
    background-color: #3b3b3b;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover {
        background-color: #505050;
    }
`

// 4. 링크 관련
export const BaseLink = styled(Link)`
    text-decoration: none;
    color: #333;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: #646cff;
    }
`