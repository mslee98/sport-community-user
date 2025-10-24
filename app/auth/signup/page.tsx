"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { showSuccessToast, showErrorToast, showInfoToast } from "@/lib/toast";

const SignupPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    email: "",
    name: "",
    nickName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  
  // Supabase 설정 체크
  const isSupabaseConfigured = 
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // ID나 닉네임 변경 시 중복 체크 초기화
    if (name === "id") {
      setIsIdChecked(false);
      setIsIdAvailable(false);
    }
    if (name === "nickName") {
      setIsNicknameChecked(false);
      setIsNicknameAvailable(false);
    }
  };

  // 아이디 중복 체크
  const handleCheckId = async () => {
    if (!formData.id) {
      showErrorToast("아이디를 입력해주세요");
      return;
    }

    if (formData.id.length < 4) {
      showErrorToast("아이디는 4자 이상이어야 합니다");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.id)) {
      showErrorToast("아이디는 영문, 숫자, 언더스코어만 사용 가능합니다");
      return;
    }

    if (!isSupabaseConfigured) {
      showErrorToast("Supabase가 설정되지 않았습니다");
      return;
    }

    setIsCheckingId(true);

    try {
      const { data, error } = await supabase
        .from("UserInfo")
        .select("id")
        .eq("id", formData.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = 결과 없음 (사용 가능)
        throw error;
      }

      if (data) {
        setIsIdChecked(true);
        setIsIdAvailable(false);
        setErrors((prev) => ({ ...prev, id: "이미 사용중인 아이디입니다" }));
        showErrorToast("이미 사용중인 아이디입니다");
      } else {
        setIsIdChecked(true);
        setIsIdAvailable(true);
        setErrors((prev) => ({ ...prev, id: "" }));
        showSuccessToast("사용 가능한 아이디입니다");
      }
    } catch (error: any) {
      console.error("ID check error:", error);
      showErrorToast("중복 체크 중 오류가 발생했습니다");
    } finally {
      setIsCheckingId(false);
    }
  };

  // 닉네임 중복 체크
  const handleCheckNickname = async () => {
    if (!formData.nickName) {
      showErrorToast("닉네임을 입력해주세요");
      return;
    }

    if (formData.nickName.length < 2) {
      showErrorToast("닉네임은 2자 이상이어야 합니다");
      return;
    }

    if (!isSupabaseConfigured) {
      showErrorToast("Supabase가 설정되지 않았습니다");
      return;
    }

    setIsCheckingNickname(true);

    try {
      const { data, error } = await supabase
        .from("UserInfo")
        .select("nick_name")
        .eq("nick_name", formData.nickName)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setIsNicknameChecked(true);
        setIsNicknameAvailable(false);
        setErrors((prev) => ({ ...prev, nickName: "이미 사용중인 닉네임입니다" }));
        showErrorToast("이미 사용중인 닉네임입니다");
      } else {
        setIsNicknameChecked(true);
        setIsNicknameAvailable(true);
        setErrors((prev) => ({ ...prev, nickName: "" }));
        showSuccessToast("사용 가능한 닉네임입니다");
      }
    } catch (error: any) {
      console.error("Nickname check error:", error);
      showErrorToast("중복 체크 중 오류가 발생했습니다");
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 중복 체크 확인
    if (!isIdChecked || !isIdAvailable) {
      newErrors.id = "아이디 중복 체크를 해주세요";
    }

    if (!isNicknameChecked || !isNicknameAvailable) {
      newErrors.nickName = "닉네임 중복 체크를 해주세요";
    }

    // ID 검증
    if (!formData.id) {
      newErrors.id = "아이디를 입력해주세요";
    } else if (formData.id.length < 4) {
      newErrors.id = "아이디는 4자 이상이어야 합니다";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.id)) {
      newErrors.id = "아이디는 영문, 숫자, 언더스코어만 사용 가능합니다";
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다";
    }

    // 비밀번호 확인
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다";
    }

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    // 이름 검증
    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요";
    }

    // 닉네임 검증
    if (!formData.nickName) {
      newErrors.nickName = "닉네임을 입력해주세요";
    } else if (formData.nickName.length < 2) {
      newErrors.nickName = "닉네임은 2자 이상이어야 합니다";
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
      showErrorToast('Supabase가 설정되지 않았습니다. DATABASE_SCHEMA.md를 참고하세요.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Supabase Auth에 회원가입 (이메일/비밀번호)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("회원가입에 실패했습니다");
      }

      // 2. UserInfo 테이블에 추가 정보 저장
      const { error: insertError } = await supabase.from("UserInfo").insert({
        id: formData.id,
        uid: authData.user.id,
        email: formData.email,
        name: formData.name,
        nick_name: formData.nickName,
        level: 1,
        current_exp: 0,
        total_exp: 0,
        point_balance: 0,
        total_earned_point: 0,
        total_used_point: 0,
        role: "user",
        is_admin: false,
        approval_yn: false, // 관리자 승인 대기
      });

      if (insertError) {
        throw insertError;
      }

      // 성공
      showSuccessToast("회원가입이 완료되었습니다! 관리자 승인 후 로그인이 가능합니다.");
      
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (error: any) {
      console.error("Signup error:", error);
      
      if (error.message.includes("already registered")) {
        setErrors({ email: "이미 가입된 이메일입니다" });
        showErrorToast("이미 가입된 이메일입니다");
      } else {
        showErrorToast(`회원가입 중 오류가 발생했습니다: ${error.message}`);
      }
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
              새로운 계정을 만들어보세요
            </p>
          </div>

          {/* Signup Form */}
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
                      회원가입을 사용하려면 먼저 Supabase를 설정해야 합니다. DATABASE_SCHEMA.md를 참고하세요.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ID */}
              <div>
                <label htmlFor="id" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  아이디 *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="영문, 숫자, _ 사용 가능 (4자 이상)"
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
                  />
                  <button
                    type="button"
                    onClick={handleCheckId}
                    disabled={isCheckingId || !formData.id}
                    className={`shrink-0 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                      isIdChecked && isIdAvailable
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                    }`}
                  >
                    {isCheckingId ? "확인중..." : isIdChecked && isIdAvailable ? "✓ 완료" : "중복확인"}
                  </button>
                </div>
                {errors.id && <p className="mt-1 text-sm text-red-500">{errors.id}</p>}
                {isIdChecked && isIdAvailable && (
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    ✓ 사용 가능한 아이디입니다
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  비밀번호 *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="8자 이상 입력"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Password Confirm */}
              <div>
                <label htmlFor="passwordConfirm" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  비밀번호 확인 *
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="비밀번호 재입력"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
                />
                {errors.passwordConfirm && <p className="mt-1 text-sm text-red-500">{errors.passwordConfirm}</p>}
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="실명 입력"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Nickname */}
              <div>
                <label htmlFor="nickName" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  닉네임 *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="nickName"
                    name="nickName"
                    value={formData.nickName}
                    onChange={handleChange}
                    placeholder="커뮤니티에서 사용할 닉네임 (2자 이상)"
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
                  />
                  <button
                    type="button"
                    onClick={handleCheckNickname}
                    disabled={isCheckingNickname || !formData.nickName}
                    className={`shrink-0 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                      isNicknameChecked && isNicknameAvailable
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-orange-500 text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                    }`}
                  >
                    {isCheckingNickname ? "확인중..." : isNicknameChecked && isNicknameAvailable ? "✓ 완료" : "중복확인"}
                  </button>
                </div>
                {errors.nickName && <p className="mt-1 text-sm text-red-500">{errors.nickName}</p>}
                {isNicknameChecked && isNicknameAvailable && (
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    ✓ 사용 가능한 닉네임입니다
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-3.5 font-bold text-white transition-all hover:from-orange-600 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "처리중..." : "회원가입"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
              <span className="px-4 text-sm text-slate-500 dark:text-slate-400">또는</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                이미 계정이 있으신가요?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  로그인
                </Link>
              </p>
            </div>
          </div>

          {/* Info Notice */}
          <div className="mt-6 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950">
            <div className="flex items-start space-x-2">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-orange-800 dark:text-orange-300">
                회원가입 후 관리자 승인이 완료되면 로그인이 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

