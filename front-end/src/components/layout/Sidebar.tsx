import React from "react";
import { NavLink } from "react-router-dom";
import type { SidebarProps } from "../../types";

// Tooltip khi hover icon
const NavItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="relative group/tip">
    {children}
    <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-gray-800 border border-gray-700 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 shadow-xl z-[9999]">
      {label}
    </span>
  </div>
);

const Icon: React.FC<{ d: string }> = ({ d }) => (
  <svg style={{ width: "18px", height: "18px", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `w-full flex items-center justify-center py-2.5 rounded-lg transition-all duration-150 ${
    isActive ? "bg-emerald-500/20 text-emerald-400 font-medium shadow-md" : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-100"
  }`;

const ICONS = {
  crm: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z",
  documents: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
};

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <aside className="relative inset-y-0 left-0 bg-[#0c180e] text-white flex flex-col shadow-2xl z-50 w-16 shrink-0 border-r border-[#152718]">

      {/* NAV ICONS */}
      <nav className="flex-1 py-4 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar px-2">
        <NavItem label="Quản lý Khách hàng">
          <NavLink to="/crm" className={navLinkClass}>
            <Icon d={ICONS.crm} />
          </NavLink>
        </NavItem>

        <NavItem label="Tài liệu công ty">
          <NavLink to="/documents" className={navLinkClass}>
            <Icon d={ICONS.documents} />
          </NavLink>
        </NavItem>
      </nav>

      {/* FOOTER DECOR */}
      <div className="py-4 flex justify-center border-t border-[#152718]">
        <span className="text-xl leading-none select-none">🎋</span>
      </div>
     
    </aside>
  );
};

export default Sidebar;
