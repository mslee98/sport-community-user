import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase 브라우저 클라이언트 생성
 * @param useSessionStorage - true면 sessionStorage 사용 (브라우저 닫으면 세션 삭제)
 */
export const createClient = (useSessionStorage = false) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      '⚠️ Supabase URL과 Anon Key가 설정되지 않았습니다. 인증 기능을 사용하려면 .env.local 파일을 설정하세요.'
    );
    // 환경 변수가 없으면 더미 클라이언트 반환
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    );
  }

  // 로그인 유지 여부에 따라 storage 선택
  const storage = useSessionStorage 
    ? (typeof window !== 'undefined' ? window.sessionStorage : undefined)
    : (typeof window !== 'undefined' ? window.localStorage : undefined);

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: storage,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  });
};

