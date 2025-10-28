import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

export interface StoredSession {
  accessToken: string;
  expiresAt: number;
}

const SESSION_DIRECTORY = path.join(os.homedir(), '.tryfy');
const SESSION_FILE = path.join(SESSION_DIRECTORY, 'session.json');

class SessionError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'SessionError';
  }
}

async function ensureDirectory(): Promise<void> {
  await fs.mkdir(SESSION_DIRECTORY, { recursive: true, mode: 0o700 });
}

export async function loadSession(): Promise<StoredSession | null> {
  try {
    const payload = await fs.readFile(SESSION_FILE, 'utf8');
    const parsed = JSON.parse(payload) as Partial<StoredSession> | null;

    if (!parsed || typeof parsed !== 'object') {
      throw new SessionError('Cached session is malformed. Remove the session file and login again.');
    }

    if (typeof parsed.accessToken !== 'string' || typeof parsed.expiresAt !== 'number') {
      throw new SessionError('Cached session is missing required fields. Run `tryfy login` to create a new session.');
    }

    return { accessToken: parsed.accessToken, expiresAt: parsed.expiresAt };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }

    if (error instanceof SessionError) {
      throw error;
    }

    throw new SessionError('Failed to read cached session. Run `tryfy login` again.', error);
  }
}

export async function saveSession(session: StoredSession): Promise<void> {
  try {
    await ensureDirectory();
    await fs.writeFile(SESSION_FILE, JSON.stringify(session), { mode: 0o600 });
  } catch (error) {
    throw new SessionError('Failed to persist login session. Ensure you have write access to your home directory.', error);
  }
}

export async function clearSession(): Promise<void> {
  try {
    await fs.rm(SESSION_FILE, { force: true });
  } catch (error) {
    throw new SessionError('Failed to clear cached session.', error);
  }
}

export { SessionError };
