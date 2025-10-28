import { Injectable } from '@nestjs/common';
import { moderationGuidance, moderationRules } from '@tryfy/moderation';

@Injectable()
export class ModerationService {
  getRules() {
    return moderationRules;
  }

  submitReport(report: { playerId: string; reason: string }) {
    return {
      ...report,
      status: 'queued',
      queue: moderationGuidance.reviewQueue
    };
  }
}
