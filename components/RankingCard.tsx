import Link from "next/link";
import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface RankingItem {
  id: string;
  rank: number;
  name: string;
  logo_url?: string;
  value: string;
  change?: "up" | "down" | "same";
  changeAmount?: number;
  tier?: number;
}

interface RankingCardProps {
  title: string;
  period: "일간" | "주간" | "월간";
  items: RankingItem[];
  icon?: string;
  color?: string;
  bgImage?: string;
  linkHref?: string;
}

const RankingCard = ({
  title,
  period,
  items,
  icon = "🏆",
  color = "from-blue-500 to-purple-500",
  bgImage,
  linkHref = "/rankings",
}: RankingCardProps) => {
  const getChangeIcon = (change?: "up" | "down" | "same") => {
    if (change === "up") {
      return <span className="text-[10px] text-red-500">▲</span>;
    } else if (change === "down") {
      return <span className="text-[10px] text-blue-500">▼</span>;
    }
    return <span className="text-[10px] text-slate-400">-</span>;
  };

  const getTierColor = (tier?: number) => {
    switch (tier) {
      case 1:
        return "text-yellow-500 font-bold";
      case 2:
        return "text-purple-500 font-bold";
      case 3:
        return "text-blue-500 font-bold";
      case 4:
        return "text-green-500 font-bold";
      case 5:
        return "text-slate-500 font-bold";
      default:
        return "text-slate-500";
    }
  };

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header with Background Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        {/* Background Image or Gradient */}
        {bgImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-r", color)} />
        )}

        {/* Content */}
        <div className="relative p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-bold text-white drop-shadow-lg">{title}</h3>
            </div>
            <div className="flex space-x-2">
              <button
                className={cn(
                  "rounded-lg px-3 py-1 text-sm font-semibold transition-colors",
                  period === "일간"
                    ? "bg-white text-slate-900"
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                )}
              >
                일간
              </button>
              <button
                className={cn(
                  "rounded-lg px-3 py-1 text-sm font-semibold transition-colors",
                  period === "주간"
                    ? "bg-white text-slate-900"
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                )}
              >
                주간
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking List */}
      <div className="p-4">
        <div className="space-y-2.5">
          {items.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              href={`/rankings/${item.id}`}
              className="group flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <div className="flex items-center space-x-2.5">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                    item.rank === 1
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-md"
                      : item.rank === 2
                      ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-md"
                      : item.rank === 3
                      ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                  )}
                >
                  {item.rank}
                </span>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                  {item.logo_url ? (
                    <img
                      src={item.logo_url}
                      alt={item.name}
                      className="h-6 w-6 rounded-lg object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {item.name.charAt(0)}
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {item.name}
                    </span>
                    {item.tier && (
                      <Badge
                        variant={`tier-${item.tier}` as any}
                        size="sm"
                      >
                        {item.tier}티어
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-red-500">{item.value}</span>
                <span className="flex items-center text-xs">
                  {getChangeIcon(item.change)}
                  {item.changeAmount && (
                    <span className="ml-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                      {item.changeAmount}
                    </span>
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* More Button */}
        <Link
          href={linkHref}
          className="mt-3 flex items-center justify-center rounded-lg border border-slate-200 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <span>더보기</span>
          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RankingCard;

