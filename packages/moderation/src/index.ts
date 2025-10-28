import { z } from 'zod';

export const moderationRuleSchema = z.object({
  id: z.string(),
  description: z.string(),
  severity: z.enum(['low', 'medium', 'high']),
  actions: z.array(z.enum(['warn', 'mute', 'suspend', 'escalate']))
});

export const moderationRules = moderationRuleSchema.array().parse([
  {
    id: 'chat-harassment',
    description: 'Messages containing harassment, hate speech or targeted abuse must be escalated.',
    severity: 'high',
    actions: ['suspend', 'escalate']
  },
  {
    id: 'cheating',
    description: 'Detected cheat signatures trigger an automatic suspension review.',
    severity: 'high',
    actions: ['suspend', 'escalate']
  },
  {
    id: 'spam',
    description: 'Repeated unsolicited advertisements receive a temporary mute and warning.',
    severity: 'medium',
    actions: ['mute', 'warn']
  },
  {
    id: 'username-policy',
    description: 'Usernames violating content guidelines require rename enforcement.',
    severity: 'low',
    actions: ['warn']
  }
]);

export const moderationGuidance = {
  escalateThreshold: 3,
  reviewQueue: 'moderation-high-priority'
};

export type ModerationRule = z.infer<typeof moderationRuleSchema>;
