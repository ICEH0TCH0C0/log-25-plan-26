import React, { useState, useEffect } from 'react'
import { DayPlanbackBtn, DayPlanBtnContainer, DayPlanContainer, DayPlanContent, DayPlanHeader, DayPlanItem, DayPlanTitle, SearchInput } from './DetailPage.styled'
import { useParams } from 'react-router-dom'
import { Strong } from '../commonStyled/common.styled'
import { Input } from './MyPage.styled'
import { useUser } from '../customHooks/UserContext'
import { Select } from './'

const DetailPage = () => {
  const { date } = useParams();
  const { currentUser, addPlan, updatePlan, deletePlan } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  const [editing, setEditing] = useState({ id: null, title: '', content: '', categoryNo: '1' });
  const [newPlan, setNewPlan] = useState({ title: '', content: '', categoryNo: '1' });
  const [categories, setCategories] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category/all');
        if (res.ok) {
          const data = await res.json();
          setCategories(data); // DB에서 가져온 데이터로 설정
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // 함수를 useEffect 안에서 정의합니다.
    const fetchPlans = async () => {
      if (!currentUser) return;

      try {
        const response = await fetch(
          `/api/plan/search?userNo=${currentUser.userNo}&date=${date}&keyword=${searchTerm}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setPlans(data);
        }
      } catch (error) {
        console.error("검색 에러:", error);
      }
    };

    // 정의한 함수를 바로 실행합니다.
    fetchPlans();

  }, [currentUser, date, searchTerm]); // 의존성 배열은 그대로 유지

  const handleAddPlan = () => {
    if (!newPlan.title.trim() || !newPlan.content.trim()) {
      alert('일정 제목과 내용을 모두 입력해주세요.');
      return;
    }
    addPlan(date, newPlan);
    setNewPlan({ title: '', content: '', categoryNo: '1' }); // 입력창 초기화
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
      content: editing.content,
      categoryNo: editing.categoryNo
    };
    updatePlan(planId, updatedData);
    setEditing({ id: null, title: '', content: '' }); // 수정 모드 종료
    alert('수정되었습니다.');
  }

  const handleDeletePlan = (planId) => {
    deletePlan(planId);
  }


  return (
    <DayPlanContainer>
      {/* 헤더 및 검색창 영역 */}
      <DayPlanHeader>
        <DayPlanTitle>{date} 일정</DayPlanTitle>
        <SearchInput 
          type="text" 
          placeholder="일정 제목 검색..." 
          value={searchTerm}
          // 검색어를 입력하면 searchTerm이 바뀌고 -> useEffect가 실행되어 서버에 다시 요청함
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DayPlanBtnContainer>
          <DayPlanbackBtn onClick={() => window.history.back()}>뒤로가기</DayPlanbackBtn>
        </DayPlanBtnContainer>
      </DayPlanHeader>

      {/* 컨텐츠(일정 목록) 영역 */}
      <DayPlanContent>
        {/* [핵심 변경] filteredPlans 대신 서버에서 받아온 state인 'plans'를 사용합니다 */}
        {plans.length > 0 ? plans.map((plan) => (
          <DayPlanItem key={plan.planNo}>
            {/* 수정 모드일 때 */}
            {editing.id === plan.planNo ? (
              <>
              <Strong>분류: </Strong>
                <Select 
                    value={editing.categoryNo} 
                    onChange={(e) => setEditing({ ...editing, categoryNo: e.target.value })}
                >
                    {categories.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </Select><br />
                <Strong>제목: </Strong>
                <Input 
                  type="text" 
                  value={editing.title} 
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })} 
                  placeholder="일정 제목" 
                /><br />
                <Strong>내용: </Strong>
                <Input 
                  type="text" 
                  value={editing.content} 
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })} 
                  placeholder="일정 내용" 
                />
                <button onClick={() => handleUpdatePlan(plan.planNo)}>저장</button>
                <button onClick={() => setEditing({ id: null, title: '', content: '' })}>취소</button>
              </>
            ) : (
              /* 일반 보기 모드일 때 */
              <>
                <Strong>[{plan.categoryName || '기타'}] </Strong>
                <Strong>제목: {plan.planTitle}</Strong>
                <Strong>내용: {plan.planContent}</Strong>
                <button onClick={() => setEditing({ id: plan.planNo, title: plan.planTitle, content: plan.planContent, categoryNo: plan.categoryNo || '1' })}>수정</button>
                <button onClick={() => handleDeletePlan(plan.planNo)}>삭제</button>
              </>
            )}
          </DayPlanItem>
        )) : (
          <p>등록된 일정이 없습니다.</p>
        )}

        {/* 새 일정 추가 입력칸 (기존과 동일) */}
        <DayPlanItem>
          <Strong>새 일정 추가</Strong><br />
          <Select 
            value={newPlan.categoryNo} 
            onChange={(e) => setNewPlan({ ...newPlan, categoryNo: e.target.value })}
          >
             {/* 기본값 옵션 하나 추가해주면 좋음 */}
             <option value="">선택</option> 
             
             {/* 하드코딩 배열 대신 state인 categories를 map으로 돌림 */}
             {categories.map(cat => (
                <option key={cat.categoryNo} value={cat.categoryNo}>
                    {cat.categoryName}
                </option>
             ))}
          </Select>
          <Input 
            type="text" 
            value={newPlan.title} 
            onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })} 
            placeholder="일정 제목" 
          /><br />
          <Input 
            type="text" 
            value={newPlan.content} 
            onChange={(e) => setNewPlan({ ...newPlan, content: e.target.value })} 
            placeholder="일정 내용" 
          />
          <button onClick={handleAddPlan}>추가하기</button>
        </DayPlanItem>
      </DayPlanContent>
    </DayPlanContainer>
  )
}

export default DetailPage