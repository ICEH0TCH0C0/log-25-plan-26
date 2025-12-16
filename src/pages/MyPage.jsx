import React, { useState } from 'react'
import { Input, MyPagebackBtn, MyPageContainer, MyPageContent, MyPageDeleteBtn, MyPageHeader, MyPageHeaderBtnContainer, MyPageItem, MyPageTitle, MyPageUpdateBtn } from './MyPage.styled'
import { Strong } from '../commonStyled/common.styled'
import { useUser } from '../customHooks/UserContext.jsx'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../route/RouteList.js'

const MyPage = () => {
  const { currentUser, deleteUser, updateUser } = useUser();
  const [userInfo, setUserInfo] = useState(currentUser || {});
  const nav = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    const isSuccess = await updateUser(userInfo);
  
    if (isSuccess) {
      alert('수정되었습니다.');
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('정말로 탈퇴하시겠습니까? (복구할 수 없습니다)')) {
      return;
    }

    const isSuccess = await deleteUser(userInfo.userNo); 
      
    if (isSuccess) {
      alert('탈퇴되었습니다. 이용해 주셔서 감사합니다.');
      nav(ROUTES.login);
    }
  }

  return (
    <MyPageContainer>
      <MyPageHeader>
        <MyPageTitle>마이 페이지</MyPageTitle>
        <MyPageHeaderBtnContainer>
          <MyPageUpdateBtn onClick={handleUpdate}>수정하기</MyPageUpdateBtn>
          <MyPageDeleteBtn onClick={handleDelete}>탈퇴하기</MyPageDeleteBtn>
          <MyPagebackBtn onClick={() => window.history.back()}>뒤로가기</MyPagebackBtn>
        </MyPageHeaderBtnContainer>
      </MyPageHeader>
      <MyPageContent>
        <MyPageItem>
          <Strong>이름 : <Input type="text" name="userName" value={userInfo.userName} onChange={handleInputChange}/></Strong>
        </MyPageItem>
        <MyPageItem>
          <Strong>아이디 : <Input type="text" name="userId" value={userInfo.userId} onChange={handleInputChange} readOnly /></Strong>
        </MyPageItem>
        <MyPageItem>
          <Strong>휴대폰 번호 : <Input type="text" name="userPhone" value={userInfo.userPhone} onChange={handleInputChange}/></Strong>
        </MyPageItem>
        <MyPageItem>
          <Strong>이메일 : <Input type="text" name="userEmail" value={userInfo.userEmail} onChange={handleInputChange}/></Strong>
        </MyPageItem>
      </MyPageContent>
    </MyPageContainer>
  )
}

export default MyPage