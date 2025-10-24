"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface UserInfo {
  id: string;
  uid: string;
  email: string;
  name: string;
  nick_name: string;
  level: number;
  current_exp: number;
  total_exp: number;
  point_balance: number;
  role: string;
  is_admin: boolean;
  approval_yn: boolean;
}

interface AuthContextType {
  user: User | null;
  userInfo: UserInfo | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchUserInfo = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("UserInfo")
        .select("*")
        .eq("uid", userId)
        .single();

      if (error) {
        console.error("Error fetching user info:", error);
        return null;
      }

      return data as UserInfo;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const refreshUserInfo = async () => {
    if (user) {
      const info = await fetchUserInfo(user.id);
      setUserInfo(info);
    }
  };

  useEffect(() => {
    // 초기 세션 체크
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          const info = await fetchUserInfo(session.user.id);
          setUserInfo(info);
        }
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (session?.user) {
          setUser(session.user);
          const info = await fetchUserInfo(session.user.id);
          setUserInfo(info);
        } else {
          setUser(null);
          setUserInfo(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserInfo(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        loading,
        signOut,
        refreshUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

