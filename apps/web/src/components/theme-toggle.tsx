'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const activeTheme = theme ?? resolvedTheme ?? 'system';

  return (
    <button
      type="button"
      onClick={() => setTheme(activeTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
    >
      {activeTheme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
