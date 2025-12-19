import React from 'react';
import { DayPlanContent, DayPlanItem, Select } from '../pages/DetailPage.styled';
import { Strong } from '../commonStyled/common.styled';
import { Input } from '../pages/MyPage.styled';

const PlanList = ({ plans, editing, setEditing, categories, onUpdate, onDelete }) => {
    if (plans.length === 0) {
        return <DayPlanContent><p>등록된 일정이 없습니다.</p></DayPlanContent>;
    }

    return (
        <DayPlanContent>
            {plans.map((plan) => (
                <DayPlanItem key={plan.planNo}>
                    {editing.id === plan.planNo ? (
                        <>
                            <Strong>분류: </Strong>
                            <Select 
                                value={editing.categoryNo} 
                                onChange={(e) => setEditing({ ...editing, categoryNo: e.target.value })}
                            >
                                {categories.map(opt => (
                                    <option key={opt.categoryNo} value={opt.categoryNo}>{opt.categoryName}</option>
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
                            <button onClick={() => onUpdate(plan.planNo)}>저장</button>
                            <button onClick={() => setEditing({ id: null, title: '', content: '' })}>취소</button>
                        </>
                    ) : (
                        <>
                            <Strong>[{plan.categoryName || '기타'}] </Strong>
                            <Strong>제목: {plan.planTitle}</Strong>
                            <Strong>내용: {plan.planContent}</Strong>
                            <button onClick={() => setEditing({ id: plan.planNo, title: plan.planTitle, content: plan.planContent, categoryNo: plan.categoryNo || '1' })}>수정</button>
                            <button onClick={() => onDelete(plan.planNo)}>삭제</button>
                        </>
                    )}
                </DayPlanItem>
            ))}
        </DayPlanContent>
    );
};

export default PlanList;