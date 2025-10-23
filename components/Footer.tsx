import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-lg font-bold text-white">S</span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                스포츠 커뮤니티
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              국내외 배팅 사이트 순위와 랭킹 정보를 제공하는 커뮤니티 플랫폼
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
              메뉴
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/rankings"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  순위
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  소개
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
              고객지원
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  고객센터
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
              법적고지
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-700">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            © 2025 스포츠 커뮤니티. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

