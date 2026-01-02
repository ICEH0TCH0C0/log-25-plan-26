import { useUserStore } from '../store/useUserStore'
import { ROUTES } from '../route/RouteList'
import { FindBox } from './FindIdPwdPage.styled'
import { CenteredContainer, PageTitle, BaseInput, BaseButton, BaseLink } from '../commonStyled/common.styled'
import useInput from '../customHooks/useInput'

const FindIdPwdPage = () => {
  const { findUserId, resetUserPwd } = useUserStore()

  // [아이디 찾기용 변수]
  const [nameForId, handleNameForId] = useInput('')
  const [phoneForId, handlePhoneForId] = useInput('')

  // [비밀번호 재설정용 변수]
  const [idForReset, handleIdForReset] = useInput('')
  const [nameForReset, handleNameForReset] = useInput('')
  const [phoneForReset, handlePhoneForReset] = useInput('')
  const [newPwd, handleNewPwd] = useInput('')

  const handleFindId = async () => {
    if (!nameForId || !phoneForId) {
      alert('이름과 휴대폰 번호를 모두 입력해주세요.')
      return
    }

    const foundIdData = await findUserId(nameForId, phoneForId)

    if (foundIdData && foundIdData.userId) {
      alert(`회원님의 아이디는 [ ${foundIdData.userId} ] 입니다.`)
    } else {
      alert('일치하는 사용자 정보가 없습니다.')
    }
  }

  const handleResetPwd = async () => {
    if (!idForReset || !nameForReset || !phoneForReset || !newPwd) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    const result = await resetUserPwd(idForReset, nameForReset, phoneForReset, newPwd)

    if (result.success) {
      alert('비밀번호가 성공적으로 변경되었습니다. 로그인 해주세요.')
    } else {
      alert('정보가 일치하지 않거나 변경에 실패했습니다.')
    }
  }

  return (
    // FindContainer -> CenteredContainer (공통 스타일)
    <CenteredContainer>
      <FindBox>
        {/* FindTitle -> PageTitle (공통 스타일), 글자 크기 조정이 필요하면 style 속성 사용 */}
        <PageTitle style={{ fontSize: '22px', margin: '0 0 10px 0' }}>아이디 찾기</PageTitle>
        {/* FindInput -> BaseInput (공통 스타일) */}
        <BaseInput type="text" placeholder="이름" value={nameForId} onChange={handleNameForId} />
        <BaseInput type="tel" placeholder="휴대폰 번호" value={phoneForId} onChange={handlePhoneForId} />
        {/* FindButton -> BaseButton (공통 스타일) */}
        <BaseButton onClick={handleFindId}>아이디 찾기</BaseButton>
      </FindBox>

      <FindBox>
        <PageTitle style={{ fontSize: '22px', margin: '0 0 10px 0' }}>비밀번호 재설정</PageTitle>
        <BaseInput type="text" placeholder="아이디" value={idForReset} onChange={handleIdForReset} />
        <BaseInput type="text" placeholder="이름" value={nameForReset} onChange={handleNameForReset} />
        <BaseInput type="tel" placeholder="휴대폰 번호" value={phoneForReset} onChange={handlePhoneForReset} />
        <BaseInput type="password" placeholder="새 비밀번호" value={newPwd} onChange={handleNewPwd} />
        <BaseButton onClick={handleResetPwd}>비밀번호 변경</BaseButton>
      </FindBox>

      {/* BackToLoginLink -> BaseLink (공통 스타일) */}
      <div style={{ marginTop: '20px' }}>
        <BaseLink to={ROUTES.login}>로그인 페이지로 돌아가기</BaseLink>
      </div>
    </CenteredContainer>
  )
}

export default FindIdPwdPage