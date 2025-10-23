"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  link: string;
}

const EventBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const banners: BannerItem[] = [
    {
      id: "1",
      title: "크총모 오셨다",
      subtitle: "시즌 1 마지막, 박재범편",
      date: "10/28(화) 오후 9시",
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=80&h=80&fit=crop",
      link: "/rankings",
    },
    {
      id: "2",
      title: "대망의 MLB 월드시리즈!",
      subtitle: "LA 다저스 vs 토론토",
      date: "10월 25일 (토) 9:00",
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=80&h=80&fit=crop",
      link: "/rankings?category=스포츠",
    },
    {
      id: "3",
      title: "버츄얼 노래경연대회 V:MIX2",
      subtitle: "결승 무대",
      date: "10/25(토) 오후 8시",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop",
      link: "/rankings?promo=event",
    },
    {
      id: "4",
      title: "WORLDS 25",
      subtitle: "롤드컵 드디어 시작!",
      date: "10/14(화) ~ 11/9(일)",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&h=80&fit=crop",
      link: "/rankings?category=e-스포츠",
    },
    {
      id: "5",
      title: "이적을 고민중이신가요?",
      subtitle: "구독 기간을 이어드려요",
      date: "계속됩니다",
      image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=80&h=80&fit=crop",
      link: "/rankings?promo=first-deposit",
    },
    {
      id: "6",
      title: "🎁 신규 가입 보너스",
      subtitle: "최대 200% 보너스",
      date: "10/25(금) 까지",
      image: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=80&h=80&fit=crop",
      link: "/rankings?promo=first-deposit",
    },
    {
      id: "7",
      title: "🎰 주말 롤링 이벤트",
      subtitle: "최대 0.8% 롤링",
      date: "매주 주말",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=80&h=80&fit=crop",
      link: "/rankings?category=카지노",
    },
    {
      id: "8",
      title: "프로 콘텐츠 지원",
      subtitle: "프로 스트리머 신청",
      date: "10/20 ~ 10/24",
      image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=80&h=80&fit=crop",
      link: "/community",
    },
  ];

  const ITEM_WIDTH = 300; // 배너 하나의 너비
  const GAP = 12; // gap-3 = 12px
  const ITEMS_TO_SCROLL = 5; // 한번에 보이는 배너 개수

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    const maxIndex = banners.length - ITEMS_TO_SCROLL;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="relative mx-auto max-w-7xl px-4 py-4">
        {/* Banner Slider Container */}
        <div className="relative">
          {/* Banner List */}
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-3 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (ITEM_WIDTH + GAP)}px)`,
              }}
            >
              {banners.map((banner) => (
                <Link
                  key={banner.id}
                  href={banner.link}
                  className="group shrink-0"
                  style={{ width: `${ITEM_WIDTH}px` }}
                >
                  <div className="flex h-[90px] items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600">
                    {/* Small Image/Icon */}
                    <div
                      className="h-[60px] w-[60px] shrink-0 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${banner.image})` }}
                    />

                    {/* Text Area */}
                    <div className="flex-1 overflow-hidden">
                      <strong className="mb-0.5 block text-xs font-bold text-slate-900 line-clamp-1 dark:text-white">
                        {banner.title}
                      </strong>
                      <div className="mb-1 text-[11px] text-slate-600 line-clamp-1 dark:text-slate-400">
                        {banner.subtitle}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-500">
                        {banner.date}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700"
              aria-label="이전 배너"
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
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {currentIndex < banners.length - ITEMS_TO_SCROLL && (
            <button
              onClick={handleNext}
              className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700"
              aria-label="다음 배너"
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
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventBanner;

