import api from './axios';

export const checkIdDuplicate = async (userId) => {
    try {
        const response = await api.get(`/users/availability`, {
            params: { userId },
        });
        return response.data.isAvailable;
    } catch (error) {
        console.error("중복 체크 에러:", error);
        return false;
    }
};

export const addUser = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || "회원가입에 실패했습니다."
        };
    }
};

export const loginUser = async (userId, userPwd) => {
    try {
        const response = await api.post('/tokens', { userId, userPwd });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
};

export const findUserId = async (userName, userPhone) => {
    try {
        const response = await api.post('/users/id-recovery', { userName, userPhone });
        return response.data;
    } catch (error) {
        return null;
    }
};

export const resetUserPwd = async (userId, userName, userPhone, newPassword) => {
    try {
        const response = await api.post('/users/password-reset', { userId, userName, userPhone, newPassword });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
};

export const updateUser = async (userNo, userData) => {
    try {
        const response = await api.patch(`/users/${userNo}`, userData);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error };
    }
};

export const deleteUser = async (userNo) => {
    try {
        await api.delete(`/users/${userNo}`);
        return true;
    } catch (error) {
        return false;
    }
};
