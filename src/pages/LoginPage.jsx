import { useNavigate } from 'react-router-dom';
import { useUser } from '../customHooks/UserContext'
import { ROUTES } from '../route/RouteList';
import { LoginContainer, LoginForm, LoginTitleH1, LoginInput, LoginBtn, SignupAndIdPwdFind, ATag } from './LoginPage.styled'
import useInput from '../customHooks/useInput';

const LoginPage = () => {
    const { login } = useUser();
    const navigate = useNavigate();
    
    const [userId, handleUserId] = useInput('');
    const [userPwd, handleUserPwd] = useInput('');

    const handleLogin = async () => {
        const loggedInUser = await login(userId, userPwd);
        if (loggedInUser && loggedInUser.userNo) {
            navigate(`/main/${loggedInUser.userNo}`);
        } else {
            console.error("로그인 정보에 ID가 없습니다:", loggedInUser);
            alert("로그인 정보를 불러올 수 없습니다.");
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
                onChange={handleUserId}
            />
            <LoginInput 
                type='password' // 비밀번호는 가려져야 하니 password 타입 권장
                placeholder='비밀번호를 입력해주세요!'
                value={userPwd}
                onChange={handleUserPwd}
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