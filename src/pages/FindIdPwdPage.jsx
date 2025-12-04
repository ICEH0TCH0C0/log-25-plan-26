import { useUser } from '../customHooks/UserContext'
import { ROUTES } from '../route/RouteList'
import { FindContainer, FindBox, FindTitle, FindInput, FindButton, BackToLoginLink } from './FindIdPwdPage.styled'
import useInput from '../customHooks/useInput'

const FindIdPwdPage = () => {
  const { findUserId, findUserPwd } = useUser()

  const [nameForId, handleNameForId] = useInput('')
  const [phoneForId, handlePhoneForId] = useInput('')
  const [idForPwd, handleIdForPwd] = useInput('')

  const handleFindId = () => {
    if (!nameForId || !phoneForId) {
      alert('이름과 휴대폰 번호를 모두 입력해주세요.')
      return
    }
    const foundId = findUserId(nameForId, phoneForId)
    if (foundId) {
      alert(`회원님의 아이디는 [ ${foundId} ] 입니다.`)
    } else {
      alert('일치하는 사용자 정보가 없습니다.')
    }
  }

  const handleFindPwd = () => {
    if (!idForPwd) {
      alert('아이디를 입력해주세요.')
      return
    }
    const foundPwd = findUserPwd(idForPwd)
    if (foundPwd) {
      alert(`회원님의 비밀번호는 [ ${foundPwd} ] 입니다.`)
    } else {
      alert('일치하는 사용자 정보가 없습니다.')
    }
  }

  return (
    <FindContainer>
      <FindBox>
        <FindTitle>아이디 찾기</FindTitle>
        <FindInput type="text" placeholder="이름" value={nameForId} onChange={handleNameForId} />
        <FindInput type="tel" placeholder="휴대폰 번호" value={phoneForId} onChange={handlePhoneForId} />
        <FindButton onClick={handleFindId}>아이디 찾기</FindButton>
      </FindBox>
      <FindBox>
        <FindTitle>비밀번호 찾기</FindTitle>
        <FindInput type="text" placeholder="아이디" value={idForPwd} onChange={handleIdForPwd} />
        <FindButton onClick={handleFindPwd}>비밀번호 찾기</FindButton>
      </FindBox>
      <BackToLoginLink to={ROUTES.login}>로그인 페이지로 돌아가기</BackToLoginLink>
    </FindContainer>
  )
}

export default FindIdPwdPage