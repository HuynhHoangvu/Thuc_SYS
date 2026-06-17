import React from "react";

interface DocumentFilterBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  filterStatus?: string;
  onFilterChange?: (status: string) => void;
  filteredCount?: number;
  totalCount?: number;
  onReset?: () => void;
}

const DocumentFilterBar: React.FC<DocumentFilterBarProps> = () => {
  return null;
};

export default DocumentFilterBar;