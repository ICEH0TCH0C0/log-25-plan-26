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
            userEmail: userEmail,
            userPlan: []
        }

        try {
            const response = await fetch("/api/user/signup", {
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
            const response = await fetch("/api/user/login", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, userPwd }) 
            });

            if (response.ok) {
                const memberInfo = await response.json(); // 서버가 찾아준 내 정보
                setCurrentUser(memberInfo); // 상태 업그레이드
                sessionStorage.setItem('currentUser', JSON.stringify(memberInfo)); // 세션에 저장
                return memberInfo;
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
            const response = await fetch("/api/user/findId", {
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
            const response = await fetch("/api/user/findPwd", {
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
            // DELETE 메서드로 삭제 요청 (PK인 userNo를 보냄)
            const response = await fetch(`/api/user/delete/${userNo}`, {
                method: "DELETE"
            });

            if (response.ok) {
                logout(); // 로그아웃 처리 (세션 비우기)
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
            // PUT 메서드로 수정 요청 보냄
            const response = await fetch("/api/user/update", { 
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                // 서버가 수정된 최신 정보를 돌려준다고 가정
                const newInfo = await response.json(); 
                
                // 프론트엔드 상태(Context)와 세션 스토리지 갱신
                setCurrentUser(newInfo);
                sessionStorage.setItem('currentUser', JSON.stringify(newInfo));
                
                return true; // 성공
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
            const response = await fetch("/api/plan/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userNo: currentUser.userNo,
                    date: date,
                    planTitle: newPlan.title,
                    planContent: newPlan.content
                })
            });

            if (response.ok) {
                // 서버가 돌려준 진짜 ID(planNo)를 받습니다.
                const realPlanId = await response.json(); 

                // 임시 ID(Date.now) 대신 진짜 ID를 넣어서 저장합니다.
                const updatedUser = {
                    ...currentUser,
                    userPlan: [
                        ...(currentUser.userPlan || []), 
                        { ...newPlan, date: date, id: realPlanId, planNo: realPlanId } 
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
            const response = await fetch("/api/plan/update", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planNo: planId, // planId가 DB의 PK여야 함
                    planTitle: updatedPlanData.title,
                    planContent: updatedPlanData.content
                })
            });

            if(response.ok) {
                 // 화면 업데이트 로직 (기존 코드 활용)
                 const updatedPlans = (currentUser.userPlan || []).map(plan =>
                    plan.id === planId ? { ...plan, ...updatedPlanData } : plan
                );
                const updatedUser = { ...currentUser, userPlan: updatedPlans };
                setCurrentUser(updatedUser);
                sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }
        } catch (error) { console.error(error); }
    };

    // 일정 삭제 함수
    const deletePlan = async (planId) => {
        // 1. 확인 창 띄우기
        if (!window.confirm('정말로 이 일정을 삭제하시겠습니까?')) return;
        
        try {
            // 2. 서버에 삭제 요청 (planId는 DB의 PLAN_NO여야 함)
            const response = await fetch(`/api/plan/delete/${planId}`, {
                method: "DELETE"
            });
            
            if (response.ok) {
                // 3. 화면(React 상태)에서도 즉시 제거
                const updatedPlans = (currentUser.userPlan || []).filter(plan => plan.id !== planId && plan.planNo !== planId);
                
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