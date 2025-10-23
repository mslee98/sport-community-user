import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase URL과 Anon Key가 설정되지 않았습니다. .env.local 파일을 확인하세요.'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

