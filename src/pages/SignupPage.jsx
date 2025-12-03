import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../customHooks/UserContext'
import { ROUTES } from '../route/RouteList'
import { SignupContainer, SignupForm, SignupTitleH1, SignupInput, SignupBtn, BackToLogin, ATag, } from './SignupPage.styled'

const SignupPage = () => {
  const { addUser } = useUser()
  const navigate = useNavigate()

  const [userId, setUserId] = useState('')
  const [userPwd, setUserPwd] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const handleSignup = () => {

    if (!userId || !userPwd || !userName || !userPhone || !userEmail) {
      alert('모든 필드를 입력해주세요.')
      return
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
        <SignupInput type="text" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <SignupInput type="password" placeholder="비밀번호" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} />
        <SignupInput type="text" placeholder="이름" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <SignupInput type="tel" placeholder="휴대폰 번호" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
        <SignupInput type="email" placeholder="이메일" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
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