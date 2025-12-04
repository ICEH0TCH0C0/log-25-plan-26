# 🗓️ 일정 관리 애플리케이션 (Plan Management App)

React와 `localStorage`, `sessionStorage`를 활용하여 구현한 개인 일정 관리 웹 애플리케이션입니다.
별도의 백엔드 서버 없이 브라우저 저장소를 사용하여 회원가입, 로그인, 그리고 개인별 일정 관리(CRUD) 기능을 제공합니다.

## 📝 프로젝트 개요

- **프로젝트명**: Log-25-Plan-26
- **주요 기능**: 사용자 계정 관리, 월별 캘린더 조회, 날짜별 일정 추가/수정/삭제
- **특징**: 
  - `FullCalendar` 라이브러리를 활용한 직관적인 달력 UI
  - `Context API`를 이용한 전역 상태 관리 (사용자 정보 및 일정 데이터)
  - `localStorage`를 이용한 데이터 영구 저장 (사용자 DB 역할)
  - `sessionStorage`를 이용한 로그인 세션 관리

---

## ✨ 주요 기능

### 1. 👤 사용자 관리 (User Management)
- **회원가입**: 아이디, 비밀번호, 이름, 연락처, 이메일을 입력하여 계정을 생성합니다.
- **로그인/로그아웃**:
  - `sessionStorage`를 통해 로그인 상태를 유지합니다.
  - 로그인 시 해당 사용자의 저장된 일정을 불러옵니다.
- **아이디/비밀번호 찾기**: 가입 시 입력한 이름, 연락처, 아이디를 기반으로 정보를 찾을 수 있습니다.
- **마이페이지**:
  - 내 정보(이름, 연락처, 이메일)를 수정할 수 있습니다.
  - 회원 탈퇴 기능을 제공하며, 탈퇴 시 데이터가 삭제됩니다.

### 2. 📅 일정 관리 (Plan Management)
- **캘린더 뷰**: 메인 페이지에서 전체 일정을 달력 형태로 한눈에 확인할 수 있습니다.
- **상세 일정 조회**: 달력의 특정 날짜를 클릭하면 해당 날짜의 일정 목록을 조회합니다.
- **일정 추가 (Create)**: 상세 페이지에서 제목과 내용을 입력하여 새 일정을 등록합니다.
- **일정 수정 (Update)**: 기존 일정의 내용을 수정할 수 있습니다.
- **일정 삭제 (Delete)**: 완료되거나 불필요한 일정을 삭제할 수 있습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 |
| --- | --- |
| **Frontend** | React (v19), Vite |
| **Language** | JavaScript (ES6+) |
| **Styling** | styled-components |
| **Routing** | React Router DOM (v7) |
| **State Management** | Context API |
| **Calendar** | FullCalendar |
| **Package Manager** | NPM |

---

## 📂 프로젝트 구조 (Directory Structure)

```bash
src
├── assets/          # 이미지 및 정적 파일
├── commonStyled/    # 공통 스타일 컴포넌트
├── components/      # 재사용 가능한 컴포넌트 (Calendar 등)
├── customHooks/     # 커스텀 훅 (UserContext, useInput 등)
├── pages/           # 페이지 컴포넌트
│   ├── LoginPage.jsx
│   ├── MainPage.jsx
│   ├── DetailPage.jsx
│   ├── MyPage.jsx
│   ├── SignupPage.jsx
│   ├── FindIdPwdPage.jsx
│   └── ErrorPage.jsx
├── route/           # 라우팅 설정 (AppRoutes, RouteList)
├── App.jsx          # 메인 앱 컴포넌트
└── main.jsx         # 진입점 (Entry Point)
```

---

## 🚀 실행 방법 (Getting Started)

이 프로젝트는 **Vite**를 기반으로 만들어졌으며, 실행을 위해 **Node.js** 환경이 필요합니다.

### 1. 프로젝트 클론 및 이동
터미널을 열고 프로젝트를 다운로드한 뒤 해당 폴더로 이동합니다.
```bash
git clone <repository-url>
cd log-25-plan-26
```

### 2. 필요한 라이브러리 다운로드
```bash
npm install
```

### 3. 개발 서버 실행!!!
```bash
npm run dev
```