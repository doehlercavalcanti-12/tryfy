import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('assist')
  generateAssist(@Body() body: { state: Record<string, unknown> }) {
    return this.aiService.suggestNextMove(body.state ?? {});
  }
}
