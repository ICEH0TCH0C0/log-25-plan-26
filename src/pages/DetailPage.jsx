import React from 'react'
import { DayPlanbackBtn, DayPlanBtnContainer, DayPlanContainer, DayPlanContent, DayPlanHeader, DayPlanItem, DayPlanTitle } from './DetailPage.styled'
import { useParams } from 'react-router-dom'
import { Strong } from '../commonStyled/common.styled'
import { Input } from './MyPage.styled'

const DetailPage = () => {
  const { date } = useParams();

  const handleUpdate = () => {
    alert('수정되었습니다.');
  }

  return (
    <DayPlanContainer>
      <DayPlanHeader>
        <DayPlanTitle>Detail Page : {date}</DayPlanTitle>
        <DayPlanBtnContainer>
          <DayPlanbackBtn>추가하기</DayPlanbackBtn>
          <DayPlanbackBtn onClick={handleUpdate}>수정하기</DayPlanbackBtn>
          <DayPlanbackBtn onClick={() => window.history.back()}>뒤로가기</DayPlanbackBtn>
        </DayPlanBtnContainer>
      </DayPlanHeader>
      <DayPlanContent>
        <DayPlanItem><Strong>일정1 : <Input type="text" /></Strong></DayPlanItem>
      </DayPlanContent>
    </DayPlanContainer>
  )
}

export default DetailPage