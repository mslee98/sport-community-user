import Link from "next/link";
import { cn } from "@/lib/utils";
import Badge from "./Badge";
import Rating from "./Rating";
import type { Site } from "@/types";

interface SiteCardProps {
  site: Site;
  rank?: number;
  className?: string;
}

const SiteCard = ({ site, rank, className }: SiteCardProps) => {
  const getTierVariant = (tier: number) => {
    if (tier >= 1 && tier <= 5) {
      return `tier-${tier}` as any;
    }
    return "default";
  };

  return (
    <Link href={`/rankings/${site.id}`}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800",
          className
        )}
      >
        {/* Rank Badge */}
        {rank && (
          <div className="absolute right-4 top-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white shadow-lg">
              {rank}
            </div>
          </div>
        )}

        {/* Tier Badge */}
        <div className="mb-4">
          <Badge variant={getTierVariant(site.tier)} size="lg">
            {site.tier}티어
          </Badge>
        </div>

        {/* Logo & Name */}
        <div className="mb-4 flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
            {site.logo_url ? (
              <img
                src={site.logo_url}
                alt={site.name}
                className="h-12 w-12 object-contain"
              />
            ) : (
              <span className="text-2xl font-bold text-slate-600 dark:text-slate-300">
                {site.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {site.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{site.category}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <Rating rating={site.rating} size="md" />
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
          {site.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {new Date(site.created_at).toLocaleDateString("ko-KR")}
          </span>
          <span className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
            자세히 보기
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SiteCard;

