import Link from "next/link";
import { Header, Footer, Rating, Badge, Button, Card } from "@/components";

// Mock data for demonstration
const mockSite = {
  id: "1",
  name: "프리미어벳",
  description: "국내 최고의 스포츠 배팅 사이트. 안전하고 빠른 입출금, 다양한 이벤트 제공",
  rating: 4.8,
  tier: "S" as const,
  category: "스포츠 배팅",
  logo_url: "",
  website_url: "https://example.com",
  created_at: "2025-01-15",
  updated_at: "2025-01-15",
  features: [
    { icon: "⚡", title: "빠른 입출금", description: "평균 5분 이내 처리" },
    { icon: "🔒", title: "안전성", description: "SSL 보안 인증" },
    { icon: "🎁", title: "다양한 보너스", description: "가입, 충전, 이벤트 보너스" },
    { icon: "📱", title: "모바일 지원", description: "iOS/Android 앱 제공" },
  ],
  specs: [
    { label: "설립연도", value: "2020년" },
    { label: "운영국가", value: "대한민국" },
    { label: "최소입금액", value: "10,000원" },
    { label: "최대배팅액", value: "5,000,000원" },
    { label: "고객센터", value: "24시간 운영" },
    { label: "입금방법", value: "계좌이체, 가상계좌" },
  ],
  pros: [
    "높은 배당률과 다양한 경기 제공",
    "24시간 신속한 고객센터 응대",
    "안전한 입출금 시스템",
    "모바일 앱으로 편리한 이용",
    "다양한 프로모션과 이벤트",
  ],
  cons: [
    "일부 마이너 스포츠 종목 부족",
    "고액 배팅 시 승인 시간 소요",
  ],
};

const mockReviews = [
  {
    id: "1",
    author: "user1234",
    rating: 5,
    date: "2025-01-20",
    content: "입출금이 정말 빠르고 배당률도 좋습니다. 고객센터 응대도 친절해요!",
    helpful: 24,
  },
  {
    id: "2",
    author: "betmaster",
    rating: 4,
    date: "2025-01-18",
    content: "전반적으로 만족스럽습니다. 모바일 앱이 특히 편리하네요.",
    helpful: 18,
  },
  {
    id: "3",
    author: "sports_fan",
    rating: 5,
    date: "2025-01-15",
    content: "다양한 스포츠 경기를 제공하고 라이브 배팅도 잘 되어있어요.",
    helpful: 32,
  },
];

export default function SiteDetailPage() {
  const getTierVariant = (tier: string) => {
    switch (tier) {
      case "S":
        return "tier-s";
      case "A":
        return "tier-a";
      case "B":
        return "tier-b";
      case "C":
        return "tier-c";
      case "D":
        return "tier-d";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-4">
            <Link
              href="/rankings"
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              순위 목록으로 돌아가기
            </Link>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Logo */}
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
              {mockSite.logo_url ? (
                <img
                  src={mockSite.logo_url}
                  alt={mockSite.name}
                  className="h-24 w-24 object-contain"
                />
              ) : (
                <span className="text-5xl font-bold text-slate-600 dark:text-slate-300">
                  {mockSite.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Site Info */}
            <div className="flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  {mockSite.name}
                </h1>
                <Badge variant={getTierVariant(mockSite.tier)} size="lg">
                  {mockSite.tier} 티어
                </Badge>
                <Badge variant="info">{mockSite.category}</Badge>
              </div>

              <div className="mb-6">
                <Rating rating={mockSite.rating} size="lg" />
              </div>

              <p className="mb-6 text-lg text-slate-600 dark:text-slate-300">
                {mockSite.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  사이트 방문하기
                </Button>
                <Button variant="outline" size="lg">
                  리뷰 작성하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Features */}
            <section className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                주요 특징
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {mockSite.features.map((feature, index) => (
                  <Card key={index}>
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{feature.icon}</div>
                      <div>
                        <h3 className="mb-1 font-bold text-slate-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Pros & Cons */}
            <section className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                장단점 분석
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Pros */}
                <Card className="border-2 border-green-200 dark:border-green-900">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-green-600 dark:text-green-400">
                    <svg
                      className="mr-2 h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    장점
                  </h3>
                  <ul className="space-y-3">
                    {mockSite.pros.map((pro, index) => (
                      <li
                        key={index}
                        className="flex items-start text-slate-700 dark:text-slate-300"
                      >
                        <span className="mr-2 mt-1 text-green-600">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Cons */}
                <Card className="border-2 border-red-200 dark:border-red-900">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-red-600 dark:text-red-400">
                    <svg
                      className="mr-2 h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    단점
                  </h3>
                  <ul className="space-y-3">
                    {mockSite.cons.map((con, index) => (
                      <li
                        key={index}
                        className="flex items-start text-slate-700 dark:text-slate-300"
                      >
                        <span className="mr-2 mt-1 text-red-600">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>

            {/* Reviews */}
            <section className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                사용자 리뷰
              </h2>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id}>
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-3">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {review.author}
                          </span>
                          <Badge variant="default" size="sm">
                            인증 사용자
                          </Badge>
                        </div>
                        <Rating rating={review.rating} size="sm" showNumber={false} />
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(review.date).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                    <p className="mb-3 text-slate-700 dark:text-slate-300">{review.content}</p>
                    <div className="flex items-center gap-4 border-t border-slate-100 pt-3 dark:border-slate-700">
                      <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        도움됨 ({review.helpful})
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Specs */}
            <Card>
              <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                상세 정보
              </h3>
              <dl className="space-y-3">
                {mockSite.specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-slate-100 pb-3 last:border-0 dark:border-slate-700"
                  >
                    <dt className="font-semibold text-slate-700 dark:text-slate-300">
                      {spec.label}
                    </dt>
                    <dd className="text-slate-600 dark:text-slate-400">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            {/* Warning Card */}
            <Card className="border-2 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
              <div className="mb-3 flex items-center text-yellow-600 dark:text-yellow-400">
                <svg
                  className="mr-2 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h4 className="font-bold">주의사항</h4>
              </div>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                배팅은 중독성이 있을 수 있습니다. 책임감 있게 이용하시고, 본인의 재정 상황을
                고려하여 적절한 금액만 사용하세요.
              </p>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <h3 className="mb-2 text-xl font-bold">지금 시작하세요!</h3>
              <p className="mb-4 text-sm text-white/90">
                검증된 안전한 사이트에서 배팅을 시작해보세요
              </p>
              <Button variant="secondary" className="w-full">
                사이트 방문하기
              </Button>
            </Card>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

