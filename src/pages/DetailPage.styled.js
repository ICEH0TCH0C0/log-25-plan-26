import styled from "styled-components";

export const DayPlanHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
`

export const DayPlanBtnContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const DayPlanContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`

export const DayPlanItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    /* 입력 폼이 내부에 있을 때 스타일 조정 */
    .input-group {
        display: flex;
        gap: 10px;
        align-items: center;
    }
`