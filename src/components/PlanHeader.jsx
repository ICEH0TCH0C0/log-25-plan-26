import React from 'react';
import { DayPlanHeader, DayPlanBtnContainer } from '../pages/DetailPage.styled';
import { PageTitle, BaseInput, BaseButton } from '../commonStyled/common.styled';

const PlanHeader = ({ date, searchTerm, setSearchTerm }) => {
    return (
        <DayPlanHeader>
            <PageTitle style={{fontSize: '22px', marginBottom: 0}}>{date} 일정</PageTitle>
            
            <BaseInput 
                type="text" 
                placeholder="일정 제목 검색..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '40%', marginBottom: 0 }} 
            />
            
            <DayPlanBtnContainer>
                <BaseButton onClick={() => window.history.back()}>뒤로가기</BaseButton>
            </DayPlanBtnContainer>
        </DayPlanHeader>
    );
};

export default PlanHeader;