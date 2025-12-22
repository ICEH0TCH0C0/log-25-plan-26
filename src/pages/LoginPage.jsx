import { useNavigate } from 'react-router-dom';
import { useUser } from '../customHooks/UserContext'
import { ROUTES } from '../route/RouteList';
import { LoginForm, SignupAndIdPwdFind } from './LoginPage.styled'
// 공통 스타일 import
import { CenteredContainer, PageTitle, BaseInput, BaseButton, BaseLink } from '../commonStyled/common.styled';
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
        }
    }

    return (
    <CenteredContainer>
        <PageTitle>로그인</PageTitle>
        <LoginForm>
            <BaseInput type='text' placeholder='아이디' value={userId} onChange={handleUserId} />
            <BaseInput type='password' placeholder='비밀번호' value={userPwd} onChange={handleUserPwd} />
            <BaseButton onClick={handleLogin}>로그인</BaseButton>
            
            <SignupAndIdPwdFind>
                <BaseLink to={ROUTES.findIdPwd}>아이디/비밀번호 찾기</BaseLink> | 
                <BaseLink to={ROUTES.signup}> 회원가입</BaseLink>
            </SignupAndIdPwdFind>
        </LoginForm>
    </CenteredContainer>
  )
}

export default LoginPage