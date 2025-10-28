import fetch, { type RequestInit } from 'cross-fetch';
import { loadConfig } from '../utils/config.js';
import { deviceCodeSchema, deviceCodeTokenSchema } from '@tryfy/contracts';

export interface AuthContext {
  accessToken: string | null;
  expiresAt: number | null;
}

const authContext: AuthContext = {
  accessToken: null,
  expiresAt: null
};

export async function requestDeviceCode(): Promise<{
  deviceCode: string;
  userCode: string;
  verificationUri: string;
}> {
  const { apiBaseUrl, deviceCodeClientId } = loadConfig();
  const response = await fetch(`${apiBaseUrl}/api/auth/device/code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId: deviceCodeClientId })
  });

  const json = await response.json();
  const parsed = deviceCodeSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error('Received unexpected response when requesting device code.');
  }

  return {
    deviceCode: parsed.data.deviceCode,
    userCode: parsed.data.userCode,
    verificationUri: parsed.data.verificationUri
  };
}

export async function pollDeviceCode(deviceCode: string): Promise<void> {
  const { apiBaseUrl, deviceCodeClientId } = loadConfig();
  const response = await fetch(`${apiBaseUrl}/api/auth/device/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deviceCode, clientId: deviceCodeClientId })
  });

  const json = await response.json();
  const parsed = deviceCodeTokenSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error('Device code polling failed. Please try again.');
  }

  authContext.accessToken = parsed.data.accessToken;
  authContext.expiresAt = Date.now() + parsed.data.expiresIn * 1000;
}

export async function authenticatedFetch(path: string, init: RequestInit = {}): Promise<unknown> {
  if (!authContext.accessToken || !authContext.expiresAt || Date.now() > authContext.expiresAt) {
    throw new Error('You must login using `tryfy login` before calling this command.');
  }

  const { apiBaseUrl } = loadConfig();
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${authContext.accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}
