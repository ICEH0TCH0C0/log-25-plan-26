// src/customHooks/usePlanManager.js
import { useState, useEffect } from 'react';
import { useUser } from './UserContext';

export const usePlanManager = (date) => {
    const { currentUser, addPlan, updatePlan, deletePlan } = useUser();
    
    // 상태 관리
    const [searchTerm, setSearchTerm] = useState('');
    const [editing, setEditing] = useState({ id: null, title: '', content: '', categoryNo: '1' });
    const [newPlan, setNewPlan] = useState({ title: '', content: '', categoryNo: '1' });
    const [categories, setCategories] = useState([]);
    const [plans, setPlans] = useState([]);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    // 1. 카테고리 목록 가져오기
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/category/all');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    // 2. 일정 목록 가져오기 (검색어 변경 시 자동 실행)
    useEffect(() => {
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
        fetchPlans();
    }, [currentUser, date, searchTerm]);

    // 3. 핸들러 함수들
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

    const handleAddCategory = async () => {
        if(!newCategoryName.trim()) return;
        try {
            const res = await fetch("/api/category/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryName: newCategoryName })
            });
            if(res.ok) {
                const savedCategory = await res.json();
                setCategories([...categories, savedCategory]);
                setNewPlan(prev => ({ ...prev, categoryNo: savedCategory.categoryNo }));
                setIsAddingCategory(false);
                setNewCategoryName("");
            }
        } catch(err) {
            console.error(err);
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