import Link from "next/link";
import { Header, Footer, RankingCard, EventBanner, UpdateNote } from "@/components";
import { createClient } from "@/lib/supabase/server";

// 카테고리별 랭킹 데이터 타입 (DB 함수 반환 타입)
interface CategoryRanking {
  category: string;
  site_seq: string;
  site_name: string;
  url: string;
  type: string;
  logo_image?: string | null;
  logo_url?: string | null;
  value: number;
  rank: number;
  subscriber_count: number;
  avg_rating: number;
}

// RankingCard에 전달할 데이터 타입
interface RankingItem {
  id: string;
  rank: number;
  name: string;
  logo_url?: string;
  value: string;
  tier: number;
  change: "up" | "down" | "same";
  changeAmount?: number;
}

// 카테고리 영문명을 한글명으로 매핑
const CATEGORY_NAME_MAP: Record<string, string> = {
  'first_bonus': '가입 첫 충',
  'daily_first_bonus': '매일 첫 충',
  'repeat_bonus': '매일 매 충',
  'casino_payback': '카지노 페이백',
  'slot_payback': '슬롯 페이백',
  'rolling': '롤링',
};

// 평점을 기반으로 tier 계산 (1-5)
const calculateTier = (avgRating: number): number => {
  if (avgRating >= 4.5) return 1;
  if (avgRating >= 4.0) return 2;
  if (avgRating >= 3.5) return 3;
  if (avgRating >= 3.0) return 4;
  return 5;
};

// 값을 포맷팅 (카테고리별로 다르게 표시)
const formatValue = (category: string, value: number): string => {
  if (category === 'rolling') {
    return `${value}%`;
  }
  if (category === 'casino_payback' || category === 'slot_payback') {
    return `${value}%`;
  }
  // bonus 카테고리들
  return `+${value}%`;
};

// 카테고리별 데이터 매핑 함수
const mapCategoryData = (data: CategoryRanking[]): Record<string, RankingItem[]> => {
  const grouped: Record<string, RankingItem[]> = {};

  data.forEach((item) => {
    const categoryKorean = CATEGORY_NAME_MAP[item.category] || item.category;
    
    if (!grouped[categoryKorean]) {
      grouped[categoryKorean] = [];
    }

    grouped[categoryKorean].push({
      id: item.site_seq,
      rank: item.rank,
      name: item.site_name,
      logo_url: item.logo_url || undefined,
      value: formatValue(item.category, item.value),
      tier: calculateTier(item.avg_rating),
      change: "same" as const, // 기본값 (추후 순위 변동 로직 추가 가능)
    });
  });

  return grouped;
};

