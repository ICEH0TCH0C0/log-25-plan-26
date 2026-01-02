import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Calendar from '../components/Calendar.jsx'
import { useUserStore } from '../store/useUserStore'
import { ROUTES } from '../route/RouteList.js'
import { Header, HeaderButton, HeaderTitle, PageContainer } from './MainPage.styled.js'

const MainPage = () => {
  const { id } = useParams()
  const { currentUser, logout } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    // currentUser가 null이 아닐 때(즉, 로그아웃 과정이 아닐 때)만 접근 권한을 확인합니다.
    if (currentUser && String(currentUser.userNo) !== id) {
      alert('잘못된 접근입니다. 로그인 페이지로 이동합니다.')
      logout() // 혹시 모를 세션 정보를 정리
      navigate(ROUTES.login)
    }
  }, [currentUser, id, navigate, logout]);

  const handleLogout = () => {
    logout()
    alert('로그아웃 되었습니다.')
    navigate(ROUTES.login)
  }

  const handleMyPage = () => {
    navigate(`/mypage/${currentUser.id}`)
  }

  return (
    <PageContainer>
      <Header>
        <HeaderTitle>{currentUser ? `${currentUser.userName}님의 캘린더` : '캘린더'}</HeaderTitle>
        <div>
          <HeaderButton onClick={handleMyPage}>마이 페이지</HeaderButton>
          <HeaderButton onClick={handleLogout}>로그아웃</HeaderButton>
        </div>
      </Header>
      <Calendar />
    </PageContainer>
  )
}

export default MainPage