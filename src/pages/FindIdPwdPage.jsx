import { useUser } from '../customHooks/UserContext'
import { ROUTES } from '../route/RouteList'
import { FindBox } from './FindIdPwdPage.styled' 
import { CenteredContainer, PageTitle, BaseInput, BaseButton, BaseLink } from '../commonStyled/common.styled'
import useInput from '../customHooks/useInput'

const FindIdPwdPage = () => {
  const { findUserId, findUserPwd } = useUser()

  // [아이디 찾기용 변수]
  const [nameForId, handleNameForId] = useInput('')
  const [phoneForId, handlePhoneForId] = useInput('')

  // [비밀번호 찾기용 변수]
  const [idForPwd, handleIdForPwd] = useInput('')
  const [nameForPwd, handleNameForPwd] = useInput('') 
  const [phoneForPwd, handlePhoneForPwd] = useInput('')

  const handleFindId = async () => { 
    if (!nameForId || !phoneForId) {
      alert('이름과 휴대폰 번호를 모두 입력해주세요.')
      return
    }

    const foundId = await findUserId(nameForId, phoneForId)
    
    if (foundId) {
      alert(`회원님의 아이디는 [ ${foundId} ] 입니다.`)
    } else {
      alert('일치하는 사용자 정보가 없습니다.')
    }
  }

  const handleFindPwd = async () => {
    if (!idForPwd || !nameForPwd || !phoneForPwd) {
      alert('아이디, 이름, 휴대폰 번호를 모두 입력해주세요.')
      return
    }
    
    const foundPwd = await findUserPwd(idForPwd, nameForPwd, phoneForPwd)
    
    if (foundPwd) {
      alert(`회원님의 비밀번호는 [ ${foundPwd} ] 입니다.`)
    } else {
      alert('일치하는 사용자 정보가 없습니다.')
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
        <PageTitle style={{ fontSize: '22px', margin: '0 0 10px 0' }}>비밀번호 찾기</PageTitle>
        <BaseInput type="text" placeholder="아이디" value={idForPwd} onChange={handleIdForPwd} />
        <BaseInput type="text" placeholder="이름" value={nameForPwd} onChange={handleNameForPwd} />
        <BaseInput type="tel" placeholder="휴대폰 번호" value={phoneForPwd} onChange={handlePhoneForPwd} />
        <BaseButton onClick={handleFindPwd}>비밀번호 찾기</BaseButton>
      </FindBox>

      {/* BackToLoginLink -> BaseLink (공통 스타일) */}
      <div style={{ marginTop: '20px' }}>
        <BaseLink to={ROUTES.login}>로그인 페이지로 돌아가기</BaseLink>
      </div>
    </CenteredContainer>
  )
}

export default FindIdPwdPage