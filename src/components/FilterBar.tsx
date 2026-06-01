"use client";

import { ALL_MODELS } from "@/types/platform";

interface FilterBarProps {
  selectedModels: string[];
  onToggleModel: (model: string) => void;
  proxyFilter: "all" | "yes" | "no";
  onProxyFilterChange: (value: "all" | "yes" | "no") => void;
}

export default function FilterBar({
  selectedModels,
  onToggleModel,
  proxyFilter,
  onProxyFilterChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 space-y-4 relative z-10">
      {/* Model Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          按模型筛选
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_MODELS.map((model) => {
            const isSelected = selectedModels.includes(model);
            return (
              <button
                key={model}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleModel(model);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onToggleModel(model);
                }}
                style={{ touchAction: "manipulation" }}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 border select-none ${
                  isSelected
                    ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 active:border-blue-300 active:text-blue-600"
                }`}
              >
                {model}
              </button>
            );
          })}
        </div>
      </div>

      {/* Proxy Filter */}
      <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          代理分销
        </h3>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {([
            { value: "all", label: "全部" },
            { value: "yes", label: "支持" },
            { value: "no", label: "不支持" },
          ] as const).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onProxyFilterChange(option.value);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                onProxyFilterChange(option.value);
              }}
              style={{ touchAction: "manipulation" }}
              className={`px-3 py-1 rounded-md text-xs md:text-sm font-medium transition-all duration-200 select-none ${
                proxyFilter === option.value
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 active:text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
