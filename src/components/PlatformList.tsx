"use client";

import { useState, useMemo } from "react";
import { Platform } from "@/types/platform";
import PlatformCard from "./PlatformCard";
import FilterBar from "./FilterBar";

interface PlatformListProps {
  platforms: Platform[];
}

export default function PlatformList({ platforms }: PlatformListProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [proxyFilter, setProxyFilter] = useState<"all" | "yes" | "no">("all");

  const toggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((platform) => {
      // Model filter: if any model is selected, platform must include at least one of them
      if (selectedModels.length > 0) {
        const hasModel = selectedModels.some((m) => platform.models.includes(m));
        if (!hasModel) return false;
      }

      // Proxy filter
      if (proxyFilter === "yes" && !platform.supportsProxy) return false;
      if (proxyFilter === "no" && platform.supportsProxy) return false;

      return true;
    });
  }, [platforms, selectedModels, proxyFilter]);

  const hasActiveFilters = selectedModels.length > 0 || proxyFilter !== "all";

  return (
    <div className="space-y-6">
      <FilterBar
        selectedModels={selectedModels}
        onToggleModel={toggleModel}
        proxyFilter={proxyFilter}
        onProxyFilterChange={setProxyFilter}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {hasActiveFilters ? (
            <>
              找到 <span className="font-semibold text-gray-900">{filteredPlatforms.length}</span> 个平台
              <button
                onClick={() => {
                  setSelectedModels([]);
                  setProxyFilter("all");
                }}
                className="ml-2 text-gray-400 hover:text-gray-600 underline underline-offset-2"
              >
                清除筛选
              </button>
            </>
          ) : (
            <>
              共 <span className="font-semibold text-gray-900">{platforms.length}</span> 个平台
            </>
          )}
        </p>
      </div>

      {/* Platform Grid - Mobile: 2 columns waterfall, PC: fixed 3 columns equal cards */}
      {filteredPlatforms.length > 0 ? (
        <>
          {/* Mobile: waterfall layout */}
          <div className="columns-2 gap-3 md:hidden [&>*]:break-inside-avoid [&>*]:mb-3">
            {filteredPlatforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
          {/* PC: fixed 3-column grid with equal height cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-5">
            {filteredPlatforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-400 text-lg">没有找到匹配的平台</p>
          <p className="text-gray-400 text-sm mt-1">试试调整筛选条件</p>
        </div>
      )}
    </div>
  );
}
