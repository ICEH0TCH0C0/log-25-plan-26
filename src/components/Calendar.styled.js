import styled from "styled-components";

export const CalendarContainer = styled.div`
    width: 90vw;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #333;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .fc-toolbar-title {
        font-size: 1.5em;
        color: #333;
    }

    .fc-button {
        background-color: #3B3B3B !important;
        border: none !important;
    }

    /* 캘린더 내부 날짜 숫자 스타일 */
    .fc-daygrid-day-number {
        font-size: 1.2em; /* 글자 크기 1.2배 */
        color: black; /* 기본 날짜 색상 */
    }

    /* 일요일 날짜 색상 */
    .fc-day-sun .fc-daygrid-day-number {
        color: red;
    }

    /* 토요일 날짜 색상 */
    .fc-day-sat .fc-daygrid-day-number {
        color: blue;
    }
`