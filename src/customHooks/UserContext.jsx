import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
}

export const UserProvider = ({children}) => {
    //로컬 스토리지에 저장된 사용자 목록을 불러오거나, 없으면 빈 배열로 초기화
    const [users, setUsers] = useState(() => {
        const saveUser = localStorage.getItem('users');
        return saveUser ? JSON.parse(saveUser) : [];
    })

    //현재 로그인한 사용자 상태 관리
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = sessionStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    })

    //사용자 목록이 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users])

    //새로운 사용자 추가 함수
    const addUser = (userId, userPwd, userName, userPhone, userEmail) => {
        const isDuplicate = users.some(user => user.userId === userId);
        if (isDuplicate) {
            alert('이미 사용 중인 아이디입니다.');
            return false;
        }

        const newUser = {
            id: Date.now(),
            userId,
            userPwd,
            userName,
            userPhone,
            userEmail,
            userPlan: []
        }

        setUsers(prev => [...prev, newUser]);

        return true;
    }

    //사용자 검색 및 로그인 함수
    const searchUser = (loginUserId, LoginUserPwd) => {
        if (loginUserId === '' || LoginUserPwd === '') {
            alert("아이디와 비밀번호을 적어주세요!")
            return false
        }

        const userData = localStorage.getItem('users');
        const userArray = userData ? JSON.parse(userData) : [];
        const userInfo = userArray.find(prev => prev.userId === loginUserId)

        if(userInfo) {
          if (userInfo.userPwd === LoginUserPwd) {
            alert(`${userInfo.userName}님 환영합니다.`);
            setCurrentUser(userInfo);
            sessionStorage.setItem('currentUser', JSON.stringify(userInfo));
            return userInfo;
          } else {
            alert("비밀번호가 틀렸습니다.");
          }
        } else {
            alert("존재하지 않은 아이디입니다.");
        }
        return false;
    }

    //로그아웃 함수
    const logout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
    }

    // 이름과 휴대폰 번호로 아이디 찾기
    const findUserId = (userName, userPhone) => {
        const foundUser = users.find(user => user.userName === userName && user.userPhone === userPhone);
        return foundUser ? foundUser.userId : null;
    }

    // 아이디로 비밀번호 찾기
    const findUserPwd = (userId) => {
        const foundUser = users.find(user => user.userId === userId);
        return foundUser ? foundUser.userPwd : null;
    }

    // 현재 세션에 저장된 user 삭제
    const deleteUser = (userId) => {
        logout();

        // id와 같은 객체를 제외한 남은 객체들을 다시 저장
        const updatedUsers = users.filter(user => user.userId !== userId);
        setUsers(updatedUsers);
    }

    // 사용자 정보 업데이트
    const updateUser = (updatedUser) => {
        // 전달받은 값을 로컬 스토리지에 저장된 객체 배열을 id와 같은 값이 있는지 찾아냄
        const updatedUsers = users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
        );

        // id가 같은 값을 가진 객체를 setUsers를 이용해 상태값을 저장
        setUsers(updatedUsers);

        // 로그인한 사용자가 존재하고 수정된 사용자의 id가 서로 같은지 확인
        if (currentUser && currentUser.id === updatedUser.id) {
            // 상태를 갱신
            setCurrentUser(updatedUser);

            // 세션에도 문자열로 변환하여 저장
            sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
    };

    // 일정 추가 함수
    const addPlan = (date, newPlan) => {
        if (!currentUser) return;

        // 새로운 일정을 포함한 업데이트된 사용자 객체 생성
        const updatedUser = {
            ...currentUser,
            userPlan: [...(currentUser.userPlan || []), { ...newPlan, date: date, id: Date.now() }]
        };
        // 기존 updateUser 함수를 호출하여 세션과 로컬스토리지 모두 업데이트
        updateUser(updatedUser);
    };

    // 일정 수정 함수
    const updatePlan = (planId, updatedPlanData) => {
        if (!currentUser) return;
        
        // 일정 아이디와 같은 일정 배열을 찾아 updatePlanData를 덮어씌움
        const updatedPlans = currentUser.userPlan.map(plan =>
            plan.id === planId ? { ...plan, ...updatedPlanData } : plan
        );

        // 기존 사용자를 가져오고, 
        // 사용자 안에 있는 userPlan의 값을 updatePlanData로 덮어씌운 수정된 일정으로 변경
        const updatedUser = {
            ...currentUser,
            userPlan: updatedPlans
        };

        // 사용자 수정 함수에 수정된 사용자 정보를 보냄
        updateUser(updatedUser);
    };

    // 일정 삭제 함수
    const deletePlan = (planId) => {
        if (!currentUser) return;

        if (window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
            const updatedPlans = currentUser.userPlan.filter(plan => plan.id !== planId);
            const updatedUser = {
                ...currentUser,
                userPlan: updatedPlans
            };
            updateUser(updatedUser);
        }
    };

    const value = {
        users,
        addUser,
        searchUser,
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