import Link from "next/link";
import Image from "next/image";
import { Header, Footer, Badge } from "@/components";
import { createClient } from "@/lib/supabase/server";

// 사이트 데이터 타입
interface TierSite {
  site_seq: string;
  site_name: string;
  logo_image: string | null;
  logo_url: string | null;
  avg_rating: number;
  tier_level: number;
}

// 티어별 사이트 그룹
interface TierGroup {
  tier: number;
  tierLabel: string;
  tierColor: string;
  bgGradient: string;
  sites: TierSite[];
}

// 티어 정보 매핑
const TIER_INFO = {
  1: { 
    label: "1티어", 
    color: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10"
  },
  2: { 
    label: "2티어", 
    color: "from-blue-400 to-blue-600",
    bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10"
  },
  3: { 
    label: "3티어", 
    color: "from-green-400 to-green-600",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10"
  },
  4: { 
    label: "4티어", 
    color: "from-purple-400 to-purple-600",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10"
  },
  5: { 
    label: "5티어", 
    color: "from-slate-400 to-slate-600",
    bgGradient: "from-slate-50 to-gray-50 dark:from-slate-900/10 dark:to-gray-900/10"
  },
};

// 사이트 로고 컴포넌트 (간단 버전)
const SiteLogo = ({ site }: { site: TierSite }) => {
  return (
    <Link 
      href={`/rankings/${site.site_seq}`}
      className="group flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:bg-slate-800"
    >
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        {site.logo_url ? (
          <img
            src={site.logo_url}
            alt={site.site_name}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 transition-all group-hover:from-blue-100 group-hover:to-blue-200 dark:from-slate-700 dark:to-slate-600 dark:group-hover:from-blue-900 dark:group-hover:to-blue-800">
            <span className="text-xl font-bold text-slate-600 dark:text-slate-300">
              {site.site_name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute -bottom-1 -right-1">
          <Badge
            variant={`tier-${site.tier_level}` as any}
            size="sm"
          />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {site.site_name}
        </h3>
        <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
          <span className="text-yellow-500">★</span>
          <span className="font-medium">{site.avg_rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
};

export default async function TierPage() {
  const supabase = await createClient();
  
  const tierGroups: TierGroup[] = [];
  
  try {
    // 각 티어별 뷰에서 데이터 가져오기
    const tierViews = [
      { tier: 1, view: 'v_tier1_sites' },
      { tier: 2, view: 'v_tier2_sites' },
      { tier: 3, view: 'v_tier3_sites' },
      { tier: 4, view: 'v_tier4_sites' },
      { tier: 5, view: 'v_tier5_sites' },
    ];

    for (const { tier, view } of tierViews) {
      const { data, error } = await supabase
        .from(view)
        .select('site_seq, site_name, logo_image, logo_url, avg_rating, tier_level')
        .order('avg_rating', { ascending: false });

      if (error) {
        console.error(`Error fetching ${view}:`, error);
      } else if (data && data.length > 0) {
        const tierInfo = TIER_INFO[tier as keyof typeof TIER_INFO];
        tierGroups.push({
          tier,
          tierLabel: tierInfo.label,
          tierColor: tierInfo.color,
          bgGradient: tierInfo.bgGradient,
          sites: data,
        });
      }
    }
  } catch (error) {
    console.error('Failed to fetch tier data:', error);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            사이트 티어 랭킹
          </h1>
          <p className="mt-2 text-white/90">
            평점을 기반으로 분류된 배팅 사이트 목록
          </p>
        </div>
      </section>

      {/* Tier Lists */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {tierGroups.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl">🏆</div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
              아직 등록된 사이트가 없습니다
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              곧 다양한 사이트가 추가될 예정입니다
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {tierGroups.map((group) => (
              <div key={group.tier} className={`rounded-xl bg-gradient-to-r ${group.bgGradient} p-6 shadow-sm`}>
                {/* Tier Header */}
                <div className="mb-4 flex items-center space-x-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${group.tierColor} text-lg font-bold text-white shadow-md`}>
                    <Image
                      src={`/images/tier/tier${group.tier}.svg`}
                      alt={`${group.tierLabel} 로고`}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {group.tierLabel}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {group.sites.length}개 사이트
                    </p>
                  </div>
                </div>

                {/* Sites List */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.sites.map((site) => (
                    <SiteLogo key={site.site_seq} site={site} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

