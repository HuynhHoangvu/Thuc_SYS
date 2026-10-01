'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import type { Stage } from './stage.types';
import { cn } from '@/lib/utils';

const FALLBACK_COLOR = '#d4d4d8';

interface StagePickerProps {
  stages: Stage[];
  value: string;
  onChange: (key: string) => void;
  disabled?: boolean;
  className?: string;
}

// Stage pill + dropdown. Colors come from each stage's own color so the table,
// the filter bar and the settings page all show the same stage the same way.
// Native <select> can't be styled on Windows, hence a custom menu.
export function StagePicker({ stages, value, onChange, disabled, className }: StagePickerProps) {
  const sorted = stages.slice().sort((a, b) => a.order - b.order);
  const current = sorted.find((s) => s.key === value);

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        disabled={disabled}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: current?.color ?? FALLBACK_COLOR }}
        className={cn(
          'inline-flex max-w-full items-center justify-between gap-1 rounded-full px-3 py-1 text-xs font-medium text-[#2c1810] outline-none transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',
          className
        )}
      >
        <span className="truncate">{current?.title ?? value}</span>
        <ChevronDown size={14} className="shrink-0 opacity-70" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={6}
          // Menu events bubble through the portal to the clickable table row.
          onClick={(e) => e.stopPropagation()}
          className="z-50 max-h-[60vh] min-w-[220px] overflow-y-auto rounded-2xl bg-card p-2 text-card-foreground shadow-[0_16px_40px_-12px_rgb(0_0_0/0.35)]"
        >
          {sorted.map((s) => (
            <DropdownMenu.Item
              key={s.key}
              onSelect={() => s.key !== value && onChange(s.key)}
              className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm outline-none data-[highlighted]:bg-muted"
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: s.color ?? FALLBACK_COLOR }}
              />
              <span className={cn('flex-1', s.key === value && 'font-semibold')}>{s.title}</span>
              {s.key === value && <Check size={14} className="shrink-0 text-primary" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
