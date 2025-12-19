import styled from "styled-components";

export const MyPageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 12px;
    border-bottom: 2px solid #333;
    margin-bottom: 20px;
`

export const MyPageHeaderBtnContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const MyPageContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
`

export const MyPageItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;

    input {
        text-align: right;
        border: none;
        background: transparent;
        font-size: 16px;
        color: #555;
        &:focus {
            outline: none;
            border-bottom: 1px solid #333;
        }
    }
`

// 버튼 색상 오버라이딩 예시
export const DeleteButton = styled.button`
    padding: 8px 12px;
    color: white;
    background-color: #dc3545;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover { background-color: #c82333; }
`

export const UpdateButton = styled.button`
    padding: 8px 12px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover { background-color: #0069d9; }
`