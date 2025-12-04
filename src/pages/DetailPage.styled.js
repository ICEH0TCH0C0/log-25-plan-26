import styled from "styled-components";

export const DayPlanContainer = styled.div`
    width: 90vw;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const DayPlanHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 4px;
`

export const DayPlanTitle = styled.h2`
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
`

export const DayPlanbackBtn = styled.button`
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

export const DayPlanContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 20px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const DayPlanItem = styled.div`
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