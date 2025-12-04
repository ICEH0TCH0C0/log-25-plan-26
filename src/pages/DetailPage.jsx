import React, { useState, useMemo } from 'react'
import { DayPlanbackBtn, DayPlanBtnContainer, DayPlanContainer, DayPlanContent, DayPlanHeader, DayPlanItem, DayPlanTitle, SearchInput } from './DetailPage.styled'
import { useParams } from 'react-router-dom'
import { Strong } from '../commonStyled/common.styled'
import { Input } from './MyPage.styled'
import { useUser } from '../customHooks/UserContext'

const DetailPage = () => {
  const { date } = useParams();
  const { currentUser, addPlan, updatePlan, deletePlan } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  // 수정 중인 일정의 ID, 제목, 내용을 관리하는 상태
  const [editing, setEditing] = useState({ id: null, title: '', content: '' });
  
  // 새로 추가할 일정의 제목, 내용을 관리하는 상태
  const [newPlan, setNewPlan] = useState({ title: '', content: '' });

  const handleAddPlan = () => {
    if (!newPlan.title.trim() || !newPlan.content.trim()) {
      alert('일정 제목과 내용을 모두 입력해주세요.');
      return;
    }
    addPlan(date, newPlan);
    setNewPlan({ title: '', content: '' }); // 입력창 초기화
    alert('추가되었습니다.');
  }

  const handleUpdatePlan = (planId) => {
    if (!editing.title.trim() || !editing.content.trim()) {
      alert('수정할 제목과 내용을 모두 입력해주세요.');
      return;
    }
    // editing 객체에서 title과 content만 포함하는 새로운 객체를 생성합니다.
    const updatedData = {
      title: editing.title,
      content: editing.content
    };
    updatePlan(planId, updatedData);
    setEditing({ id: null, title: '', content: '' }); // 수정 모드 종료
    alert('수정되었습니다.');
  }

  const handleDeletePlan = (planId) => {
    deletePlan(planId);
  }

  const filteredPlans = useMemo(() => {
    const plansOnDate = currentUser?.userPlan?.filter(plan => plan.date === date) || [];

    if (searchTerm === '') return plansOnDate;

    return plansOnDate.filter(plan => plan.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [currentUser, date, searchTerm])

  return (
    <DayPlanContainer>
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
      <DayPlanContent>
        {filteredPlans.length > 0 ? filteredPlans.map((plan) => (
          <DayPlanItem key={plan.id}>
            {editing.id === plan.id ? (
              <>
                <Strong>제목: </Strong><Input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="일정 제목" /><br />
                <Strong>내용: </Strong><Input type="text" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} placeholder="일정 내용" />
                <button onClick={() => handleUpdatePlan(plan.id)}>저장</button>
                <button onClick={() => setEditing({ id: null, title: '', content: '' })}>취소</button>
              </>
            ) : (
              <>
                <Strong>제목: {plan.title}</Strong>
                <Strong>내용: {plan.content}</Strong>
                <button onClick={() => setEditing({ id: plan.id, title: plan.title, content: plan.content })}>수정</button>
                <button onClick={() => handleDeletePlan(plan.id)}>삭제</button>
              </>
            )}
          </DayPlanItem>
        )) : <p>등록된 일정이 없습니다.</p>}
        <DayPlanItem>
          <Strong>새 일정 추가</Strong><br />
          <Input type="text" value={newPlan.title} onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })} placeholder="일정 제목" /><br />
          <Input type="text" value={newPlan.content} onChange={(e) => setNewPlan({ ...newPlan, content: e.target.value })} placeholder="일정 내용" />
          <button onClick={handleAddPlan}>추가하기</button>
        </DayPlanItem>
      </DayPlanContent>
    </DayPlanContainer>
  )
}

export default DetailPage