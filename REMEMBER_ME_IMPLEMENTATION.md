# 로그인 유지 기능 구현

## 📋 개요

"로그인 상태 유지" 체크박스를 통해 사용자가 브라우저를 닫았을 때 세션 유지 여부를 선택할 수 있습니다.

## 🔧 구현 방식

### 1. Storage 타입 선택

Supabase 클라이언트 생성 시 storage 타입을 동적으로 선택합니다.

| 상태 | Storage 타입 | 동작 |
|------|-------------|------|
| ✅ **로그인 유지 체크** | `localStorage` | 브라우저를 닫아도 세션 유지 |
| ❌ **로그인 유지 미체크** | `sessionStorage` | 브라우저/탭을 닫으면 세션 삭제 |

### 2. 코드 구조

#### `lib/supabase/client.ts`
```typescript
export const createClient = (useSessionStorage = false) => {
  // ...
  
  const storage = useSessionStorage 
    ? window.sessionStorage  // 로그인 유지 안 함
    : window.localStorage;   // 로그인 유지

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: storage,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  });
};
```

#### `app/auth/login/page.tsx`
```typescript
const [rememberMe, setRememberMe] = useState(true); // 기본값: 체크됨

const handleSubmit = async (e: React.FormEvent) => {
  // rememberMe가 false면 sessionStorage 사용
  const supabase = createClient(!rememberMe);
  
  // 로그인 로직...
};
```

## 🎯 사용자 경험

### ✅ 로그인 유지 체크 시 (기본값)
1. 로그인 성공 → `localStorage`에 세션 저장
2. 브라우저 닫기 → 세션 유지
3. 브라우저 재시작 → 여전히 로그인 상태
4. 수동 로그아웃까지 세션 유지

### ❌ 로그인 유지 미체크 시
1. 로그인 성공 → `sessionStorage`에 세션 저장
2. 브라우저/탭 닫기 → 세션 자동 삭제
3. 브라우저 재시작 → 로그아웃 상태
4. 보안이 중요한 공용 PC에서 유용

## 🧪 테스트 방법

### 테스트 1: 로그인 유지 체크 (localStorage)
1. 로그인 페이지에서 "로그인 상태 유지" **체크** ✅
2. 로그인 완료
3. 개발자 도구 → Application → Local Storage 확인
   - `sb-<project-ref>-auth-token` 항목이 있어야 함
4. 브라우저를 완전히 닫고 재시작
5. 사이트 접속 → **여전히 로그인 상태** ✅

### 테스트 2: 로그인 유지 미체크 (sessionStorage)
1. 로그인 페이지에서 "로그인 상태 유지" **체크 해제** ❌
2. 로그인 완료
3. 개발자 도구 → Application → Session Storage 확인
   - `sb-<project-ref>-auth-token` 항목이 있어야 함
4. 브라우저를 완전히 닫고 재시작
5. 사이트 접속 → **로그아웃 상태** ✅

### 테스트 3: 개발자 도구로 확인
```javascript
// 브라우저 콘솔에서 실행

// localStorage에 Supabase 토큰이 있는지 확인
console.log('localStorage:', localStorage.getItem('sb-<project-ref>-auth-token'));

// sessionStorage에 Supabase 토큰이 있는지 확인
console.log('sessionStorage:', sessionStorage.getItem('sb-<project-ref>-auth-token'));
```

## 🔐 보안 고려사항

### 1. 공용 PC 사용 시
- **반드시** "로그인 상태 유지" 체크 해제 권장
- sessionStorage 사용으로 브라우저 닫으면 자동 로그아웃

### 2. 개인 기기 사용 시
- "로그인 상태 유지" 체크로 편의성 향상
- localStorage 사용으로 세션 지속

### 3. 추가 보안 조치
- Supabase의 JWT 토큰은 자동으로 암호화됨
- RLS (Row Level Security) 정책으로 데이터 보호
- HTTPS 통신으로 전송 중 보안

## 📊 기술 스택

- **Supabase Auth**: 인증 시스템
- **localStorage/sessionStorage**: 브라우저 저장소
- **Next.js**: 프론트엔드 프레임워크
- **TypeScript**: 타입 안정성

## 🚀 추가 개선 가능 사항

1. **세션 만료 시간 설정**
   ```typescript
   // Supabase Dashboard에서 설정 가능
   // JWT expiry: 기본 3600초 (1시간)
   // Refresh token expiry: 기본 2592000초 (30일)
   ```

2. **자동 로그아웃 타이머**
   - 일정 시간 동안 활동이 없으면 자동 로그아웃
   - 보안 강화

3. **다중 기기 세션 관리**
   - 다른 기기에서 로그인 시 기존 세션 처리
   - 최대 동시 로그인 수 제한

## 📝 참고 문서

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [PKCE Flow](https://supabase.com/docs/guides/auth/server-side/creating-a-client)

## ❓ FAQ

**Q: 로그인 유지가 작동하지 않아요**
- A: 브라우저 설정에서 쿠키/localStorage가 차단되지 않았는지 확인하세요.

**Q: 세션이 너무 빨리 만료돼요**
- A: Supabase Dashboard → Authentication → Settings에서 JWT expiry 시간을 조정하세요.

**Q: sessionStorage는 어떤 경우에 삭제되나요?**
- A: 브라우저 탭을 닫을 때, 브라우저를 완전히 종료할 때 삭제됩니다.


