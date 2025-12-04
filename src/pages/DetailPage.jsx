import React from 'react'
import { DayPlanbackBtn, DayPlanContainer, DayPlanContent, DayPlanHeader, DayPlanItem, DayPlanTitle } from './DetailPage.styled'
import { useParams } from 'react-router-dom'
import { Strong } from '../commonStyled/common.styled'

const DetailPage = () => {
  const { date } = useParams();
  return (
    <DayPlanContainer>
      <DayPlanHeader>
        <DayPlanTitle>Detail Page : {date}</DayPlanTitle>
        <DayPlanbackBtn onClick={() => window.history.back()}>뒤로가기</DayPlanbackBtn>
      </DayPlanHeader>
      <DayPlanContent>
        <DayPlanItem><Strong>일정1</Strong></DayPlanItem>
      </DayPlanContent>
    </DayPlanContainer>
  )
}

export default DetailPage