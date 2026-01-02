import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { ROUTES } from '../route/RouteList'
// [수정] 로컬 스타일에서는 SignupForm, BackToLogin만 가져옵니다.
import { SignupForm, BackToLogin } from './SignupPage.styled'
// [수정] 나머지는 공통 스타일에서 가져옵니다.
import { CenteredContainer, PageTitle, BaseInput, BaseButton, BaseLink } from '../commonStyled/common.styled'
import useInput from '../customHooks/useInput'

const SignupPage = () => {
  const { addUser, checkIdDuplicate } = useUserStore()
  const navigate = useNavigate()

  const [userId, handleUserId] = useInput('')
  const [userPwd, handleUserPwd] = useInput('')
  const [userName, handleUserName] = useInput('')
  const [userPhone, handleUserPhone] = useInput('')
  const [userEmail, handleUserEmail] = useInput('')

  const [isIdChecked, setIsIdChecked] = useState(false)

  const handleUserIdChange = (e) => {
    handleUserId(e)
    setIsIdChecked(false)
  }

  const handleCheckId = async () => {
    if (!userId) {
      alert('아이디를 입력해주세요.')
      return
    }
    const isAvailable = await checkIdDuplicate(userId)
    if (isAvailable) {
      alert('사용 가능한 아이디입니다.')
      setIsIdChecked(true)
    } else {
      alert('이미 사용 중인 아이디입니다.')
      setIsIdChecked(false)
    }
  }

  const handleSignup = async () => {
    if (!userId || !userPwd || !userName || !userPhone || !userEmail) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    if (userPwd.length < 4) {
      alert('비밀번호는 4자리 이상이어야 합니다.');
      return;
    }

    if (!isIdChecked) {
      alert('아이디 중복 확인을 해주세요.')
      return
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
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <BaseInput type="text" placeholder="아이디" value={userId} onChange={handleUserIdChange} style={{ flex: 1 }} />
          <BaseButton type="button" onClick={handleCheckId} style={{ width: '100px', height: '40px', whiteSpace: 'nowrap', fontSize: '14px', padding: '0', justifyContent: 'flex-start' }}>
            중복 확인
          </BaseButton>
        </div>

        <BaseInput type="password" placeholder="비밀번호" value={userPwd} onChange={handleUserPwd} />
        <BaseInput type="text" placeholder="이름" value={userName} onChange={handleUserName} />
        <BaseInput type="tel" placeholder="휴대폰 번호" value={userPhone} onChange={handleUserPhone} />
        <BaseInput type="email" placeholder="이메일" value={userEmail} onChange={handleUserEmail} />

        {/* SignupBtn -> BaseButton (공통 스타일) */}
        <BaseButton onClick={handleSignup} disabled={!isIdChecked} style={{ opacity: isIdChecked ? 1 : 0.6, cursor: isIdChecked ? 'pointer' : 'not-allowed' }}>
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