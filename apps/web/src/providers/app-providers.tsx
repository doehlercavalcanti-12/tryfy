'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { I18nProvider } from './i18n-provider';
import { SocketProvider } from './socket-provider';

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <I18nProvider>
        <SocketProvider>{children}</SocketProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
