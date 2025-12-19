import React from 'react';
// [수정] DetailPage.styled에서는 레이아웃 컴포넌트만 가져옵니다. (Select 제거됨)
import { DayPlanContent, DayPlanItem } from '../pages/DetailPage.styled';
// [수정] 공통 스타일에서 필요한 입력창, 버튼, Select 등을 가져옵니다.
import { Strong, BaseInput, BaseSelect, BaseButton } from '../commonStyled/common.styled';

const PlanInputForm = ({ 
    newPlan, setNewPlan, categories, onAddPlan,
    isAddingCategory, setIsAddingCategory, newCategoryName, setNewCategoryName, onAddCategory 
}) => {
    return (
        <DayPlanContent style={{ marginTop: '20px' }}>
             <DayPlanItem style={{ alignItems: "flex-end" }}>
                <div style={{ marginRight: "10px" }}>
                    <Strong>새 일정 추가</Strong><br />
                    
                    {isAddingCategory ? (
                        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                            {/* Input -> BaseInput 변경 */}
                            <BaseInput 
                                placeholder="새 카테고리명"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                style={{ width: "100px", marginBottom: 0 }}
                            />
                            {/* 버튼 -> BaseButton 변경 */}
                            <BaseButton onClick={onAddCategory}>확인</BaseButton>
                            <BaseButton onClick={() => setIsAddingCategory(false)} style={{backgroundColor: '#6c757d'}}>취소</BaseButton>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                            {/* Select -> BaseSelect 변경 */}
                            <BaseSelect 
                                value={newPlan.categoryNo} 
                                onChange={(e) => setNewPlan({ ...newPlan, categoryNo: e.target.value })}
                            >
                                <option value="">선택</option> 
                                {categories.map(cat => (
                                    <option key={cat.categoryNo} value={cat.categoryNo}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </BaseSelect>
                            <BaseButton onClick={() => setIsAddingCategory(true)} style={{padding: '8px 12px'}}>+</BaseButton>
                        </div>
                    )}
                </div>

                <div>
                    <BaseInput 
                        type="text" 
                        value={newPlan.title} 
                        onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })} 
                        placeholder="일정 제목" 
                        style={{ display: 'block', marginBottom: '5px' }}
                    />
                    <BaseInput 
                        type="text" 
                        value={newPlan.content} 
                        onChange={(e) => setNewPlan({ ...newPlan, content: e.target.value })} 
                        placeholder="일정 내용" 
                        style={{ marginBottom: 0 }}
                    />
                </div>
                
                <BaseButton onClick={onAddPlan} style={{ height: "40px", marginLeft: '10px' }}>추가하기</BaseButton>
            </DayPlanItem>
        </DayPlanContent>
    );
};

export default PlanInputForm;