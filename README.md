# 스포츠 커뮤니티 - 배팅 사이트 순위 & 랭킹

국내외 배팅 사이트들의 순위와 랭킹을 확인하고, 스포츠 커뮤니티에서 다양한 정보를 공유하는 플랫폼입니다.

## 🚀 기술 스택

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
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

### 4. Supabase 데이터베이스 타입 생성 (선택사항)

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
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   └── globals.css        # 글로벌 스타일
├── components/            # 재사용 가능한 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   └── Card.tsx
├── lib/                   # 유틸리티 및 설정
│   ├── supabase/         # Supabase 클라이언트 설정
│   │   ├── client.ts     # 브라우저 클라이언트
│   │   ├── server.ts     # 서버 클라이언트
│   │   └── middleware.ts # 미들웨어 헬퍼
│   └── utils.ts          # 공통 유틸리티 함수
├── types/                # TypeScript 타입 정의
│   ├── database.types.ts # Supabase 데이터베이스 타입
│   └── index.ts          # 공통 타입
├── middleware.ts         # Next.js 미들웨어
└── .env.local           # 환경 변수 (git에 추가하지 않음)
```

## 🎨 주요 기능

- ✅ 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ 다크 모드 지원
- ✅ Supabase 인증 통합
- ✅ 타입 안전성 (TypeScript)
- ✅ 재사용 가능한 컴포넌트
- ✅ SEO 최적화

## 🔐 환경 변수 없이 실행하기

Supabase 설정이 완료되지 않은 경우에도 프로젝트를 실행할 수 있습니다. 
미들웨어가 환경 변수가 없을 때 자동으로 건너뛰므로, 개발 중에는 문제없이 UI를 확인할 수 있습니다.

단, Supabase 기능(인증, 데이터베이스 등)을 사용하려면 환경 변수 설정이 필수입니다.

## 📚 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)

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
