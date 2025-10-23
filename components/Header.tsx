"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/rankings?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    { href: "/", label: "개인", icon: "🏠" },
    { href: "/rankings", label: "e스포츠", icon: "🎮" },
    { href: "/rankings?category=스포츠", label: "스포츠", icon: "⚽" },
    { href: "/rankings?category=엔터", label: "엔터+", icon: "🎵" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Menu + Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleMenu}
            className="flex items-center justify-center rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="메뉴"
          >
            <svg
              className="h-6 w-6 text-slate-700 dark:text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-black dark:bg-white">
              <span className="text-lg font-bold text-white dark:text-black">S</span>
            </div>
            <span className="hidden text-xl font-bold text-slate-900 dark:text-white sm:block">
              슈퍼랭킹
            </span>
          </Link>
        </div>

        {/* Center: Navigation (Desktop only) */}
        <nav className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 rounded-lg px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Center: Search Bar (Desktop) */}
        <div className="mx-4 hidden flex-1 max-w-2xl md:block">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="채널, 라이벌, 동영상 검색"
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-6 py-2 pr-12 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-blue-500 dark:focus:bg-slate-800"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="검색"
            >
              <svg
                className="h-5 w-5 text-slate-600 dark:text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Right: Dark Mode + Login */}
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center justify-center rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="다크모드 전환"
          >
            <svg
              className="h-6 w-6 text-slate-700 dark:text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <Link
            href="/login"
            className="rounded-full border-2 border-slate-300 px-4 py-1.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-slate-600 dark:text-blue-400 dark:hover:bg-slate-800"
          >
            로그인
          </Link>
        </div>

        {/* Mobile Search Button */}
        <button
          className="ml-2 flex items-center justify-center rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          aria-label="검색"
        >
          <svg
            className="h-5 w-5 text-slate-700 dark:text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="검색..."
                  className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2 pr-10 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <svg
                    className="h-5 w-5 text-slate-600 dark:text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Mobile Nav Items */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={handleToggleMenu}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-800" />

              <Link
                href="/rankings?category=스포츠 배팅"
                className="flex items-center space-x-3 rounded-lg px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={handleToggleMenu}
              >
                <span className="text-xl">⚽</span>
                <span>스포츠 배팅</span>
              </Link>
              <Link
                href="/rankings?category=토토"
                className="flex items-center space-x-3 rounded-lg px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={handleToggleMenu}
              >
                <span className="text-xl">🎯</span>
                <span>토토</span>
              </Link>
              <Link
                href="/rankings?category=카지노"
                className="flex items-center space-x-3 rounded-lg px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={handleToggleMenu}
              >
                <span className="text-xl">🎰</span>
                <span>카지노</span>
              </Link>
              <Link
                href="/rankings?category=e-스포츠"
                className="flex items-center space-x-3 rounded-lg px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={handleToggleMenu}
              >
                <span className="text-xl">🎮</span>
                <span>e-스포츠</span>
              </Link>

              <div className="my-2 border-t border-slate-200 dark:border-slate-800" />

              <Link
                href="/community"
                className="flex items-center space-x-3 rounded-lg px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={handleToggleMenu}
              >
                <span className="text-xl">💬</span>
                <span>커뮤니티</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

