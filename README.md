# 일정 관리 애플리케이션 (Plan Management App)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
React와 `localStorage`/`sessionStorage`를 사용하여 구현한 간단한 일정 관리 웹 애플리케이션입니다. 사용자는 회원가입 및 로그인을 통해 자신만의 일정을 관리할 수 있습니다.

Currently, two official plugins are available:
## ✨ 주요 기능

- @vitejs/plugin-react uses Babel (or oxc when used in rolldown-vite) for Fast Refresh
- @vitejs/plugin-react-swc uses SWC for Fast Refresh
### 👤 사용자 관리
-   **회원가입**: 아이디, 비밀번호, 이름, 연락처, 이메일로 새로운 계정을 생성합니다.
-   **로그인/로그아웃**: 세션 스토리지를 활용하여 로그인 상태를 유지합니다.
-   **아이디/비밀번호 찾기**: 가입 시 입력한 정보를 바탕으로 계정 정보를 찾습니다.
-   **마이페이지**:
    -   가입된 사용자 정보를 수정할 수 있습니다.
    -   회원 탈퇴 기능이 구현되어 있습니다.

## React Compiler
### 📅 일정 관리 (CRUD)
-   **달력 연동**: 메인 페이지에서 `FullCalendar`를 통해 전체 일정을 한눈에 볼 수 있습니다.
-   **일정 조회**: 달력에서 특정 날짜를 클릭하면 해당 날짜의 상세 일정 페이지로 이동합니다.
-   **일정 추가**: 상세 페이지에서 '제목'과 '내용'을 입력하여 새로운 일정을 추가할 수 있습니다.
-   **일정 수정**: 기존 일정의 제목과 내용을 수정할 수 있습니다.
-   **일정 삭제**: 등록된 일정을 삭제할 수 있습니다.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see this documentation.
## 🛠️ 기술 스택
-   **Frontend**: React.js
-   **Styling**: styled-components
-   **State Management**: React Context API
-   **Routing**: React Router
-   **Calendar**: FullCalendar
-   **Build Tool**: Vite

## Expanding the ESLint configuration
## 🚀 실행 방법

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the TS template for information on how to integrate TypeScript and `typescript-eslint` in your project.
```bash
# 프로젝트 클론 후 종속성 설치
npm install

# 개발 서버 실행
npm run dev
```