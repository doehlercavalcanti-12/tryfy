import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async suggestNextMove(state: Record<string, unknown>) {
    return {
      confidence: 0.75,
      action: 'advance',
      rationale: 'Based on heuristics from recent matches, aggressive play yields higher win rates.',
      state
    };
  }
}
