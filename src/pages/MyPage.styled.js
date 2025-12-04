import styled from "styled-components";

export const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    gap: 30px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #333;
    width: 90vw;
    max-width: 1200px;
`

export const MyPageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 4px;
    border-bottom: 1px solid #333;
`
export const MyPageHeaderBtnContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const MyPageTitle = styled.h2`
    font-size: 22px;
    font-weight: bold;
    color: #333;
    text-align: center;
`

export const MyPageContent = styled.div`
    flex: 1;
    flex-direction: column;
    width: 100%;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 20px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const MyPageItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 4px;
    border-bottom: 1px solid #333;

    &:last-child {
        border-bottom: none;
    }
`

export const MyPagebackBtn = styled.button`
    padding: 6px 12px;
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

export const MyPageDeleteBtn = styled.button`
    padding: 6px 12px;
    font-size: 16px;
    color: white;
    background-color: #dc3545;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #d8606cff;
    }
`

export const MyPageUpdateBtn = styled.button`
    padding: 6px 12px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #288ffdff;
    }
`

export const Input = styled.input`
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`