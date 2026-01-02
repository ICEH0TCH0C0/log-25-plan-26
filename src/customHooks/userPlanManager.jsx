// src/customHooks/usePlanManager.js
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import * as planApi from '../api/planApi';
import * as categoryApi from '../api/categoryApi';

export const usePlanManager = (date) => {
    // Zustand Store에서 상태와 액션 가져오기
    const currentUser = useUserStore(state => state.currentUser);
    const addPlan = useUserStore(state => state.addPlan);
    const updatePlan = useUserStore(state => state.updatePlan);
    const deletePlan = useUserStore(state => state.deletePlan);

    // 상태 관리
    const [searchTerm, setSearchTerm] = useState('');
    const [editing, setEditing] = useState({ id: null, title: '', content: '', categoryNo: '1' });
    const [newPlan, setNewPlan] = useState({ title: '', content: '', categoryNo: '1' });
    const [categories, setCategories] = useState([]);
    const [plans, setPlans] = useState([]);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    // 카테고리 목록 가져오기
    useEffect(() => {
        const loadCategories = async () => {
            const data = await categoryApi.fetchCategories();
            setCategories(data);
        };
        loadCategories();
    }, []);

    // 일정 목록 가져오기 (검색어 변경 시 자동 실행)
    useEffect(() => {
        const loadPlans = async () => {
            if (!currentUser) return;
            const data = await planApi.fetchPlans(currentUser.userNo, date, searchTerm);
            setPlans(data);
        };
        loadPlans();
    }, [currentUser, date, searchTerm]);

    // 핸들러 함수들
    const handleAddPlan = () => {
        if (!newPlan.title.trim() || !newPlan.content.trim()) {
            alert('일정 제목과 내용을 모두 입력해주세요.');
            return;
        }
        addPlan(date, newPlan);
        setNewPlan({ title: '', content: '', categoryNo: '1' });
        alert('추가되었습니다.');
    };

    const handleUpdatePlan = (planId) => {
        if (!editing.title.trim() || !editing.content.trim()) {
            alert('수정할 제목과 내용을 모두 입력해주세요.');
            return;
        }
        const updatedData = {
            title: editing.title,
            content: editing.content,
            categoryNo: editing.categoryNo
        };
        updatePlan(planId, updatedData);
        setEditing({ id: null, title: '', content: '' });
        alert('수정되었습니다.');
    };

    // 카테고리 추가
    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;

        const result = await categoryApi.addCategory(newCategoryName);
        if (result.success) {
            const savedCategory = result.data;
            setCategories([...categories, savedCategory]);
            setNewPlan(prev => ({ ...prev, categoryNo: savedCategory.categoryNo }));
            setIsAddingCategory(false);
            setNewCategoryName("");
        } else {
            alert(result.error);
        }
    };

    // 훅에서 필요한 데이터와 함수들을 리턴
    return {
        plans, categories, searchTerm, setSearchTerm,
        editing, setEditing,
        newPlan, setNewPlan,
        isAddingCategory, setIsAddingCategory,
        newCategoryName, setNewCategoryName,
        handleAddPlan, handleUpdatePlan, handleDeletePlan: deletePlan, handleAddCategory
    };
};