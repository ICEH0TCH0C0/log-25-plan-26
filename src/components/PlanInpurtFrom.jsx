import React from 'react';
import { DayPlanContent, DayPlanItem, Select } from '../pages/DetailPage.styled';
import { Strong } from '../commonStyled/common.styled';
import { Input } from '../pages/MyPage.styled';

const PlanInputForm = ({ 
    newPlan, setNewPlan, categories, onAddPlan,
    isAddingCategory, setIsAddingCategory, newCategoryName, setNewCategoryName, onAddCategory 
}) => {
    return (
        // DayPlanContent로 감싸서 위 리스트와 스타일 통일감을 줌 (원하는 대로 배치 가능)
        <DayPlanContent style={{ marginTop: '20px' }}>
             <DayPlanItem style={{ alignItems: "flex-end" }}>
                <div style={{ marginRight: "10px" }}>
                    <Strong>새 일정 추가</Strong><br />
                    
                    {isAddingCategory ? (
                        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                            <Input 
                                placeholder="새 카테고리명"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                style={{ width: "100px" }}
                            />
                            <button onClick={onAddCategory}>확인</button>
                            <button onClick={() => setIsAddingCategory(false)}>취소</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                            <Select 
                                value={newPlan.categoryNo} 
                                onChange={(e) => setNewPlan({ ...newPlan, categoryNo: e.target.value })}
                            >
                                <option value="">선택</option> 
                                {categories.map(cat => (
                                    <option key={cat.categoryNo} value={cat.categoryNo}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </Select>
                            <button onClick={() => setIsAddingCategory(true)}>+</button>
                        </div>
                    )}
                </div>

                <div>
                    <Input 
                        type="text" 
                        value={newPlan.title} 
                        onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })} 
                        placeholder="일정 제목" 
                        style={{ display: 'block', marginBottom: '5px' }}
                    />
                    <Input 
                        type="text" 
                        value={newPlan.content} 
                        onChange={(e) => setNewPlan({ ...newPlan, content: e.target.value })} 
                        placeholder="일정 내용" 
                    />
                </div>
                
                <button onClick={onAddPlan} style={{ height: "40px" }}>추가하기</button>
            </DayPlanItem>
        </DayPlanContent>
    );
};

export default PlanInputForm;