"use client";

import { useState } from "react";
import Link from "next/link";
import { Header, Footer, Badge, SearchBar, Card } from "@/components";

// Mock data for demonstration
const mockPosts = [
  {
    id: "1",
    title: "프리미어벳 사용 후기 - 입출금 속도 정말 빠르네요!",
    content: "안녕하세요, 프리미어벳을 사용한 지 한 달 정도 되었는데 입출금 속도가 정말 빠르고...",
    author: "베팅마스터",
    category: "사이트 후기",
    views: 1234,
    likes: 45,
    comments: 12,
    created_at: "2025-01-20T10:30:00",
    isHot: true,
  },
  {
    id: "2",
    title: "스포츠 배팅 초보자를 위한 팁 공유합니다",
    content: "배팅을 시작한 지 얼마 안 되신 분들을 위해 제가 배운 팁들을 공유합니다...",
    author: "스포츠팬",
    category: "배팅 가이드",
    views: 2156,
    likes: 89,
    comments: 34,
    created_at: "2025-01-19T15:20:00",
    isHot: true,
  },
  {
    id: "3",
    title: "이번 주말 프리미어리그 경기 분석",
    content: "이번 주말에 열리는 프리미어리그 경기들을 분석해봤습니다. 맨유 vs 첼시...",
    author: "축구분석가",
    category: "경기 분석",
    views: 3421,
    likes: 156,
    comments: 67,
    created_at: "2025-01-19T09:00:00",
    isHot: true,
  },
  {
    id: "4",
    title: "베팅킹 보너스 이벤트 정보 공유",
    content: "베팅킹에서 신규 가입 보너스 이벤트를 진행하고 있습니다...",
    author: "이벤트헌터",
    category: "프로모션",
    views: 987,
    likes: 34,
    comments: 8,
    created_at: "2025-01-18T14:45:00",
    isHot: false,
  },
  {
    id: "5",
    title: "e스포츠 배팅 어떤가요?",
    content: "롤이나 발로란트 같은 e스포츠 배팅을 해보려고 하는데...",
    author: "게이머123",
    category: "질문",
    views: 654,
    likes: 23,
    comments: 15,
    created_at: "2025-01-18T11:30:00",
    isHot: false,
  },
  {
    id: "6",
    title: "카지노 사이트 추천 부탁드립니다",
    content: "라이브 카지노를 하고 싶은데 안전한 사이트 추천해주세요...",
    author: "카지노러버",
    category: "질문",
    views: 1123,
    likes: 41,
    comments: 22,
    created_at: "2025-01-17T16:00:00",
    isHot: false,
  },
];

const categories = [
  { value: "all", label: "전체", icon: "📋", count: 156 },
  { value: "사이트 후기", label: "사이트 후기", icon: "⭐", count: 45 },
  { value: "배팅 가이드", label: "배팅 가이드", icon: "📚", count: 32 },
  { value: "경기 분석", label: "경기 분석", icon: "⚽", count: 28 },
  { value: "프로모션", label: "프로모션", icon: "🎁", count: 18 },
  { value: "질문", label: "질문", icon: "❓", count: 33 },
];

const sortOptions = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "views", label: "조회수순" },
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter and sort posts
  const filteredPosts = mockPosts
    .filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "popular") {
        return b.likes - a.likes;
      } else if (sortBy === "views") {
        return b.views - a.views;
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "방금 전";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
    return date.toLocaleDateString("ko-KR");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      {/* Page Header */}
      <section className="border-b border-slate-200 bg-gradient-to-r from-purple-600 to-pink-600 py-12 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              커뮤니티
            </h1>
            <p className="mb-6 text-lg text-white/90">
              다양한 정보를 공유하고 의견을 나눠보세요
            </p>
            <div className="mx-auto max-w-2xl">
              <SearchBar
                onSearch={handleSearch}
                placeholder="게시글 제목이나 내용으로 검색..."
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-64">
            <div className="sticky top-6 space-y-6">
              {/* Write Post Button */}
              <Link
                href="/community/new"
                className="block w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-center font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                ✏️ 글쓰기
              </Link>

              {/* Categories */}
              <Card>
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                  카테고리
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-left transition-all ${
                        selectedCategory === category.value
                          ? "bg-purple-600 text-white"
                          : "hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        <span className="font-semibold">{category.label}</span>
                      </span>
                      <span
                        className={`text-sm ${
                          selectedCategory === category.value
                            ? "text-white/80"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Popular Tags */}
              <Card>
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                  인기 태그
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">프리미어벳</Badge>
                  <Badge variant="default">배팅전략</Badge>
                  <Badge variant="default">보너스</Badge>
                  <Badge variant="default">스포츠분석</Badge>
                  <Badge variant="default">초보가이드</Badge>
                </div>
              </Card>

              {/* Community Stats */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700">
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                  커뮤니티 통계
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-600 dark:text-slate-400">전체 게시글</dt>
                    <dd className="font-bold text-slate-900 dark:text-white">1,234</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600 dark:text-slate-400">오늘 작성글</dt>
                    <dd className="font-bold text-purple-600 dark:text-purple-400">42</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600 dark:text-slate-400">활성 사용자</dt>
                    <dd className="font-bold text-pink-600 dark:text-pink-400">567</dd>
                  </div>
                </dl>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedCategory === "all"
                    ? "전체 게시글"
                    : categories.find((c) => c.value === selectedCategory)?.label}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  총 {filteredPosts.length}개의 게시글
                </p>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Post List */}
            {filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/community/${post.id}`}>
                    <Card className="transition-all hover:shadow-xl hover:-translate-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            {post.isHot && (
                              <Badge variant="danger" size="sm">
                                🔥 HOT
                              </Badge>
                            )}
                            <Badge variant="info" size="sm">
                              {post.category}
                            </Badge>
                          </div>

                          <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                            {post.title}
                          </h3>

                          <p className="mb-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                            {post.content}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center">
                              <svg
                                className="mr-1 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              {post.author}
                            </span>
                            <span className="flex items-center">
                              <svg
                                className="mr-1 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {post.views.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <svg
                                className="mr-1 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <svg
                                className="mr-1 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                              {post.comments}
                            </span>
                            <span>{formatTimeAgo(post.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="mb-4 text-6xl">📭</div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  게시글이 없습니다
                </h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                  첫 번째 게시글을 작성해보세요!
                </p>
                <Link
                  href="/community/new"
                  className="inline-block rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-purple-700"
                >
                  글쓰기
                </Link>
              </Card>
            )}

            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    이전
                  </button>
                  <button className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white">
                    1
                  </button>
                  <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    2
                  </button>
                  <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    3
                  </button>
                  <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    다음
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

