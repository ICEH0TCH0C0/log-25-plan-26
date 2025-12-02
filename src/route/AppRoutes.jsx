import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from './RouteList'
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
import FindIdPwdPage from '../pages/FindIdPwdPage'
import SignupPage from '../pages/SignupPage'
import DetailPage from '../pages/DetailPage'
import MyPage from '../pages/MyPage'
import ErrorPage from '../pages/ErrorPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.main} element={<MainPage />} />
        <Route path={ROUTES.findIdPwd} element={<FindIdPwdPage />} />
        <Route path={ROUTES.signup} element={<SignupPage />} />
        <Route path={ROUTES.detail} element={<DetailPage />} />
        <Route path={ROUTES.mypage} element={<MyPage />} />
        <Route path={ROUTES.error} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes