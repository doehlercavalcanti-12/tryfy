import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { randomUUID } from 'node:crypto';
import {
  deviceCodeSchema,
  deviceCodeTokenSchema,
  type DeviceCode
} from '@tryfy/contracts';
import { platformUrls } from '@tryfy/shared';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private static readonly DEVICE_CODE_TTL_SECONDS = 5 * 60;

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  private buildCacheKey(clientId: string, code: string, type: 'device' | 'user') {
    return `device-code:${clientId}:${type}:${code}`;
  }

  async requestDeviceCode(clientId: string) {
    const userCode = randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase();
    const payload = deviceCodeSchema.parse({
      userCode,
      deviceCode: randomUUID(),
      verificationUri: platformUrls.auth.deviceVerification.primary,
      expiresIn: AuthService.DEVICE_CODE_TTL_SECONDS
    });

    await Promise.all([
      this.cache.set(
        this.buildCacheKey(clientId, payload.deviceCode, 'device'),
        payload,
        AuthService.DEVICE_CODE_TTL_SECONDS
      ),
      this.cache.set(
        this.buildCacheKey(clientId, payload.userCode, 'user'),
        payload.deviceCode,
        AuthService.DEVICE_CODE_TTL_SECONDS
      )
    ]);
    return payload;
  }

  async exchangeDeviceCode(clientId: string, deviceCode: string, userCode?: string) {
    const cached =
      (await this.cache.get<DeviceCode>(
        this.buildCacheKey(clientId, deviceCode, 'device')
      )) ?? null;

    if (!cached) {
      this.logger.warn(`Invalid device code attempt for client ${clientId}`);
      throw new Error('Device code expired or invalid');
    }

    if (userCode && userCode.toUpperCase() !== cached.userCode) {
      this.logger.warn(`Mismatched user code for client ${clientId}`);
      throw new Error('Device code expired or invalid');
    }

    await Promise.all([
      this.cache.del(this.buildCacheKey(clientId, deviceCode, 'device')),
      this.cache.del(this.buildCacheKey(clientId, cached.userCode, 'user'))
    ]);

    return deviceCodeTokenSchema.parse({
      accessToken: `access-${randomUUID()}`,
      refreshToken: `refresh-${randomUUID()}`,
      expiresIn: 3600
    });
  }
}
