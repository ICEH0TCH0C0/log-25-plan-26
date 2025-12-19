import React from 'react';
import { DayPlanContent, DayPlanItem } from '../pages/DetailPage.styled';
import { Strong, BaseInput, BaseSelect, BaseButton } from '../commonStyled/common.styled';

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
                            <BaseSelect 
                                value={editing.categoryNo} 
                                onChange={(e) => setEditing({ ...editing, categoryNo: e.target.value })}
                                style={{alignItems: 'flex-end', marginBottom: '5px'}}
                            >
                                {categories.map(opt => (
                                    <option key={opt.categoryNo} value={opt.categoryNo}>{opt.categoryName}</option>
                                ))}
                            </BaseSelect><br />
                            <Strong>제목: </Strong>
                            <BaseInput 
                                type="text" 
                                value={editing.title} 
                                onChange={(e) => setEditing({ ...editing, title: e.target.value })} 
                                placeholder="일정 제목" 
                                style={{alignItems: 'flex-end', marginBottom: '5px'}}
                            /><br />
                            <Strong>내용: </Strong>
                            <BaseInput 
                                type="text" 
                                value={editing.content} 
                                onChange={(e) => setEditing({ ...editing, content: e.target.value })} 
                                placeholder="일정 내용"
                                style={{alignItems: 'flex-end', marginBottom: '5px'}}
                            />
                            <BaseButton style={{alignItems: 'flex-end', marginBottom: '5px'}} onClick={() => onUpdate(plan.planNo)}>저장</BaseButton>
                            <BaseButton style={{alignItems: 'flex-end', marginBottom: '5px'}} onClick={() => setEditing({ id: null, title: '', content: '' })}>취소</BaseButton>
                        </>
                    ) : (
                        <>
                            <Strong>[{plan.categoryName || '기타'}] </Strong>
                            <Strong>제목: {plan.planTitle}</Strong>
                            <Strong>내용: {plan.planContent}</Strong>
                            <BaseButton onClick={() => setEditing({ id: plan.planNo, title: plan.planTitle, content: plan.planContent, categoryNo: plan.categoryNo || '1' })}>수정</BaseButton>
                            <BaseButton onClick={() => onDelete(plan.planNo)}>삭제</BaseButton>
                        </>
                    )}
                </DayPlanItem>
            ))}
        </DayPlanContent>
    );
};

export default PlanList;