"use client";

import Link from "next/link";

interface UpdateItem {
  id: string;
  name: string;
  image: string;
  badge?: "new" | "up" | "down" | "hot";
}

interface UpdateNoteProps {
  version: string;
  title: string;
  items: UpdateItem[];
  bgImage?: string;
}

const UpdateNote = ({ version, title, items, bgImage }: UpdateNoteProps) => {
  const getBadgeIcon = (badge?: "new" | "up" | "down" | "hot") => {
    switch (badge) {
      case "new":
        return (
          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
            <span className="text-[10px] font-bold text-white">N</span>
          </div>
        );
      case "up":
        return (
          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
            <span className="text-[10px] text-white">▲</span>
          </div>
        );
      case "down":
        return (
          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
            <span className="text-[10px] text-white">▼</span>
          </div>
        );
      case "hot":
        return (
          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500">
            <span className="text-[10px] font-bold text-white">H</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Header with Background */}
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: bgImage
                ? `url(${bgImage})`
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative flex items-center justify-between p-6">
            <div>
              <div className="mb-1 text-sm font-semibold text-white/90">{version}</div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">{title}</h2>
            </div>
            <Link
              href="/updates"
              className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-white/90"
            >
              <span>패치 노트</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Update Items Grid */}
        <div className="flex flex-wrap gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/rankings/${item.id}`}
              className="group flex flex-col items-center"
            >
              <div className="relative mb-2">
                <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 transition-all group-hover:border-blue-500 group-hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-xl font-bold text-slate-400">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                {getBadgeIcon(item.badge)}
              </div>
              <span className="max-w-[80px] truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdateNote;

