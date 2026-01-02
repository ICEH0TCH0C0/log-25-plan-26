import api from './axios';

export const fetchPlans = async (userNo, date, keyword = '') => {
    try {
        const response = await api.get('/plans', {
            params: { userNo, date, keyword },
        });
        return response.data;
    } catch (error) {
        console.error("일정 조회 에러:", error);
        return [];
    }
};

export const addPlan = async (userNo, planData) => {
    try {
        const response = await api.post(`/plans/${userNo}`, planData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("일정 추가 실패:", error);
        return { success: false, error };
    }
};

export const updatePlan = async (planNo, planData) => {
    try {
        const response = await api.patch(`/plans/${planNo}`, planData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("일정 수정 실패:", error);
        return { success: false, error };
    }
};

export const deletePlan = async (planNo) => {
    try {
        await api.delete(`/plans/${planNo}`);
        return true;
    } catch (error) {
        console.error("일정 삭제 실패:", error);
        return false;
    }
};
