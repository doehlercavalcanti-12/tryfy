import fetch, { type RequestInit } from 'cross-fetch';
import { loadConfig } from '../utils/config.js';
import { deviceCodeSchema, deviceCodeTokenSchema } from '@tryfy/contracts';
import {
  clearSession,
  loadSession,
  saveSession,
  SessionError,
  type StoredSession
} from '../utils/session.js';

export interface AuthContext {
  accessToken: string | null;
  expiresAt: number | null;
}

let authContext: AuthContext = {
  accessToken: null,
  expiresAt: null
};
let contextLoaded = false;

async function ensureAuthContext(): Promise<void> {
  if (contextLoaded) {
    return;
  }

  contextLoaded = true;

  try {
    const persisted = await loadSession();
    if (persisted) {
      authContext = persisted;
    }
  } catch (error) {
    if (error instanceof SessionError) {
      throw error;
    }

    throw new SessionError('Unable to load cached session.', error);
  }
}

async function persistContext(context: StoredSession): Promise<void> {
  authContext = context;
  contextLoaded = true;
  await saveSession(context);
}

async function clearContext(): Promise<void> {
  authContext = { accessToken: null, expiresAt: null };
  contextLoaded = true;
  await clearSession();
}

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

  const context: StoredSession = {
    accessToken: parsed.data.accessToken,
    expiresAt: Date.now() + parsed.data.expiresIn * 1000
  };

  await persistContext(context);
}

export async function authenticatedFetch(path: string, init: RequestInit = {}): Promise<unknown> {
  await ensureAuthContext();

  if (!authContext.accessToken || !authContext.expiresAt) {
    throw new Error('You must login using `tryfy login` before calling this command.');
  }

  if (Date.now() > authContext.expiresAt) {
    await clearContext();
    throw new Error('Your session has expired. Please login again using `tryfy login`.');
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
