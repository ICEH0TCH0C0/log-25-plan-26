import { create } from 'zustand';
import * as userApi from '../api/userApi';
import * as planApi from '../api/planApi';

// Helper to sync with session storage
const getSessionUser = () => {
    const savedUser = sessionStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
};

export const useUserStore = create((set, get) => ({
    currentUser: getSessionUser(),

    setCurrentUser: (user) => {
        set({ currentUser: user });
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('currentUser');
        }
    },

    // --- Auth & User Actions ---

    login: async (userId, userPwd) => {
        const result = await userApi.loginUser(userId, userPwd);
        if (result.success) {
            const memberInfo = result.data;
            // DTO Mapping
            const { plans, ...rest } = memberInfo;
            const mappedUser = {
                ...rest,
                userPlan: plans || []
            };

            get().setCurrentUser(mappedUser);
            return mappedUser;
        } else {
            alert("아이디 또는 비밀번호가 틀렸거나 아이디가 없습니다.");
            return null;
        }
    },

    logout: () => {
        get().setCurrentUser(null);
    },

    addUser: async (userId, userPwd, userName, userPhone, userEmail) => {
        const newUser = { userId, userPwd, userName, userPhone, userEmail };
        const result = await userApi.addUser(newUser);
        if (result.success) {
            return true;
        } else {
            alert(result.error);
            return false;
        }
    },

    checkIdDuplicate: async (userId) => {
        return await userApi.checkIdDuplicate(userId);
    },

    findUserId: async (userName, userPhone) => {
        return await userApi.findUserId(userName, userPhone);
    },

    findUserPwd: async (userId, userName, userPhone) => {
        return await userApi.findUserPwd(userId, userName, userPhone);
    },

    updateUser: async (updatedUser) => {
        const currentUser = get().currentUser;
        // updatedUser might not have userNo if passed from form, ensure we use existing one if needed
        // But typically updateUser param has it.

        const result = await userApi.updateUser(updatedUser.userNo, updatedUser);
        if (result.success) {
            const newInfo = result.data;
            const { plans, ...rest } = newInfo;
            const mappedNewInfo = {
                ...rest,
                userPlan: plans || []
            };
            get().setCurrentUser(mappedNewInfo);
            return true;
        } else {
            alert("정보 수정에 실패했습니다.");
            return false;
        }
    },

    deleteUser: async (userNo) => {
        const success = await userApi.deleteUser(userNo);
        if (success) {
            get().logout();
            return true;
        } else {
            alert("탈퇴 처리에 실패했습니다.");
            return false;
        }
    },

    // --- Plan Actions ---

    addPlan: async (date, newPlan) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        const planData = {
            date: date,
            planTitle: newPlan.title,
            planContent: newPlan.content,
            categoryNo: newPlan.categoryNo
        };

        const result = await planApi.addPlan(currentUser.userNo, planData);
        if (result.success) {
            const savedPlanDto = result.data;
            const updatedUser = {
                ...currentUser,
                userPlan: [
                    ...(currentUser.userPlan || []),
                    {
                        planNo: savedPlanDto.planNo,
                        planTitle: savedPlanDto.planTitle,
                        planContent: savedPlanDto.planContent,
                        date: savedPlanDto.date
                    }
                ]
            };
            get().setCurrentUser(updatedUser);
        } // Errors logged in api
    },

    updatePlan: async (planId, updatedPlanData) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        const planData = {
            planTitle: updatedPlanData.title,
            planContent: updatedPlanData.content,
            categoryNo: updatedPlanData.categoryNo
        };

        const result = await planApi.updatePlan(planId, planData);
        if (result.success) {
            const updatedPlans = (currentUser.userPlan || []).map(plan =>
                plan.planNo === planId ? {
                    ...plan,
                    planTitle: planData.planTitle,
                    planContent: planData.planContent
                } : plan
            );
            const updatedUser = { ...currentUser, userPlan: updatedPlans };
            get().setCurrentUser(updatedUser);
        }
    },

    deletePlan: async (planId) => {
        if (!window.confirm('정말로 이 일정을 삭제하시겠습니까?')) return;

        const success = await planApi.deletePlan(planId);
        if (success) {
            const currentUser = get().currentUser;
            const updatedPlans = (currentUser.userPlan || []).filter(plan => plan.planNo !== planId);
            const updatedUser = {
                ...currentUser,
                userPlan: updatedPlans
            };
            get().setCurrentUser(updatedUser);
            alert("일정이 삭제되었습니다.");
        } else {
            alert("삭제에 실패했습니다.");
        }
    }
}));
