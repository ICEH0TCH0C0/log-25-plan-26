import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../customHooks/UserContext.jsx'
import { ROUTES } from '../route/RouteList.js'

// [수정] MyPage.styled에서는 레이아웃 관련만 가져옵니다.
// (만약 DeleteButton, UpdateButton이 없다면 BaseButton으로 대체 가능)
import { 
  MyPageHeader, 
  MyPageHeaderBtnContainer, 
  MyPageContent, 
  MyPageItem,
  DeleteButton,  // MyPage.styled.js에 정의해두셨다면 사용
  UpdateButton   // MyPage.styled.js에 정의해두셨다면 사용
} from './MyPage.styled'

// [수정] 공통 스타일 사용 (Input -> BaseInput, Container -> WideContainer 등)
import { 
  WideContainer, 
  PageTitle, 
  BaseInput, 
  BaseButton, 
  Strong 
} from '../commonStyled/common.styled'

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
    // MyPageContainer -> WideContainer
    <WideContainer>
      <MyPageHeader>
        {/* MyPageTitle -> PageTitle */}
        <PageTitle style={{ marginBottom: 0, fontSize: '24px' }}>마이 페이지</PageTitle>
        <MyPageHeaderBtnContainer>
          <UpdateButton onClick={handleUpdate}>수정하기</UpdateButton>
          <DeleteButton onClick={handleDelete}>탈퇴하기</DeleteButton>
          <BaseButton onClick={() => window.history.back()}>뒤로가기</BaseButton>
        </MyPageHeaderBtnContainer>
      </MyPageHeader>

      <MyPageContent>
        <MyPageItem>
          <Strong>이름 : </Strong>
          {/* Input -> BaseInput */}
          <BaseInput 
            type="text" 
            name="userName" 
            value={userInfo.userName} 
            onChange={handleInputChange}
            style={{ width: '60%', marginBottom: 0, textAlign: 'right', border: 'none', background: 'transparent' }}
          />
        </MyPageItem>
        <MyPageItem>
          <Strong>아이디 : </Strong>
          <BaseInput 
            type="text" 
            name="userId" 
            value={userInfo.userId} 
            readOnly 
            style={{ width: '60%', marginBottom: 0, textAlign: 'right', border: 'none', background: 'transparent', cursor: 'not-allowed' }}
          />
        </MyPageItem>
        <MyPageItem>
          <Strong>휴대폰 번호 : </Strong>
          <BaseInput 
            type="text" 
            name="userPhone" 
            value={userInfo.userPhone} 
            onChange={handleInputChange}
            style={{ width: '60%', marginBottom: 0, textAlign: 'right', border: 'none', background: 'transparent' }}
          />
        </MyPageItem>
        <MyPageItem>
          <Strong>이메일 : </Strong>
          <BaseInput 
            type="text" 
            name="userEmail" 
            value={userInfo.userEmail} 
            onChange={handleInputChange}
            style={{ width: '60%', marginBottom: 0, textAlign: 'right', border: 'none', background: 'transparent' }}
          />
        </MyPageItem>
      </MyPageContent>
    </WideContainer>
  )
}

export default MyPage