import { Injectable } from '@nestjs/common';
import { adminSessionSchema, auditLogSchema } from '@tryfy/contracts';

@Injectable()
export class AdminService {
  getActiveSessions() {
    return adminSessionSchema.array().parse([
      {
        id: 'session-1',
        actor: 'admin@tryfy',
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 45 * 60 * 1000).toISOString()
      }
    ]);
  }

  getAuditLog(limit = 50) {
    return auditLogSchema.array().parse(
      new Array(Math.min(limit, 50)).fill(null).map((_, index) => ({
        id: `audit-${index}`,
        actor: index % 2 === 0 ? 'moderator@tryfy' : 'admin@tryfy',
        action: `Reviewed ticket #${index}`,
        timestamp: new Date(Date.now() - index * 60000).toISOString()
      }))
    );
  }
}
