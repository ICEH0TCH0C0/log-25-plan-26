import React from 'react';
import { DayPlanHeader, DayPlanTitle, SearchInput, DayPlanBtnContainer, DayPlanbackBtn } from '../pages/DetailPage.styled';

const PlanHeader = ({ date, searchTerm, setSearchTerm }) => {
    return (
        <DayPlanHeader>
            <DayPlanTitle>{date} 일정</DayPlanTitle>
            <SearchInput 
                type="text" 
                placeholder="일정 제목 검색..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DayPlanBtnContainer>
                <DayPlanbackBtn onClick={() => window.history.back()}>뒤로가기</DayPlanbackBtn>
            </DayPlanBtnContainer>
        </DayPlanHeader>
    );
};

export default PlanHeader;