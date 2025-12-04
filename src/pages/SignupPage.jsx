import { useNavigate } from 'react-router-dom'
import { useUser } from '../customHooks/UserContext'
import { ROUTES } from '../route/RouteList'
import { SignupContainer, SignupForm, SignupTitleH1, SignupInput, SignupBtn, BackToLogin, ATag, } from './SignupPage.styled'
import useInput from '../customHooks/useInput'

const SignupPage = () => {
  const { addUser } = useUser()
  const navigate = useNavigate()

  const [userId, handleUserId] = useInput('')
  const [userPwd, handleUserPwd] = useInput('')
  const [userName, handleUserName] = useInput('')
  const [userPhone, handleUserPhone] = useInput('')
  const [userEmail, handleUserEmail] = useInput('')

  const handleSignup = () => {

    if (!userId || !userPwd || !userName || !userPhone || !userEmail) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    // 2. 비밀번호 길이 체크 (추가)
    if (userPwd.length < 4) {
      alert('비밀번호는 4자리 이상이어야 합니다.');
      return;
    }

    if (addUser(userId, userPwd, userName, userPhone, userEmail)) {
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
      navigate(ROUTES.login)
    }
  }

  return (
    <SignupContainer>
      <SignupTitleH1>회원가입</SignupTitleH1>
      <SignupForm>
        <SignupInput type="text" placeholder="아이디" value={userId} onChange={handleUserId} />
        <SignupInput type="password" placeholder="비밀번호" value={userPwd} onChange={handleUserPwd} />
        <SignupInput type="text" placeholder="이름" value={userName} onChange={handleUserName} />
        <SignupInput type="tel" placeholder="휴대폰 번호" value={userPhone} onChange={handleUserPhone} />
        <SignupInput type="email" placeholder="이메일" value={userEmail} onChange={handleUserEmail} />
        <SignupBtn onClick={handleSignup}>
          회원가입
        </SignupBtn>
        <BackToLogin>
          <ATag to={ROUTES.login}>로그인으로 돌아가기</ATag>
        </BackToLogin>
      </SignupForm>
    </SignupContainer>
  )
}

export default SignupPage