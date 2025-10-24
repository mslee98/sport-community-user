# Supabase 설정 가이드

현재 Supabase가 설정되지 않아 인증 기능을 사용할 수 없습니다. 아래 단계를 따라 설정해주세요.

## 🚀 빠른 시작

### 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 접속 및 회원가입
2. "New Project" 클릭
3. 프로젝트 이름 입력 (예: sport-commu)
4. 데이터베이스 비밀번호 설정 (잘 기억해두세요!)
5. 지역 선택 (Northeast Asia (Seoul) 권장)
6. 프로젝트 생성 완료 대기 (약 2분)

### 2. API 키 확인

프로젝트 생성 후:

1. Supabase Dashboard → **Settings** → **API**로 이동
2. 다음 정보를 복사:
   - **Project URL** (예: `https://xxxxx.supabase.co`)
   - **anon public** key (눈 아이콘 클릭하여 전체 키 확인)

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 복사한 정보를 입력:

```bash
# .env.local 파일 생성
touch .env.local
```

`.env.local` 파일 내용:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ 주의**: 
- `your-project-id`와 `your-anon-key-here`를 실제 값으로 교체하세요
- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (.gitignore에 포함되어 있음)

### 4. 데이터베이스 스키마 생성

1. Supabase Dashboard → **SQL Editor** 클릭
2. "New query" 클릭
3. `DATABASE_SCHEMA.md` 파일의 SQL을 복사
4. SQL Editor에 붙여넣기
5. "Run" 버튼 클릭하여 실행

필요한 SQL:
- UserInfo 테이블 생성
- Indexes 생성
- RLS (Row Level Security) 정책 설정
- 트리거 생성

### 5. 개발 서버 재시작

환경 변수를 적용하려면 개발 서버를 재시작해야 합니다:

```bash
# Ctrl+C로 서버 중지 후
npm run dev
```

### 6. 테스트

1. 브라우저에서 [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup) 접속
2. 경고 메시지가 사라졌는지 확인
3. 회원가입 테스트

## 🔐 초기 관리자 계정 설정

회원가입 후 첫 계정을 관리자로 만들려면:

1. Supabase Dashboard → **Table Editor** → **UserInfo**
2. 방금 가입한 계정 찾기
3. 다음 필드 수정:
   - `is_admin`: `false` → `true`
   - `role`: `user` → `super_admin`
   - `approval_yn`: `false` → `true`
4. Save 클릭

또는 SQL Editor에서:

```sql
UPDATE public."UserInfo"
SET 
  is_admin = true,
  role = 'super_admin',
  approval_yn = true
WHERE id = 'your-user-id';
```

## 📝 환경 변수 확인

환경 변수가 제대로 설정되었는지 확인:

```bash
# 터미널에서 실행
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

값이 출력되지 않으면:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일 이름이 정확히 `.env.local`인지 확인 (`.env`가 아님)
3. 개발 서버 재시작

## 🐛 문제 해결

### "Supabase가 설정되지 않았습니다" 경고가 계속 나타남

- 개발 서버를 재시작했는지 확인
- `.env.local` 파일이 올바른 위치에 있는지 확인
- 환경 변수 이름이 정확한지 확인 (`NEXT_PUBLIC_` 접두사 포함)

### 회원가입 시 "already registered" 에러

- 이미 가입된 이메일입니다
- 다른 이메일로 시도하거나
- Supabase Dashboard → Authentication → Users에서 삭제 후 재시도

### 로그인 시 "관리자 승인 대기중" 메시지

- 정상입니다! 위의 "초기 관리자 계정 설정" 섹션을 따라하세요
- `approval_yn`을 `true`로 변경하면 로그인 가능

### 테이블을 찾을 수 없다는 에러

- `DATABASE_SCHEMA.md`의 SQL을 실행했는지 확인
- Supabase Dashboard → Table Editor에서 `UserInfo` 테이블이 있는지 확인

## 📚 더 알아보기

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- `DATABASE_SCHEMA.md` - 데이터베이스 상세 정보
- `README.md` - 프로젝트 전체 가이드

## ⚡ 빠른 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] API URL과 Anon Key 복사
- [ ] `.env.local` 파일 생성 및 환경 변수 설정
- [ ] `DATABASE_SCHEMA.md`의 SQL 실행
- [ ] 개발 서버 재시작
- [ ] 회원가입 테스트
- [ ] 첫 계정을 관리자로 설정
- [ ] 로그인 테스트

모든 체크리스트를 완료하면 인증 시스템을 사용할 수 있습니다! 🎉

