import { useState } from 'react'; // useState 추가
import { useNavigate } from 'react-router-dom';
import { useUser } from '../customHooks/UserContext'
import { ROUTES } from '../route/RouteList';
import { LoginContainer, LoginForm, LoginTitleH1, LoginInput, LoginBtn, SignupAndIdPwdFind, ATag } from './LoginPage.styled'

const LoginPage = () => {
    const { searchUser } = useUser();
    const navigate = useNavigate();
    
    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');

    const handleLogin = () => {
        const loggedInUser = searchUser(userId, userPwd);
        if (loggedInUser) {
            navigate(`/main/${loggedInUser.id}`);
        }
    }

    return (
    <LoginContainer>
        <LoginTitleH1>로그인</LoginTitleH1>
        <LoginForm>
            <LoginInput 
                type='text' 
                placeholder='아이디를 입력해주세요!'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <LoginInput 
                type='password' // 비밀번호는 가려져야 하니 password 타입 권장
                placeholder='비밀번호를 입력해주세요!'
                value={userPwd}
                onChange={(e) => setUserPwd(e.target.value)}
            />
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
            
            <SignupAndIdPwdFind>
                <ATag to={ROUTES.findIdPwd}>아이디/비밀번호 찾기</ATag> | <ATag to={ROUTES.signup}>회원가입</ATag>
            </SignupAndIdPwdFind>
        </LoginForm>
    </LoginContainer>
  )
}

export default LoginPage