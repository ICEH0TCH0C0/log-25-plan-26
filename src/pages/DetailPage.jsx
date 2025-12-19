// src/pages/DetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { DayPlanContainer } from './DetailPage.styled'
import { usePlanManager } from '../customHooks/userPlanManager';

// 분리한 컴포넌트 임포트
import PlanHeader from '../components/PlanHeader'; // 경로에 맞게 수정 필요
import PlanList from '../components/PlanList';
import PlanInputForm from '../components/PlanInpurtFrom';

const DetailPage = () => {
  const { date } = useParams();
  
  // 1. 커스텀 훅에서 모든 로직과 상태를 받아옵니다.
  const {
    plans, categories, searchTerm, setSearchTerm,
    editing, setEditing,
    newPlan, setNewPlan,
    isAddingCategory, setIsAddingCategory,
    newCategoryName, setNewCategoryName,
    handleAddPlan, handleUpdatePlan, handleDeletePlan, handleAddCategory
  } = usePlanManager(date);

  return (
    <DayPlanContainer>
      {/* 2. 각 컴포넌트에 필요한 데이터만 전달(Props)합니다. */}
      
      <PlanHeader 
        date={date} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <PlanList 
        plans={plans}
        editing={editing}
        setEditing={setEditing}
        categories={categories}
        onUpdate={handleUpdatePlan}
        onDelete={handleDeletePlan}
      />

      <PlanInputForm 
        newPlan={newPlan}
        setNewPlan={setNewPlan}
        categories={categories}
        onAddPlan={handleAddPlan}
        isAddingCategory={isAddingCategory}
        setIsAddingCategory={setIsAddingCategory}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        onAddCategory={handleAddCategory}
      />
      
    </DayPlanContainer>
  );
};

export default DetailPage;