"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { showSuccessToast, showErrorToast, showWarningToast } from "@/lib/toast";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // 기본값을 true로 설정
  
  // Supabase 설정 체크
  const isSupabaseConfigured = 
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.id) {
      newErrors.id = "아이디를 입력해주세요";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Supabase 설정 확인
    if (!isSupabaseConfigured) {
      showErrorToast('Supabase가 설정되지 않았습니다. .env.local 파일을 확인하세요.');
      return;
    }

    setIsLoading(true);

    try {
      // rememberMe 값에 따라 적절한 storage를 사용하는 클라이언트 생성
      // rememberMe가 false면 sessionStorage 사용 (브라우저 닫으면 세션 삭제)
      const supabase = createClient(!rememberMe);

      // 1. ID로 UserInfo에서 이메일 조회
      const { data: userInfo, error: userError } = await supabase
        .from("UserInfo")
        .select("email, approval_yn, is_admin, role")
        .eq("id", formData.id)
        .single();

      if (userError || !userInfo) {
        setErrors({ id: "존재하지 않는 아이디입니다" });
        setIsLoading(false);
        return;
      }

      // 2. 승인 여부 체크
      if (!userInfo.approval_yn) {
        showWarningToast("관리자 승인 대기중입니다. 승인 후 로그인이 가능합니다.");
        setIsLoading(false);
        return;
      }

      // 3. Supabase Auth 로그인 (이메일/비밀번호)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: userInfo.email,
        password: formData.password,
      });

      if (authError) {
        setErrors({ password: "비밀번호가 올바르지 않습니다" });
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        throw new Error("로그인에 실패했습니다");
      }

      // 로그인 성공
      showSuccessToast("로그인되었습니다!");
      
      // 약간의 딜레이 후 페이지 이동 (토스트를 보여주기 위해)
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
    } catch (error: any) {
      console.error("Login error:", error);
      showErrorToast(`로그인 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex flex-col items-center">
              <img 
                src="/logo.png" 
                alt="스포츠 커뮤니티 로고" 
                className="mb-4 h-28 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-600 dark:text-slate-400">
              계정에 로그인하세요
            </p>
          </div>

          {/* Login Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:p-8">
            {/* Supabase Warning */}
            {!isSupabaseConfigured && (
              <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
                <div className="flex items-start space-x-2">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                      Supabase가 설정되지 않았습니다
                    </p>
                    <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
                      .env.local 파일에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정하세요.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ID */}
              <div>
                <label htmlFor="id" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  아이디
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="아이디를 입력하세요"
                  autoComplete="username"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
                />
                {errors.id && <p className="mt-1 text-sm text-red-500">{errors.id}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600"
                  />
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                    로그인 상태 유지
                  </span>
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  비밀번호 찾기
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-3.5 font-bold text-white transition-all hover:from-orange-600 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
              <span className="px-4 text-sm text-slate-500 dark:text-slate-400">또는</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center space-x-2 rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google로 계속하기</span>
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center space-x-2 rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub로 계속하기</span>
              </button>
            </div>

            {/* Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                계정이 없으신가요?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  회원가입
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

