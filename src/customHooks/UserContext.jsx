import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
}

export const UserProvider = ({children}) => {

    //현재 로그인한 사용자 상태 관리
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = sessionStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    })

    //새로운 사용자 추가 함수
    const addUser = async (userId, userPwd, userName, userPhone, userEmail) => {
        const newUser = {
            userId: userId,
            userPwd: userPwd,
            userName: userName,
            userPhone: userPhone,
            userEmail: userEmail
        }

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                return true;
            } else {
                alert("회원 등록에 실패했습니다.");
                return false;
            }
        } catch (error) {
            console.error(error);
            alert("회원가입에 실패했습니다.");
            return false;
        }
    }

    //사용자 검색 및 로그인 함수
    const login = async (userId, userPwd) => {
        try {
            // GET 방식은 보안에 취약하므로 보통 POST
            const response = await fetch("/api/sessions", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, userPwd }) 
            });

            if (response.ok) {
                const memberInfo = await response.json(); // 서버가 찾아준 내 정보
                
                // [수정] 서버 DTO의 'plans'를 프론트엔드 상태인 'userPlan'으로 매핑 (중복 제거)
                const { plans, ...rest } = memberInfo;
                const mappedUser = {
                    ...rest,
                    userPlan: plans || [] 
                };
                setCurrentUser(mappedUser); // 상태 업그레이드
                sessionStorage.setItem('currentUser', JSON.stringify(mappedUser)); // 세션에 저장
                return mappedUser;
            } else {
                alert("아이디 또는 비밀번호가 틀렸거나 아이디가 없습니다.");
                return null;
            }
        } catch (error) {
            console.error("로그인 에러:", error);
            return null;
        }
    }

    //로그아웃 함수
    const logout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
    }

    // 이름과 휴대폰 번호로 아이디 찾기
    const findUserId = async (userName, userPhone) => {
        try {
            const response = await fetch("/api/users/id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, userPhone })
            });

            if (response.ok) {
                // 서버가 { "userId": "찾은아이디" } 형태로 반환한다고 가정
                const data = await response.json();
                return data.userId; 
            } else {
                return null; // 못 찾음 (404 등)
            }
        } catch (error) {
            console.error("아이디 찾기 에러:", error);
            return null;
        }
    }

    // 아이디로 비밀번호 찾기
    const findUserPwd = async (userId, userName, userPhone) => {
        // 보안상 아이디+이름+폰번호를 다 검사하는 게 좋지만, 
        // 현재 UI에 맞춰 아이디로만 조회하도록 작성합니다.
        try {
            const response = await fetch("/api/users/pwd", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, userName, userPhone })
            });

            if (response.ok) {
                // 서버가 { "userPwd": "찾은비번" } 형태로 반환한다고 가정
                const data = await response.json();
                return data.userPwd;
            } else {
                return null;
            }
        } catch (error) {
            console.error("비밀번호 찾기 에러:", error);
            return null;
        }
    }

    // 현재 세션에 저장된 user 삭제
    const deleteUser = async (userNo) => {
        try {
            // [수정] 서버에 deleteUser 기능이 구현되어 있어야 함
            // UserController에 @DeleteMapping("/{userNo}") 추가 필요
            const response = await fetch(`/api/users/${userNo}`, { 
                method: "DELETE"
            });

            if (response.ok) {
                logout(); 
                return true;
            } else {
                alert("탈퇴 처리에 실패했습니다.");
                return false;
            }
        } catch (error) {
            console.error("탈퇴 에러:", error);
            alert("서버 오류가 발생했습니다.");
            return false;
        }
    };

    // 사용자 정보 업데이트
    const updateUser = async (updatedUser) => {
        try {
            // [수정] URL에 userNo 포함 (/api/user/{userNo})
            const response = await fetch(`/api/users/${updatedUser.userNo}`, { 
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                const newInfo = await response.json(); 
                
                // [수정] 정보 수정 후에도 'plans'를 'userPlan'으로 매핑 (중복 제거)
                const { plans, ...rest } = newInfo;
                const mappedNewInfo = {
                    ...rest,
                    userPlan: plans || []
                };
                setCurrentUser(mappedNewInfo);
                sessionStorage.setItem('currentUser', JSON.stringify(mappedNewInfo));
                return true; 
            } else {
                alert("정보 수정에 실패했습니다.");
                return false;
            }
        } catch (error) {
            console.error("수정 에러:", error);
            alert("서버 오류가 발생했습니다.");
            return false;
        }
    };

    // 일정 추가 함수
    const addPlan = async (date, newPlan) => {
        if (!currentUser) return;
        
        try {
            const response = await fetch(`/api/plans/${currentUser.userNo}`, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: date,
                    planTitle: newPlan.title,
                    planContent: newPlan.content,
                    categoryNo: newPlan.categoryNo
                })
            });

            if (response.ok) {
                const savedPlanDto = await response.json(); 
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
                setCurrentUser(updatedUser);
                sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("일정 추가 실패", error);
        }
    };

    // 일정 수정 함수
    const updatePlan = async (planId, updatedPlanData) => {
        try {
            // [수정] URL 변경 (/api/plan/{planNo})
            const response = await fetch(`/api/plans/${planId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    // planNo는 URL에 있으므로 body에는 선택사항 (DTO에 따라 다름)
                    planTitle: updatedPlanData.title,
                    planContent: updatedPlanData.content,
                    categoryNo: updatedPlanData.categoryNo
                })
            });

            if(response.ok) {
                 const updatedPlans = (currentUser.userPlan || []).map(plan =>
                    plan.planNo === planId ? { 
                        ...plan, 
                        planTitle: updatedPlanData.title, 
                        planContent: updatedPlanData.content 
                    } : plan
                );
                const updatedUser = { ...currentUser, userPlan: updatedPlans };
                setCurrentUser(updatedUser);
                sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }
        } catch (error) { console.error(error); }
    };

    // 일정 삭제 함수
    const deletePlan = async (planId) => {
        if (!window.confirm('정말로 이 일정을 삭제하시겠습니까?')) return;
        
        try {
            // [수정] URL 변경 (/api/plan/{planNo}) - /delete 제거
            const response = await fetch(`/api/plans/${planId}`, {
                method: "DELETE"
            });
            
            if (response.ok) {
                const updatedPlans = (currentUser.userPlan || []).filter(plan => plan.planNo !== planId);
                const updatedUser = {
                    ...currentUser,
                    userPlan: updatedPlans
                };
                setCurrentUser(updatedUser);
                sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
                alert("일정이 삭제되었습니다.");
            } else {
                alert("삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("일정 삭제 에러:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };
    const value = {
        addUser,
        login,
        currentUser,
        logout,
        findUserId,
        findUserPwd,
        deleteUser,
        updateUser,
        addPlan,
        updatePlan,
        deletePlan
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}