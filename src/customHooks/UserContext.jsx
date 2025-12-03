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
            userEmail
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

    const value = {
        users,
        addUser,
        searchUser,
        currentUser,
        logout,
        findUserId,
        findUserPwd
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}