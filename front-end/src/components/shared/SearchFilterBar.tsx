import React from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (query: string) => void;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  filters?: {
    key: string;
    placeholder: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
  resultCount?: number;
  totalCount?: number;
  onReset?: () => void;
  hasActiveFilter?: boolean;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchPlaceholder = "Tìm kiếm...",
  searchValue = "",
  onSearchChange,
  startDate = "",
  endDate = "",
  onStartDateChange,
  onEndDateChange,
  filters = [],
  resultCount,
  totalCount,
  onReset,
  hasActiveFilter,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-white border-b border-gray-200">
      {/* Search Input */}
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Date Filters */}
      {(onStartDateChange || onEndDateChange) && (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange?.(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
          <span className="text-gray-400">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange?.(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* Custom Filters */}
      {filters.map((filter) => (
        <select
          key={filter.key}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">{filter.placeholder}</option>
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}

      {/* Result Count */}
      {resultCount !== undefined && totalCount !== undefined && (
        <div className="text-sm text-gray-500">
          {hasActiveFilter ? (
            <span>
              Tìm thấy <strong>{resultCount}</strong> / {totalCount} thẻ
            </span>
          ) : (
            <span>{totalCount} thẻ</span>
          )}
        </div>
      )}

      {/* Reset Button */}
      {hasActiveFilter && onReset && (
        <button
          onClick={onReset}
          className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          Xóa lọc
        </button>
      )}
    </div>
  );
};

export default SearchFilterBar;