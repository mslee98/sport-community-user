"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteCard, Badge, SearchBar } from "@/components";

interface RankingsClientProps {
  sites: SiteData[];
}

interface SiteData {
  site_seq: string;
  site_name: string;
  url: string;
  type: string;
  logo_url: string | null;
  logo_name: string | null;
  avg_rating: number;
  subscriber_count: number;
  tier_level: number;
  tier_name: string;
  tier_color: string;
  category: string;
  first_bonus: number;
  daily_first_bonus: number;
  repeat_bonus: number;
  casino_payback: number;
  slot_payback: number;
  rolling_rate: number;
  total_score: number;
  review_count: number;
  created_at: string;
  description?: string;
}

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

const promotions = [
  { value: "all", label: "전체 프로모션" },
  { value: "first_bonus", label: "가입 첫 충" },
  { value: "daily_first_bonus", label: "매일 첫 충" },
  { value: "repeat_bonus", label: "매일 매 충" },
  { value: "casino_payback", label: "카지노 페이백" },
  { value: "slot_payback", label: "슬롯 페이백" },
  { value: "rolling", label: "롤링" },
];

const sortOptions = [
  { value: "rating", label: "평점 높은순" },
  { value: "score", label: "종합 점수순" },
  { value: "subscriber", label: "구독자순" },
  { value: "name", label: "이름순" },
  { value: "recent", label: "최신순" },
];

export default function RankingsClient({ sites: initialSites }: RankingsClientProps) {
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPromotion, setSelectedPromotion] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 클라이언트 사이드 필터링
  const filteredSites = initialSites
    .filter((site) => {
      const matchesTier = selectedTier === "all" || site.tier_level === parseInt(selectedTier);
      const matchesCategory = selectedCategory === "all" || site.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        site.site_name.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesPromotion = true;
      if (selectedPromotion !== "all") {
        const promoValue = site[selectedPromotion as keyof SiteData] as number;
        matchesPromotion = promoValue > 0;
      }

      return matchesTier && matchesCategory && matchesSearch && matchesPromotion;
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.avg_rating - a.avg_rating;
      } else if (sortBy === "score") {
        return (b.total_score || 0) - (a.total_score || 0);
      } else if (sortBy === "subscriber") {
        return b.subscriber_count - a.subscriber_count;
      } else if (sortBy === "name") {
        return a.site_name.localeCompare(b.site_name);
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  return (
    <>
      {/* Page Header */}
      <section className="relative border-b border-slate-200 bg-gradient-to-r from-orange-600 to-red-500 py-12 dark:border-slate-800">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/banners/rank-banner.jpeg" 
            alt="배너" 
            className="h-full w-full object-cover"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
              배팅 사이트 순위
            </h1>
            <p className="mb-6 text-lg text-white/90 drop-shadow-md">
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

      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="lg:w-56">
            <div className="sticky top-6 space-y-4">
              {/* Tier Filter */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                  티어
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {tiers.map((tier) => (
                    <button
                      key={tier.value}
                      onClick={() => setSelectedTier(tier.value)}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                        selectedTier === tier.value
                          ? "bg-orange-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                  카테고리
                </h3>
                <div className="space-y-1.5">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold transition-all ${
                        selectedCategory === category.value
                          ? "bg-orange-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promotion Filter */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                  프로모션
                </h3>
                <div className="space-y-1.5">
                  {promotions.map((promo) => (
                    <button
                      key={promo.value}
                      onClick={() => setSelectedPromotion(promo.value)}
                      className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold transition-all ${
                        selectedPromotion === promo.value
                          ? "bg-green-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {promo.label}
                    </button>
                  ))}
                </div>
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
            {(selectedTier !== "all" || selectedCategory !== "all" || selectedPromotion !== "all" || searchQuery) && (
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
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedPromotion !== "all" && (
                  <Badge variant="warning" className="flex items-center gap-2">
                    {promotions.find(p => p.value === selectedPromotion)?.label}
                    <button
                      onClick={() => setSelectedPromotion("all")}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="danger" className="flex items-center gap-2">
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
                    setSelectedPromotion("all");
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSites.map((site, index) => {
                  const siteForCard = {
                    id: site.site_seq,
                    name: site.site_name,
                    description: site.description || `${site.category} 사이트입니다`,
                    rating: site.avg_rating,
                    tier: site.tier_level,
                    category: site.category,
                    logo_url: site.logo_url || undefined,
                    website_url: site.url,
                    created_at: site.created_at,
                    updated_at: site.created_at,
                  };
                  return <SiteCard key={site.site_seq} site={siteForCard} rank={index + 1} />;
                })}
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
                    setSelectedPromotion("all");
                    setSearchQuery("");
                  }}
                  className="rounded-lg bg-orange-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-orange-700"
                >
                  필터 초기화
                </button>
              </div>
            )}
          </main>
        </div>
        </div>
      </div>
    </>
  );
}

