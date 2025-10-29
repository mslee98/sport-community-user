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
          "group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800",
          className
        )}
      >
        {/* Rank Badge */}
        {rank && (
          <div className="absolute right-3 top-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-sm font-bold text-white shadow-md">
              {rank}
            </div>
          </div>
        )}

        {/* Logo & Name */}
        <div className="mb-3 flex items-center space-x-3">
          <div className="relative flex h-12 w-12 items-center justify-center">
            {site.logo_url ? (
              <img
                src={site.logo_url}
                alt={site.name}
                className="h-12 w-12 rounded-lg object-contain"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
                <span className="text-xl font-bold text-slate-600 dark:text-slate-300">
                  {site.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1">
              <Badge variant={getTierVariant(site.tier)} size="sm" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="truncate text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {site.name}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">{site.category}</p>
              <Rating rating={site.rating} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SiteCard;

