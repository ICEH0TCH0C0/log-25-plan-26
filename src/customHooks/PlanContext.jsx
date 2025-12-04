import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext();

export const usePlan = () => {
    const context = useContext(PlanContext);
    return context;
}

export const UserProvider = ({children}) => {
    //로컬 스토리지에 저장된 사용자 목록을 불러오거나, 없으면 빈 배열로 초기화
    const [plans, setPlans] = useState(() => {
        const saveUser = localStorage.getItem('plans');
        return saveUser ? JSON.parse(saveUser) : [];
    })

    //사용자 목록이 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('plans', JSON.stringify(plans));
    }, [plans])

    //새로운 사용자 추가 함수
    const addPlan = (planTitle, planContent) => {

        const newUser = {
            id: Date.now(),
            planTitle,
            planContent,
            planDate: Date.now()
        }

        setPlans(prev => [...prev, newUser]);

        return true;
    }

    //일정 삭제
    const deletePlan = () => {

    }

    //일정 수정
    const updatePlan = () => {

    };

    const value = {
        plans,
        addPlan,
        deletePlan,
        updatePlan
    }

    return (
        <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
    )
}