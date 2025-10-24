import toast, { Toast } from "react-hot-toast";

// 강남언니 스타일 토스트 설정
const toastConfig = {
  duration: 3000,
  position: "top-center" as const,
  style: {
    borderRadius: "12px",
    padding: "16px 24px",
    fontSize: "14px",
    fontWeight: "500",
    maxWidth: "90vw",
  },
};

// 성공 토스트
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...toastConfig,
    style: {
      ...toastConfig.style,
      background: "#10b981",
      color: "#ffffff",
    },
    iconTheme: {
      primary: "#ffffff",
      secondary: "#10b981",
    },
  });
};

// 에러 토스트
export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...toastConfig,
    style: {
      ...toastConfig.style,
      background: "#ef4444",
      color: "#ffffff",
    },
    iconTheme: {
      primary: "#ffffff",
      secondary: "#ef4444",
    },
  });
};

// 경고 토스트
export const showWarningToast = (message: string) => {
  toast(message, {
    ...toastConfig,
    icon: "⚠️",
    style: {
      ...toastConfig.style,
      background: "#f59e0b",
      color: "#ffffff",
    },
  });
};

// 정보 토스트
export const showInfoToast = (message: string) => {
  toast(message, {
    ...toastConfig,
    icon: "ℹ️",
    style: {
      ...toastConfig.style,
      background: "#3b82f6",
      color: "#ffffff",
    },
  });
};

// 로딩 토스트
export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    ...toastConfig,
    style: {
      ...toastConfig.style,
      background: "#6b7280",
      color: "#ffffff",
    },
  });
};

// 로딩 토스트 해제
export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};

// 프로미스 토스트 (비동기 작업용)
export const showPromiseToast = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  }
) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    },
    {
      ...toastConfig,
      style: {
        ...toastConfig.style,
      },
      success: {
        style: {
          ...toastConfig.style,
          background: "#10b981",
          color: "#ffffff",
        },
        iconTheme: {
          primary: "#ffffff",
          secondary: "#10b981",
        },
      },
      error: {
        style: {
          ...toastConfig.style,
          background: "#ef4444",
          color: "#ffffff",
        },
        iconTheme: {
          primary: "#ffffff",
          secondary: "#ef4444",
        },
      },
      loading: {
        style: {
          ...toastConfig.style,
          background: "#6b7280",
          color: "#ffffff",
        },
      },
    }
  );
};

// 커스텀 토스트 (완전 커스텀 가능)
export const showCustomToast = (
  message: string,
  options?: {
    icon?: string;
    duration?: number;
    background?: string;
    color?: string;
  }
) => {
  toast(message, {
    ...toastConfig,
    duration: options?.duration || toastConfig.duration,
    icon: options?.icon,
    style: {
      ...toastConfig.style,
      background: options?.background || "#374151",
      color: options?.color || "#ffffff",
    },
  });
};

// 모든 토스트 닫기
export const dismissAllToasts = () => {
  toast.dismiss();
};

