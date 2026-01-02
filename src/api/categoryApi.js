import api from './axios';

export const fetchCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error("카테고리 조회 에러:", error);
        return [];
    }
};

export const addCategory = async (categoryName) => {
    try {
        const response = await api.post('/categories', { categoryName });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || "카테고리 추가에 실패했습니다."
        };
    }
};
