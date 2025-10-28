# 스포츠 커뮤니티 - 배팅 사이트 순위 & 랭킹

국내외 배팅 사이트들의 순위와 랭킹을 확인하고, 스포츠 커뮤니티에서 다양한 정보를 공유하는 플랫폼입니다.

## 🚀 기술 스택

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **UI Components**: Custom components with Tailwind CSS
- **Notifications**: [react-hot-toast](https://react-hot-toast.com/)
- **Deployment**: Vercel (권장)

## 📋 사전 요구사항

- Node.js 18.x 이상
- npm, yarn, pnpm 또는 bun
- Supabase 계정 (무료)

## 🛠️ 설치 및 설정

### 1. 저장소 클론 및 의존성 설치

```bash
# 의존성 설치
npm install
```

### 2. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com/)에 가입하고 새 프로젝트를 생성합니다.
2. 프로젝트 설정에서 API 키를 확인합니다:
   - `Settings` → `API` → `Project URL`
   - `Settings` → `API` → `anon public` key

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **참고**: `.env.example` 파일을 참고하여 작성할 수 있습니다.

### 4. 데이터베이스 스키마 설정

`DATABASE_SCHEMA.md` 파일을 참고하여 Supabase SQL Editor에서 스키마를 생성합니다:

1. Supabase Dashboard → SQL Editor
2. `DATABASE_SCHEMA.md`의 SQL 실행
3. UserInfo 테이블 및 RLS 정책 생성
4. 초기 관리자 계정 설정

### 5. Supabase 데이터베이스 타입 생성 (선택사항)

Supabase CLI를 사용하여 타입을 자동 생성할 수 있습니다:

```bash
npx supabase gen types typescript --project-id your-project-id > types/database.types.ts
```

## 🏃 실행하기

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

### 린트 실행

```bash
npm run lint
```

## 📁 프로젝트 구조

```
sport-commu-usr/
├── app/                    # Next.js App Router 디렉토리
│   ├── auth/              # 인증 관련 페이지
│   │   ├── login/        # 로그인 페이지
│   │   ├── signup/       # 회원가입 페이지
│   │   └── forgot-password/ # 비밀번호 재설정
│   ├── rankings/         # 순위 페이지
│   ├── community/        # 커뮤니티 페이지
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 홈 페이지
│   └── globals.css       # 글로벌 스타일
├── components/            # 재사용 가능한 컴포넌트
│   ├── Header.tsx        # 헤더 (YouTube 스타일)
│   ├── Footer.tsx        # 푸터
│   ├── EventBanner.tsx   # 이벤트 배너 캐러셀
│   ├── UpdateNote.tsx    # 주간 업데이트 노트
│   ├── RankingCard.tsx   # 순위 카드
│   ├── Button.tsx        # 버튼 컴포넌트
│   └── Badge.tsx         # 배지 컴포넌트
├── lib/                   # 유틸리티 및 설정
│   ├── supabase/         # Supabase 클라이언트 설정
│   │   ├── client.ts     # 브라우저 클라이언트
│   │   ├── server.ts     # 서버 클라이언트
│   │   └── middleware.ts # 미들웨어 헬퍼
│   └── utils.ts          # 공통 유틸리티 함수
├── types/                # TypeScript 타입 정의
│   ├── database.types.ts # Supabase 데이터베이스 타입
│   └── index.ts          # 공통 타입
├── middleware.ts         # Next.js 미들웨어 (세션 관리)
├── DATABASE_SCHEMA.md    # 데이터베이스 스키마 가이드
└── .env.local           # 환경 변수 (git에 추가하지 않음)
```

## 🎨 주요 기능

### UI/UX
- ✅ 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ 다크 모드 지원
- ✅ YouTube 스타일 헤더 및 네비게이션
- ✅ 이벤트 배너 캐러셀 (5개 슬라이드)
- ✅ 주간 업데이트 노트
- ✅ 프로모션별 순위 카드 (6개 카테고리)

### 인증 시스템
- ✅ ID 기반 로그인 (이메일 로그인과 연동)
- ✅ **로그인 유지 기능** (localStorage/sessionStorage)
  - 체크 시: 브라우저 닫아도 세션 유지
  - 미체크 시: 브라우저 닫으면 자동 로그아웃
- ✅ ID/닉네임 중복 체크 (회원가입 시)
- ✅ 회원가입 (관리자 승인 방식)
- ✅ 비밀번호 재설정
- ✅ Toast 알림 시스템 (성공/에러/경고/정보)
- ✅ 사용자 프로필 드롭다운 (My Profile, Settings, Sign Out)
- ✅ 소셜 로그인 지원 예정 (Google, GitHub)
- ✅ 레벨/경험치/포인트 시스템
- ✅ 권한 관리 (user, admin, super_admin)

### 기술
- ✅ 타입 안전성 (TypeScript)
- ✅ 재사용 가능한 컴포넌트
- ✅ SEO 최적화
- ✅ Supabase RLS (Row Level Security)

## 🔐 환경 변수 없이 실행하기

Supabase 설정이 완료되지 않은 경우에도 프로젝트를 실행할 수 있습니다. 
미들웨어가 환경 변수가 없을 때 자동으로 건너뛰므로, 개발 중에는 문제없이 UI를 확인할 수 있습니다.

단, Supabase 기능(인증, 데이터베이스 등)을 사용하려면 환경 변수 설정이 필수입니다.

## 🔐 인증 시스템

### 회원가입 플로우

1. `/auth/signup` 페이지에서 회원정보 입력
   - ID (로그인용, 4자 이상, 영문/숫자/언더스코어)
   - 이메일
   - 비밀번호 (8자 이상)
   - 이름
   - 닉네임 (2자 이상)

2. Supabase Auth에 이메일/비밀번호로 계정 생성

3. UserInfo 테이블에 추가 정보 저장
   - `approval_yn = false` (관리자 승인 대기)
   - 기본 레벨 1, 포인트 0으로 시작

4. 관리자 승인 후 로그인 가능

### 로그인 플로우

1. `/auth/login` 페이지에서 ID와 비밀번호 입력

2. "로그인 상태 유지" 체크박스 선택 (기본: 체크됨)
   - **체크 시**: `localStorage` 사용 → 브라우저 닫아도 유지
   - **미체크 시**: `sessionStorage` 사용 → 브라우저 닫으면 자동 로그아웃

3. ID로 UserInfo 테이블에서 이메일 조회

4. `approval_yn` 체크 (승인되지 않은 경우 차단)

5. Supabase Auth로 이메일/비밀번호 인증

6. 선택한 storage 타입으로 세션 저장

7. 홈으로 리다이렉트

> **로그인 유지 기능 상세 설명**: `REMEMBER_ME_IMPLEMENTATION.md` 참고

### 관리자 기능

- 회원 승인/거부
- 권한 변경 (user ↔ admin)
- 레벨/경험치/포인트 조정

자세한 내용은 `DATABASE_SCHEMA.md`를 참고하세요.

## 📚 프로젝트 문서

- **`DATABASE_SCHEMA.md`**: 데이터베이스 스키마 및 테이블 구조
- **`SUPABASE_SETUP.md`**: Supabase 프로젝트 설정 가이드
- **`REMEMBER_ME_IMPLEMENTATION.md`**: 로그인 유지 기능 구현 상세 설명

## 📚 외부 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)
- [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [react-hot-toast 문서](https://react-hot-toast.com/)

## 🚀 배포하기

### Vercel로 배포

1. [Vercel](https://vercel.com)에 가입
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 배포 버튼 클릭

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sport-commu-usr)

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 🤝 기여하기

기여는 언제나 환영합니다! 이슈나 PR을 자유롭게 제출해주세요.
