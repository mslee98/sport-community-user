"use client";

import { useState } from "react";
import Link from "next/link";
import { Header, Footer, SiteCard, Badge, SearchBar } from "@/components";
import type { Site } from "@/types";

// Mock data for demonstration
const mockSites: Site[] = [
  {
    id: "1",
    name: "프리미어벳",
    description: "국내 최고의 스포츠 배팅 사이트. 안전하고 빠른 입출금, 다양한 이벤트 제공",
    rating: 4.8,
    tier: 1,
    category: "스포츠 배팅",
    logo_url: "",
    website_url: "https://example.com",
    created_at: "2025-01-15",
    updated_at: "2025-01-15",
  },
  {
    id: "2",
    name: "베팅킹",
    description: "다양한 스포츠 종목과 실시간 배팅 지원. 높은 배당률과 빠른 정산",
    rating: 4.6,
    tier: 1,
    category: "스포츠 배팅",
    logo_url: "",
    website_url: "https://example.com",
    created_at: "2025-01-14",
    updated_at: "2025-01-14",
  },
  {
    id: "3",
    name: "슈어벳",
    description: "검증된 안전 사이트. 24시간 고객센터 운영 및 다양한 보너스 제공",
    rating: 4.5,
    tier: 2,
    category: "토토",
    logo_url: "",
    website_url: "https://example.com",
    created_at: "2025-01-13",
    updated_at: "2025-01-13",
  },
  {
    id: "4",
    name: "토토마스터",
    description: "안전한 토토 사이트. 신속한 입출금과 다양한 스포츠 경기 지원",
    rating: 4.3,
    tier: 2,
    category: "토토",
    logo_url: "",
    website_url: "https://example.com",
    created_at: "2025-01-12",
    updated_at: "2025-01-12",
  },
  {
    id: "5",
    name: "카지노플러스",
    description: "다양한 카지노 게임과 라이브 딜러. 풍성한 프로모션 제공",
    rating: 4.4,
    tier: 3,
    category: "카지노",
    logo_url: "",
    website_url: "https://example.com",
    created_at: "2025-01-11",
    updated_at: "2025-01-11",
  },
  {
    id: "6",
    name: "e스포츠뱅크",
    description: "e스포츠 전문 배팅 사이트. LOL, 발로란트, 오버워치 등 다양한 게임 지원",
    rating: 4.2,
    tier: 3,
    category: "e-스포츠",
    logo_url: "",
    website_url: "https://example.com",
    created_at: "2025-01-10",
    updated_at: "2025-01-10",
  },
  {
    id: "7",
    name: "스포츠존",
    description: "국내외 스포츠 경기 실시간 배팅. 높은 배당률과 빠른 정산",
    rating: 4.0,
    tier: 4,
    category: "스포츠 배팅",
    logo_url: "",
    website_url: "https://example.com",
    created_at: "2025-01-09",
    updated_at: "2025-01-09",
  },
  {
    id: "8",
    name: "라이브카지노",
    description: "실시간 라이브 카지노 게임. 바카라, 블랙잭, 룰렛 등 다양한 게임",
    rating: 3.9,
    tier: 4,
    category: "카지노",
    logo_url: "",
    website_url: "https://example.com",
    created_at: "2025-01-08",
    updated_at: "2025-01-08",
  },
];

const tiers = [
  { value: "all", label: "전체" },
  { value: "1", label: "1티어" },
  { value: "2", label: "2티어" },
  { value: "3", label: "3티어" },
  { value: "4", label: "4티어" },
  { value: "5", label: "5티어" },
];

const categories = [
  { value: "all", label: "전체 카테고리" },
  { value: "스포츠 배팅", label: "스포츠 배팅" },
  { value: "토토", label: "토토" },
  { value: "카지노", label: "카지노" },
  { value: "e-스포츠", label: "e-스포츠" },
];

const sortOptions = [
  { value: "rating", label: "평점 높은순" },
  { value: "name", label: "이름순" },
  { value: "recent", label: "최신순" },
];

export default function RankingsPage() {
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter and sort sites
  const filteredSites = mockSites
    .filter((site) => {
      const matchesTier = selectedTier === "all" || site.tier === parseInt(selectedTier);
      const matchesCategory = selectedCategory === "all" || site.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTier && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      {/* Page Header */}
      <section className="border-b border-slate-200 bg-gradient-to-r from-blue-600 to-purple-600 py-12 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              배팅 사이트 순위
            </h1>
            <p className="mb-6 text-lg text-white/90">
              검증된 배팅 사이트를 티어별로 확인하세요
            </p>
            <div className="mx-auto max-w-2xl">
              <SearchBar
                onSearch={handleSearch}
                placeholder="사이트 이름이나 카테고리로 검색..."
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="lg:w-64">
            <div className="sticky top-6 space-y-6">
              {/* Tier Filter */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                  티어 필터
                </h3>
                <div className="space-y-2">
                  {tiers.map((tier) => (
                    <button
                      key={tier.value}
                      onClick={() => setSelectedTier(tier.value)}
                      className={`w-full rounded-lg px-4 py-2 text-left font-semibold transition-all ${
                        selectedTier === tier.value
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                  카테고리
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full rounded-lg px-4 py-2 text-left font-semibold transition-all ${
                        selectedCategory === category.value
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Card */}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:border-slate-700 dark:from-slate-800 dark:to-slate-700">
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  💡 티어 시스템
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  S티어는 최고 등급으로 안전성과 신뢰도가 가장 높은 사이트입니다.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  검색 결과
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  총 {filteredSites.length}개의 사이트
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  정렬:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedTier !== "all" || selectedCategory !== "all" || searchQuery) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedTier !== "all" && (
                  <Badge variant="info" className="flex items-center gap-2">
                    티어: {selectedTier}
                    <button
                      onClick={() => setSelectedTier("all")}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="success" className="flex items-center gap-2">
                    카테고리: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="warning" className="flex items-center gap-2">
                    검색: {searchQuery}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                <button
                  onClick={() => {
                    setSelectedTier("all");
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  전체 초기화
                </button>
              </div>
            )}

            {/* Site Cards */}
            {filteredSites.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredSites.map((site, index) => (
                  <SiteCard key={site.id} site={site} rank={index + 1} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-4 text-6xl">🔍</div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  검색 결과가 없습니다
                </h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                  다른 필터 조건으로 다시 시도해보세요
                </p>
                <button
                  onClick={() => {
                    setSelectedTier("all");
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  필터 초기화
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

