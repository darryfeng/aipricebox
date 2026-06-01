import Link from "next/link";
import { Platform } from "@/types/platform";
import PlatformLogo from "./PlatformLogo";
import ModelTag from "./ModelTag";
import ProxyBadge from "./ProxyBadge";

interface PlatformCardProps {
  platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Hot Badge - Top Right */}
      {platform.hot && (
        <div className="absolute top-0 right-0 z-10">
          <div className="flex items-center gap-0.5 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg shadow-sm">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            热门
          </div>
        </div>
      )}
      {/* Card Body */}
      <div className="p-3 md:p-5 flex-1 flex flex-col">
        {/* Header: Logo + Name + Badges */}
        <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
          <PlatformLogo name={platform.name} size="md" mobileSize="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-1 md:mb-1.5">
              <h3 className="font-semibold text-gray-900 text-sm md:text-lg truncate max-w-[70%] md:max-w-full" title={platform.name}>
                {platform.name}
              </h3>
              <span className="text-[9px] md:text-[10px] px-1 md:px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium flex-shrink-0">
                {platform.region}
              </span>
            </div>
            <ProxyBadge supportsProxy={platform.supportsProxy} />
          </div>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-3 mb-2 md:mb-3 flex-1">
          {platform.description}
        </p>

        {/* Model Tags - mobile max 3 lines, PC 2 lines */}
        <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-4 max-h-[72px] md:max-h-none overflow-hidden">
          {platform.models.slice(0, 6).map((model) => (
            <ModelTag key={model} model={model} />
          ))}
          {platform.models.length > 6 && (
            <span className="inline-block px-2 py-0.5 text-xs text-gray-400 font-medium">
              +{platform.models.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Action Button */}
      <div className="px-4 md:px-5 pb-4 md:pb-5">
        <Link
          href={`/platform/${platform.id}`}
          className="block w-full text-center py-2.5 rounded-xl border border-blue-200 text-blue-600 text-sm font-medium hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500"
        >
          查看详情
          <svg
            className="inline-block w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
