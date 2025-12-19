import { useNavigate } from 'react-router-dom'
import { useUser } from '../customHooks/UserContext'
import { ROUTES } from '../route/RouteList'
// [수정] 로컬 스타일에서는 SignupForm, BackToLogin만 가져옵니다.
import { SignupForm, BackToLogin } from './SignupPage.styled'
// [수정] 나머지는 공통 스타일에서 가져옵니다.
import { CenteredContainer, PageTitle, BaseInput, BaseButton, BaseLink } from '../commonStyled/common.styled'
import useInput from '../customHooks/useInput'

const SignupPage = () => {
  const { addUser } = useUser()
  const navigate = useNavigate()

  const [userId, handleUserId] = useInput('')
  const [userPwd, handleUserPwd] = useInput('')
  const [userName, handleUserName] = useInput('')
  const [userPhone, handleUserPhone] = useInput('')
  const [userEmail, handleUserEmail] = useInput('')

  const handleSignup = async () => {

    if (!userId || !userPwd || !userName || !userPhone || !userEmail) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    if (userPwd.length < 4) {
      alert('비밀번호는 4자리 이상이어야 합니다.');
      return;
    }

    // [참고] addUser는 비동기 함수이므로 await를 붙여서 결과를 기다려야 정확합니다.
    const isSuccess = await addUser(userId, userPwd, userName, userPhone, userEmail);
    
    if (isSuccess) {
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
      navigate(ROUTES.login)
    }
  }

  return (
    // SignupContainer -> CenteredContainer (공통 스타일)
    <CenteredContainer>
      {/* SignupTitleH1 -> PageTitle (공통 스타일) */}
      <PageTitle>회원가입</PageTitle>
      
      <SignupForm>
        {/* SignupInput -> BaseInput (공통 스타일) */}
        <BaseInput type="text" placeholder="아이디" value={userId} onChange={handleUserId} />
        <BaseInput type="password" placeholder="비밀번호" value={userPwd} onChange={handleUserPwd} />
        <BaseInput type="text" placeholder="이름" value={userName} onChange={handleUserName} />
        <BaseInput type="tel" placeholder="휴대폰 번호" value={userPhone} onChange={handleUserPhone} />
        <BaseInput type="email" placeholder="이메일" value={userEmail} onChange={handleUserEmail} />
        
        {/* SignupBtn -> BaseButton (공통 스타일) */}
        <BaseButton onClick={handleSignup}>
          회원가입
        </BaseButton>
        
        <BackToLogin>
          {/* ATag -> BaseLink (공통 스타일) */}
          <BaseLink to={ROUTES.login}>로그인으로 돌아가기</BaseLink>
        </BackToLogin>
      </SignupForm>
    </CenteredContainer>
  )
}

export default SignupPage