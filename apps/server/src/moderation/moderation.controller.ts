import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModerationService } from './moderation.service';

@Controller('moderation')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Get('rules')
  listRules() {
    return this.moderationService.getRules();
  }

  @Post('reports')
  createReport(@Body() body: { playerId: string; reason: string }) {
    return this.moderationService.submitReport(body);
  }
}
