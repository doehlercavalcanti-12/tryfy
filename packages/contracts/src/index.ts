import { z } from 'zod';

export const deviceCodeSchema = z.object({
  userCode: z.string(),
  deviceCode: z.string(),
  verificationUri: z.string().url(),
  expiresIn: z.number().int().positive()
});

export const deviceCodeTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresIn: z.number().int().positive()
});

export const matchHistoryEntrySchema = z.object({
  id: z.string(),
  mode: z.string(),
  result: z.enum(['win', 'loss', 'draw']),
  earnedTickets: z.number().int(),
  playedAt: z.string()
});

export const matchHistoryResponseSchema = z.object({
  entries: matchHistoryEntrySchema.array()
});

export const leaderboardEntrySchema = z.object({
  id: z.string(),
  playerTag: z.string(),
  rating: z.number().int(),
  rank: z.number().int()
});

export const adminSessionSchema = z.object({
  id: z.string(),
  actor: z.string(),
  createdAt: z.string(),
  expiresAt: z.string()
});

export const auditLogSchema = z.object({
  id: z.string(),
  actor: z.string(),
  action: z.string(),
  timestamp: z.string()
});

export const websocketEventSchema = z.union([
  z.object({ type: z.literal('match.start'), matchId: z.string() }),
  z.object({ type: z.literal('match.update'), matchId: z.string(), payload: z.record(z.any()) }),
  z.object({ type: z.literal('match.end'), matchId: z.string(), result: z.enum(['win', 'loss', 'draw']) })
]);

export type DeviceCode = z.infer<typeof deviceCodeSchema>;
export type DeviceCodeToken = z.infer<typeof deviceCodeTokenSchema>;
export type MatchHistoryEntry = z.infer<typeof matchHistoryEntrySchema>;
export type MatchHistoryResponse = z.infer<typeof matchHistoryResponseSchema>;
export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;
export type AdminSession = z.infer<typeof adminSessionSchema>;
export type AuditLogEntry = z.infer<typeof auditLogSchema>;
export type WebsocketEvent = z.infer<typeof websocketEventSchema>;
