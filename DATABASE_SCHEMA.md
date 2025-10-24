# Database Schema

## Supabase 데이터베이스 스키마

### 1. UserInfo 테이블

```sql
CREATE TABLE public."UserInfo" (
  id character varying PRIMARY KEY,  -- 로그인용 아이디 (unique)
  uid uuid REFERENCES auth.users(id) ON DELETE CASCADE,  -- Supabase Auth FK
  email character varying NOT NULL,  -- 이메일 (auth.users.email과 동기화)
  name character varying NOT NULL,  -- 회원 이름
  nick_name character varying NOT NULL,  -- 회원 별명
  level integer DEFAULT 1,  -- 회원 레벨
  current_exp integer DEFAULT 0,  -- 현재 경험치
  total_exp integer DEFAULT 0,  -- 전체 경험치
  point_balance integer DEFAULT 0,  -- 포인트 잔액
  total_earned_point integer DEFAULT 0,  -- 총 획득 포인트
  total_used_point integer DEFAULT 0,  -- 총 사용 포인트
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),  -- 권한
  is_admin boolean DEFAULT false,  -- 관리자 여부
  approval_yn boolean DEFAULT false,  -- 가입 승인 여부
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Indexes
CREATE UNIQUE INDEX "UserInfo_id_key" ON public."UserInfo"(id);
CREATE UNIQUE INDEX "UserInfo_uid_key" ON public."UserInfo"(uid);
CREATE UNIQUE INDEX "UserInfo_email_key" ON public."UserInfo"(email);
CREATE INDEX "UserInfo_approval_yn_idx" ON public."UserInfo"(approval_yn);

-- Enable RLS
ALTER TABLE public."UserInfo" ENABLE ROW LEVEL SECURITY;
```

### 2. Row Level Security (RLS) 정책

```sql
-- 모든 사용자가 자신의 정보를 조회할 수 있음
CREATE POLICY "Users can view own info"
ON public."UserInfo"
FOR SELECT
USING (auth.uid() = uid);

-- 회원가입 시 누구나 INSERT 가능
CREATE POLICY "Anyone can insert during signup"
ON public."UserInfo"
FOR INSERT
WITH CHECK (true);

-- 자신의 정보만 업데이트 가능 (단, role과 is_admin은 제외)
CREATE POLICY "Users can update own info"
ON public."UserInfo"
FOR UPDATE
USING (auth.uid() = uid)
WITH CHECK (auth.uid() = uid);

-- 관리자는 모든 정보 조회 가능
CREATE POLICY "Admins can view all"
ON public."UserInfo"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public."UserInfo"
    WHERE uid = auth.uid() AND is_admin = true
  )
);

-- 관리자는 approval_yn 업데이트 가능
CREATE POLICY "Admins can approve users"
ON public."UserInfo"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public."UserInfo"
    WHERE uid = auth.uid() AND is_admin = true
  )
);
```

### 3. 자동 업데이트 트리거

```sql
-- updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_userinfo_updated_at
BEFORE UPDATE ON public."UserInfo"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

## 인증 플로우

### 회원가입

1. 클라이언트에서 ID 중복 체크 (`UserInfo` 테이블 조회)
2. `supabase.auth.signUp()` 호출 (이메일/비밀번호)
3. 반환된 `uid`로 `UserInfo` 테이블에 추가 정보 삽입
4. `approval_yn = false` 상태로 저장 (관리자 승인 대기)

### 로그인

1. 클라이언트에서 입력한 ID로 `UserInfo` 테이블에서 이메일 조회
2. `approval_yn` 체크 (승인되지 않은 경우 로그인 차단)
3. 조회된 이메일과 비밀번호로 `supabase.auth.signInWithPassword()` 호출

### 세션 관리

- Supabase Auth의 자동 세션 관리 사용
- JWT 토큰 자동 갱신
- `middleware.ts`에서 세션 업데이트 처리

## 초기 관리자 계정 생성

```sql
-- 첫 관리자 계정은 직접 DB에서 설정
UPDATE public."UserInfo"
SET 
  is_admin = true,
  role = 'super_admin',
  approval_yn = true
WHERE id = 'admin';
```

## 마이그레이션 순서

1. Supabase 프로젝트 생성
2. SQL Editor에서 위 스키마 실행
3. RLS 정책 적용
4. 트리거 생성
5. 초기 관리자 계정 설정
6. `.env.local`에 환경 변수 설정

## 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

