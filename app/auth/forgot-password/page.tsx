"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const ForgotPasswordPage = () => {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("이메일을 입력해주세요");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("올바른 이메일 형식이 아닙니다");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      showSuccessToast("비밀번호 재설정 링크를 이메일로 보냈습니다!");
    } catch (error: any) {
      console.error("Password reset error:", error);
      setError("비밀번호 재설정 이메일 전송에 실패했습니다");
      showErrorToast("비밀번호 재설정 이메일 전송에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex min-h-screen items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    className="h-8 w-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
                이메일을 확인하세요
              </h2>
              <p className="mb-6 text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-orange-600 dark:text-orange-400">{email}</span>
                <br />
                으로 비밀번호 재설정 링크를 보냈습니다.
                <br />
                이메일을 확인하고 링크를 클릭해주세요.
              </p>

              <Link
                href="/auth/login"
                className="inline-block w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-3 font-bold text-white transition-all hover:from-orange-600 hover:to-amber-700"
              >
                로그인으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              비밀번호를 재설정하세요
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:p-8">
            <div className="mb-6">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-3.5 font-bold text-white transition-all hover:from-orange-600 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "전송 중..." : "재설정 링크 보내기"}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
              >
                ← 로그인으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

