# 프로젝트 초기 설정 가이드

이 문서는 스포츠 커뮤니티 프로젝트의 초기 설정을 완료하는 방법을 안내합니다.

## ✅ 완료된 설정

다음 설정들이 이미 완료되었습니다:

1. ✅ Next.js 16 프로젝트 초기화 (TypeScript, App Router, Tailwind CSS)
2. ✅ Supabase 클라이언트 라이브러리 설치
3. ✅ 기본 폴더 구조 생성 (`components/`, `lib/`, `types/`)
4. ✅ Supabase 클라이언트 설정 파일 생성
5. ✅ 미들웨어 설정 (환경 변수 없이도 실행 가능)
6. ✅ 기본 컴포넌트 생성 (Header, Footer, Button, Card)
7. ✅ 타입 정의 파일 생성
8. ✅ 유틸리티 함수 생성
9. ✅ 홈 페이지 UI 구현

## 🔧 다음 단계: Supabase 설정

### 1. Supabase 프로젝트 생성

1. [Supabase 대시보드](https://supabase.com/dashboard)에 접속
2. "New Project" 버튼 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전 선택
4. "Create new project" 클릭

### 2. API 키 확인

프로젝트가 생성되면:

1. 좌측 메뉴에서 `Settings` → `API` 선택
2. 다음 정보를 복사:
   - **Project URL**: `https://xxxxx.supabase.co` 형식
   - **anon public** key: 공개 API 키
   - **service_role** key: 서비스 역할 키 (보안에 주의!)

### 3. 환경 변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

## 🗄️ 데이터베이스 스키마 설정

### 기본 테이블 생성

Supabase SQL Editor에서 다음 쿼리를 실행하여 기본 테이블을 생성합니다:

```sql
-- 사이트 순위 테이블
CREATE TABLE sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  rating DECIMAL(3,2) DEFAULT 0.00,
  tier VARCHAR(1) CHECK (tier IN ('S', 'A', 'B', 'C', 'D')),
  category VARCHAR(100),
  logo_url TEXT,
  website_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 사용자 프로필 테이블
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 게시글 테이블
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category VARCHAR(100),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 댓글 테이블
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_sites_tier ON sites(tier);
CREATE INDEX idx_sites_rating ON sites(rating DESC);

-- RLS (Row Level Security) 활성화
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 기본 정책 설정 (읽기는 모두 가능)
CREATE POLICY "Sites are viewable by everyone" ON sites
  FOR SELECT USING (true);

CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);
```

### TypeScript 타입 자동 생성

데이터베이스 스키마가 완성되면 타입을 자동으로 생성할 수 있습니다:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts
```

프로젝트 ID는 Supabase 대시보드의 프로젝트 설정에서 확인할 수 있습니다.

## 🧪 테스트 실행

환경 변수 설정 후 개발 서버를 실행합니다:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📝 다음 작업 예정

- [ ] 인증 페이지 구현 (로그인, 회원가입)
- [ ] 순위 페이지 구현
- [ ] 커뮤니티 게시판 구현
- [ ] 관리자 대시보드 연동
- [ ] 사용자 프로필 페이지
- [ ] 댓글 시스템
- [ ] 좋아요/북마크 기능
- [ ] 검색 기능
- [ ] 필터링 및 정렬

## 🆘 문제 해결

### 환경 변수 에러
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 파일 내용이 올바르게 작성되었는지 확인
- 개발 서버를 재시작 (`Ctrl + C` 후 `npm run dev`)

### Supabase 연결 에러
- Supabase URL과 API 키가 올바른지 확인
- 네트워크 연결 상태 확인
- Supabase 프로젝트가 활성화되어 있는지 확인

### 빌드 에러
- `node_modules` 삭제 후 재설치: `rm -rf node_modules && npm install`
- `.next` 폴더 삭제: `rm -rf .next`

## 📚 참고 문서

- [Next.js 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)

---

문제가 발생하거나 도움이 필요하시면 이슈를 열어주세요!

