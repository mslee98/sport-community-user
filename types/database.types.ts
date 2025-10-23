// Supabase에서 생성된 타입을 여기에 추가합니다.
// npx supabase gen types typescript --project-id your-project-id > types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // 여기에 테이블 타입들을 추가합니다
    };
    Views: {
      // 여기에 뷰 타입들을 추가합니다
    };
    Functions: {
      // 여기에 함수 타입들을 추가합니다
    };
    Enums: {
      // 여기에 Enum 타입들을 추가합니다
    };
  };
}