export default async function Home() {
  // 서버 사이드에서 데이터 가져오기
  const supabase = await createClient();
  
  let categoryRankings: Record<string, RankingItem[]> = {};
  
  try {
    const { data, error } = await supabase.rpc('get_all_category_rankings', { 
      p_limit: 5 
    });

    if (error) {
      console.error('Error fetching category rankings:', error);
    } else if (data) {
      categoryRankings = mapCategoryData(data);
    }
  } catch (error) {
    console.error('Failed to fetch rankings:', error);
  }

  // 카테고리별 데이터 추출 (fallback 데이터 포함)
  const firstDepositRanking = categoryRankings['가입 첫 충'] || [];
  const dailyFirstDepositRanking = categoryRankings['매일 첫 충'] || [];
  const everyDepositRanking = categoryRankings['매일 매 충'] || [];
  const rollingRanking = categoryRankings['롤링'] || [];
  const casinoPaybackRanking = categoryRankings['카지노 페이백'] || [];
  const slotPaybackRanking = categoryRankings['슬롯 페이백'] || [];
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      {/* Event Banner */}
      <EventBanner />

      {/* Update Note */}
      <UpdateNote
        version="v2025.01 업데이트"
        title="주간 배팅 사이트 순위 변동"
        bgImage="https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=1200&h=300&fit=crop"
        items={[
          { id: "1", name: "프리미어벳", image: "", badge: "new" },
          { id: "2", name: "베팅킹", image: "", badge: "up" },
          { id: "3", name: "슈어벳", image: "", badge: "up" },
          { id: "4", name: "토토마스터", image: "", badge: "down" },
          { id: "5", name: "카지노플러스", image: "", badge: "hot" },
          { id: "6", name: "e스포츠뱅크", image: "", badge: "up" },
          { id: "7", name: "스포츠존", image: "" },
          { id: "8", name: "라이브카지노", image: "" },
          { id: "9", name: "슬롯천국", image: "", badge: "new" },
          { id: "10", name: "배팅월드", image: "" },
        ]}
      />

      {/* Ranking Cards Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
            프로모션별 순위
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            카테고리별로 최고의 배팅 사이트를 확인하세요
          </p>
        </div>

        {/* First Row */}
        <div className="mb-6 grid gap-6 lg:grid-cols-3">
          <RankingCard
            title="가입 첫 충"
            period="일간"
            items={firstDepositRanking}
            bgImage="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=160&fit=crop"
            linkHref="/rankings?promo=first-deposit"
          />
          <RankingCard
            title="매일 첫 충"
            period="일간"
            items={dailyFirstDepositRanking}
            bgImage="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=160&fit=crop"
            linkHref="/rankings?promo=daily-first"
          />
          <RankingCard
            title="매일 매 충"
            period="일간"
            items={everyDepositRanking}
            bgImage="https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400&h=160&fit=crop"
            linkHref="/rankings?promo=every-deposit"
          />
        </div>

        {/* Second Row */}
        <div className="mb-6 grid gap-6 lg:grid-cols-3">
          <RankingCard
            title="카지노 페이백"
            period="일간"
            items={casinoPaybackRanking}
            bgImage="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=160&fit=crop"
            linkHref="/rankings?promo=casino-payback"
          />
          <RankingCard
            title="슬롯 페이백"
            period="일간"
            items={slotPaybackRanking}
            bgImage="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=160&fit=crop"
            linkHref="/rankings?promo=slot-payback"
          />
          <RankingCard
            title="롤링"
            period="일간"
            items={rollingRanking}
            bgImage="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=160&fit=crop"
            linkHref="/rankings?promo=rolling"
          />
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-slate-100 py-12 dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
              빠른 탐색
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              원하는 카테고리로 바로 이동하세요
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Link
              href="/tier"
              className="group flex items-center space-x-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 text-2xl shadow-md">
                🏆
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">
                  티어 랭킹
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">평점별 분류</p>
              </div>
            </Link>

            <Link
              href="/rankings?category=스포츠 배팅"
              className="group flex items-center space-x-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-2xl shadow-md">
                ⚽
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  스포츠 배팅
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">24개 사이트</p>
              </div>
            </Link>

            <Link
              href="/rankings?category=토토"
              className="group flex items-center space-x-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-2xl shadow-md">
                🎯
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
                  토토
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">18개 사이트</p>
              </div>
            </Link>

            <Link
              href="/rankings?category=카지노"
              className="group flex items-center space-x-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-2xl shadow-md">
                🎰
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                  카지노
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">15개 사이트</p>
              </div>
            </Link>

            <Link
              href="/rankings?category=e-스포츠"
              className="group flex items-center space-x-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-2xl shadow-md">
                🎮
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-pink-600 dark:text-white dark:group-hover:text-pink-400">
                  e-스포츠
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">12개 사이트</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            지금 바로 최고의 사이트를 찾아보세요
          </h2>
          <p className="mb-6 text-lg text-white/90">
            검증된 배팅 사이트와 최고의 프로모션이 기다립니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/rankings"
              className="rounded-full bg-white px-8 py-3 text-lg font-bold text-blue-600 shadow-xl transition-all hover:scale-105"
            >
              전체 순위 보기
            </Link>
            <Link
              href="/community"
              className="rounded-full border-2 border-white bg-transparent px-8 py-3 text-lg font-bold text-white transition-all hover:bg-white/10"
            >
              커뮤니티 가입
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
