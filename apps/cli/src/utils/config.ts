import { config } from 'dotenv';
import { platformUrls } from '@tryfy/shared';

export interface CliConfig {
  apiBaseUrl: string;
  deviceCodeClientId: string;
}

const DEFAULT_CONFIG = {
  deviceCodeClientId: 'tryfy-cli'
};

let cachedConfig: CliConfig | null = null;

export function loadConfig(): CliConfig {
  if (!cachedConfig) {
    config();
    const resolvedApiUrl =
      process.env.TRYFY_API_URL ??
      (process.env.NODE_ENV === 'development'
        ? platformUrls.api.development
        : platformUrls.api.production);

    cachedConfig = {
      apiBaseUrl: resolvedApiUrl,
      deviceCodeClientId:
        process.env.TRYFY_DEVICE_CODE_CLIENT_ID ?? DEFAULT_CONFIG.deviceCodeClientId
    };
  }

  return cachedConfig;
}
