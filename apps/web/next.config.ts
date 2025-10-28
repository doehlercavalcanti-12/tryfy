import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt', 'es']
  },
  transpilePackages: ['@tryfy/shared', '@tryfy/contracts', '@tryfy/moderation']
};

export default nextConfig;
