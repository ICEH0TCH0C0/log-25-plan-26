import { useUser } from '../customHooks/UserContext'
import { ROUTES } from '../route/RouteList'
import { FindContainer, FindBox, FindTitle, FindInput, FindButton, BackToLoginLink } from './FindIdPwdPage.styled'
import useInput from '../customHooks/useInput'

const FindIdPwdPage = () => {
  const { findUserId, findUserPwd } = useUser()

  // [아이디 찾기용 변수]
  const [nameForId, handleNameForId] = useInput('')
  const [phoneForId, handlePhoneForId] = useInput('')

  // [비밀번호 찾기용 변수]
  const [idForPwd, handleIdForPwd] = useInput('')
  // 비번 찾을 때도 본인 확인을 위해 이름/폰번호 필요
  const [nameForPwd, handleNameForPwd] = useInput('') 
  const [phoneForPwd, handlePhoneForPwd] = useInput('')

  const handleFindId = async () => { 
    if (!nameForId || !phoneForId) {
      alert('이름과 휴대폰 번호를 모두 입력해주세요.')
      return
    }

    // 여기에 await 키워드 추가! (결과가 올 때까지 기다림)
    const foundId = await findUserId(nameForId, phoneForId)
    
    // 이제 foundId는 Promise가 아니라 진짜 문자열(아이디)이거나 null입니다.
    if (foundId) {
      alert(`회원님의 아이디는 [ ${foundId} ] 입니다.`)
    } else {
      alert('일치하는 사용자 정보가 없습니다.')
    }
  }

  const handleFindPwd = async () => {
    // 3가지 정보가 다 있는지 확인
    if (!idForPwd || !nameForPwd || !phoneForPwd) {
      alert('아이디, 이름, 휴대폰 번호를 모두 입력해주세요.')
      return
    }
    
    // 3가지 정보를 모두 전달
    const foundPwd = await findUserPwd(idForPwd, nameForPwd, phoneForPwd)
    
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
        
        {/* ▼ 추가된 입력창들 */}
        <FindInput type="text" placeholder="이름" value={nameForPwd} onChange={handleNameForPwd} />
        <FindInput type="tel" placeholder="휴대폰 번호" value={phoneForPwd} onChange={handlePhoneForPwd} />
        
        <FindButton onClick={handleFindPwd}>비밀번호 찾기</FindButton>
      </FindBox>
      <BackToLoginLink to={ROUTES.login}>로그인 페이지로 돌아가기</BackToLoginLink>
    </FindContainer>
  )
}

export default FindIdPwdPage