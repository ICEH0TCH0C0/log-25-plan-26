import { Children, createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
}

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState(() => {
        const saveUser = localStorage.getItem('users');
        return saveUser ? JSON.parse(saveUser) : [];
    })

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users])

    const addUser = (userId, userPwd, userName, userPhone, userEmail) => {
        const newUser = {
            id: Date.now(),
            userId,
            userPwd,
            userName,
            userPhone,
            userEmail
        }

        setUsers(prev => [...prev, newUser]);

        return newUser;
    }

    const searchUser = (loginUserId, LoginUserPwd) => {
        if (loginUserId === '' || LoginUserPwd === '') {
            return alert("아이디와 비밀번호을 적어주세요!")
        } else {
            const userData = localStorage.getItem('users');
            const userArray = JSON.parse(userData);
            const userInfo = userArray.find(prev => prev.userId === LoginUserPwd)
            if(userInfo) {
                if(userInfo.userPwd === LoginUserPwd) {
                    alert(`${userInfo.userName}님 환영합니다.`);
                    return true;
                } else {
                    alert("비밀번호가 틀렸습니다.")
                }
            } else {
                return alert("존재하지 않은 아이디입니다.");
            }
        }
        return false;
    }

    const value = {
        users,
        addUser,
        searchUser
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}