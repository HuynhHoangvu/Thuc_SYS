'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Users, ListChecks, Plane, Wallet, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/students', label: 'Học sinh', icon: Users },
  { to: '/travelers', label: 'Du lịch', icon: Plane },
  { to: '/templates', label: 'Mẫu quy trình', icon: ListChecks },
  { to: '/salary', label: 'Lương', icon: Wallet },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh bg-background">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 -translate-x-full flex-col border-r border-border bg-card p-4 transition-transform',
          'md:sticky md:top-0 md:h-svh md:translate-x-0',
          isMobileNavOpen && 'translate-x-0'
        )}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <span className="text-lg font-semibold text-card-foreground">CRM Du học</span>
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="text-muted-foreground hover:text-foreground md:hidden"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to || pathname?.startsWith(`${to}/`);
            return (
              <Link
                key={to}
                href={to}
                onClick={() => setIsMobileNavOpen(false)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {isMobileNavOpen && (
        <div
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 md:hidden">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu size={20} />
          </button>
          <span className="text-base font-semibold text-card-foreground">CRM Du học</span>
        </div>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
