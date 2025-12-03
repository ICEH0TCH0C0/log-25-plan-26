import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../route/RouteList'
import { ErrorContainer, ErrorTitle, ErrorMessage, HomeButton } from './ErrorPage.styled'
import { useUser } from '../customHooks/UserContext'

const ErrorPage = () => {
  const navigate = useNavigate()
  const { logout } = useUser()

  const handleGoToLogin = () => {
    logout() // 세션에서 사용자 정보를 제거합니다.
    navigate(ROUTES.login) // 로그인 페이지로 이동합니다.
  }

  return (
    <ErrorContainer>
      <ErrorTitle>페이지를 찾을 수 없습니다.</ErrorTitle>
      <ErrorMessage>요청하신 페이지가 존재하지 않거나, 잘못된 경로입니다.</ErrorMessage>
      <HomeButton onClick={handleGoToLogin}>로그인 페이지로 돌아가기</HomeButton>
    </ErrorContainer>
  )
}

export default ErrorPage